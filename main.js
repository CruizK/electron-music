require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const ytUtil = require('./youtubeUtil')
const extractAudio = require('./audioExtractor');
const util = require('./fileUtil')


let win;

mkdirp.sync(path.join(__dirname, "/music"));

let playlistMap = util.checkFileSync('./music/playlist-map.json', {
  "All Songs": {
    name: "All Songs",
    subtext: "All Your Songs",
    songs: []
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
  })

  if (process.env.NODE_ENV != "production") {
    win.webContents.openDevTools()
    win.loadURL('http://localhost:3000');
  }
  else {
    win.setMenu(null);
    win.loadFile(path.join(__dirname, "/client/build/index.html"))
  }


  // Emitted when the window is closed.
  win.on('closed', () => {
    fs.writeFile('./music/music-map.json', JSON.stringify(musicMap, null, "\t"), (err) => {
    });

    fs.writeFile('./music/playlist-map.json', JSON.stringify(playlistMap, null, "\t"), (err) => {

    })
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

ipcMain.on('getVideos', async (event, args) => {
  const videos = await ytUtil.searchVideos(args);
  event.reply('gotVideos', videos);
})

ipcMain.on('getPlaylistMap', (event, args) => {
  event.returnValue = playlistMap;
})

ipcMain.on('createPlaylist', (event, args) => {
  let playlist = {
    name: args.name,
    subtext: args.subtext,
    songs: []
  }
  
  playlistMap[args.name] = playlist;
})

ipcMain.on('addToPlaylist', (event, args) => {
  let playlist = playlistMap[args.playlist];
  if(playlist) {
    playlist.songs.push(args.song);
  }
})

ipcMain.on('downloadVideo', async (event, args) => {

  let vidId = args.id.videoId;

  //If the 'All Songs' Playlist exists and the song exists in the playlist, then don't download it
  if(playlistMap['All Songs'] && playlistMap['All Songs'].songs.findIndex(x => x.videoId == vidId) != -1) {
    win.webContents.send('updateDownloadProgress', {
      progress: "Already Downloaded",
      videoId: vidId
    })
    return;
  }

  const duration = await ytUtil.videoDuration(vidId)
  let playlist = args.playlist || 'All Songs'

  if(!playlistMap[playlist]) {
    return;
  }

  playlistMap[playlist].songs.push({
    title: args.snippet.title,
    description: args.snippet.description,
    thumbnails: args.snippet.thumbnails,
    channel: args.snippet.channelTitle,
    duration: duration,
    path: 'file://'+path.join(__dirname, "/music/" + vidId + ".mp3"),
    videoId: vidId,
  });
  console.log(playlistMap);


  extractAudio(vidId, `./music/${vidId}.mp3`, progress => {
    win.webContents.send('updateDownloadProgress', {
      progress,
      videoId: vidId
    })
  });
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})



