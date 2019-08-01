const querystring = require('querystring');
const moment = require('moment');
const axios = require('axios');
const API_KEY = process.env.YT_KEY;

module.exports.searchVideos = q => {
  const url = 'https://www.googleapis.com/youtube/v3/search?'
  return new Promise((resolve, reject) => {
    axios.get(url + querystring.stringify({part: 'snippet', q, key:API_KEY, maxResults: 10, type:"video"}))
    .then(res => {
      resolve(res.data);
    })
    .catch(e => {
      reject(e);
    })
  })

}

module.exports.videoDuration = id => {
  const url = 'https://www.googleapis.com/youtube/v3/videos?'
  return new Promise((resolve, reject) => {
    axios.get(url + querystring.stringify({part: 'contentDetails', id, key:API_KEY}))
    .then(res => {
      resolve(moment.duration(res.data.items[0].contentDetails.duration).asSeconds())
    })
    .catch(e => {
      reject(e);
    })
  })
}