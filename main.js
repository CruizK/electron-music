require('dotenv').config();
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const path = require('path');
const axios = require('axios');
const querystring = require('querystring');
const yt = require('ytdl-core');
const fs = require('fs');

let win;

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
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

ipcMain.on('getVideos', (event, args) => {
  const url = 'https://www.googleapis.com/youtube/v3/search?'
  axios.get(url + querystring.stringify({part: 'snippet', q: args, key:process.env.YT_KEY, maxResults: 10, type:"video"}))
    .then(res => {
      event.reply('gotVideos', res.data);
    })
    .catch(e => {
      console.log(e);
    })
})

ipcMain.on('downloadVideo', (event, args) => {
  console.log("Downloading video...");

  yt(args.url, {quality: 'highestaudio', filter: 'audioonly'}).on('response', function(res) {
    var totalSize = res.headers['content-length'];
    var dataRead = 0;
    console.log(totalSize);
    res.on('data', function(data) {
      dataRead += data.length;
      var percent = dataRead / totalSize;
      win.webContents.send('updateDownloadProgress', (percent * 100).toFixed(2));
    });
    res.on('end', function() {
      console.log()
    });
  }).pipe(fs.createWriteStream(`./music/${args.title}.mp3`));
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



