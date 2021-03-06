

export function formatSongDuration(time) {
  time = Math.ceil(time);
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  if(seconds < 10) {
    seconds = '0'+seconds;
  }

  return `${minutes}:${seconds}`;
}