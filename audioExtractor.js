const yt = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

module.exports = (url, filepath, onProgress) => {
  const audio = yt(url, {quality: 'highest'}).on('response', function(res) {
    var totalSize = res.headers['content-length'];
    console.log(`Download Video: ${(totalSize/1000**2).toFixed(2)} MB`);
    var dataRead = 0;
    res.on('data', function(data) {
      dataRead += data.length;
      var percent = dataRead / totalSize;
      onProgress((percent * 100).toFixed(2) + "%");
    });
    res.on('end', () => {
      console.log('Done');
    });
  });

  ffmpeg({source: audio})
    .noVideo()
    .audioCodec('libmp3lame')
    .audioBitrate(128)
    .format('mp3')
    .on('error', err => console.log(err))
    .pipe(fs.createWriteStream(filepath), {
      end: true
    });
}