const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song names

const songs = [
  "Aspire",
  "Inspirational Guitar",
  "My Family",
  "Nature",
  "New Year Countdown",

  "Upbeat Christmas",
  "Uplifting Piano",
];

// Keeping track of a song
let songIndex = 0;

// loading song details onto DOM
loadSong(songs[songIndex]);

// Update the song
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.add("fa-play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Changing the progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const click = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (click / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

// Time update
audio.addEventListener("timeupdate", updateProgress);

// Changing the progress bar
progressContainer.addEventListener("click", setProgress);

// When song ends go to the next
audio.addEventListener("ended", nextSong);
