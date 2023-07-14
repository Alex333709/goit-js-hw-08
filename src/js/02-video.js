import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');

vimeoPlayer.on('timeupdate', throttle(saveCurrentTime, 500));

function saveCurrentTime(event) {
  const currentTime = event.seconds;

  try {
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.error('Помилка при збереженні часу відтворення:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let currentTime = null;

  try {
    currentTime = localStorage.getItem('videoplayer-current-time');
  } catch (error) {
    console.error('Помилка при отриманні часу відтворення:', error);
  }

  if (currentTime && vimeoPlayer) {
    try {
      vimeoPlayer.setCurrentTime(currentTime);
    } catch (error) {
      console.error('Помилка при встановленні часу відтворення:', error);
    }
  }
});
