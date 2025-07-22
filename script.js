const canciones = [
  {
    src: 'Piensan.mp3',
    title: 'Piensan - Myke Towers',
    cover: 'piensan.jpg'
  },
  {
    src: '444.mp3',
    title: '444 - Yan Block',
    cover: '444.jpg'
  },
  {
    src: '512.mp3',
    title: '512 - Mora',
    cover: '512.jpg'
  },
   {
    src: 'freestyle.mp3',
    title: 'Freestyle - Beny Jr',
    cover: 'freestyle.jpg'
  },
   {
    src: 'tu ritmo.mp3',
    title: 'Tu Ritmo - Eladio Carrión',
    cover: 'tu ritmo.jpg'
  },
   {
    src: 'monaco.mp3',
    title: 'Monaco - Bad Bunny',
    cover: 'monaco.jpg'
  },
   {
    src: 'golfista.mp3',
    title: 'Golfista - Duko',
    cover: 'golfista.jpg'
  },
  {
    src: '120.mp3',
    title: '120 - Bad Bunny',
    cover: '120.jpg'
  }
];

const audio = document.getElementById('audio');
const nowPlaying = document.getElementById('nowPlaying');
const prevBtn = document.getElementById('prevBtn');
const skipBtn = document.getElementById('skipBtn');
const pausePlayBtn = document.getElementById('pausePlayBtn');
const cover = document.getElementById('cover');
const seek = document.getElementById('seek');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

let currentSong = 0;

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function playSong(index) {
  const song = canciones[index];
  audio.src = song.src;
  cover.src = song.cover;
  nowPlaying.textContent = song.title;
  audio.play().catch(error => console.log("Autoplay blocked:", error));
}

function prevSong() {
  currentSong = (currentSong - 1 + canciones.length) % canciones.length;
  playSong(currentSong);
}

function nextSong() {
  currentSong = (currentSong + 1) % canciones.length;
  playSong(currentSong);
}

prevBtn.addEventListener('click', prevSong);
skipBtn.addEventListener('click', nextSong);

pausePlayBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    pausePlayBtn.textContent = '⏸';
  } else {
    audio.pause();
    pausePlayBtn.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  seek.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  seek.max = audio.duration;
  duration.textContent = formatTime(audio.duration);
});

seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
});

audio.addEventListener('ended', nextSong);

// Auto-play on load
playSong(currentSong);