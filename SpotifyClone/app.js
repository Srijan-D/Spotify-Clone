console.log("It is working");
let audio1 = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("btn");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
audio1.volume = 0.3;
let songItems = Array.from(document.getElementsByClassName("songItem"));
let playtwo = Array.from(document.getElementsByClassName("playbtn"));
let fontbtn = Array.from(document.getElementsByClassName("playFont"));
let songIndex = 0;
let songDisplay = document.getElementById("songDisplay");

let songs = [
  { songName: "grateful", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "oneShot", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "head down", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Destiny", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  {
    songName: "Fight Back",
    filePath: "songs/5.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Grim peaks",
    filePath: "songs/6.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "no name", filePath: "songs/7.mp3", coverPath: "covers/3.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audio1.paused || audio1.currentTime <= 0) {
    audio1.play();
    songDisplay.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-play-circle"); //NOT WORKING
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    songDisplay.innerText = songs[songIndex].songName;
    audio1.pause();
    masterPlay.classList.remove("fa-pause-circle"); //NOT WORKING
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

audio1.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  progress = parseInt((audio1.currentTime / audio1.duration) * 100); // To get the percentage of the audio completed
  //was working even without parseInt

  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audio1.currentTime = (progressBar.value * audio1.duration) / 100;
});

playtwo.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    if (audio1.paused || audio1.currentTime <= 0) {
      songIndex = parseInt(e.target.id);

      console.log(e.target); //The target event property returns the element that triggered the event.
      // fontbtn[i].classList.remove("fa-play-circle");
      //not working
      audio1.src = `songs/${songIndex + 1}.mp3`; //use backticks
      songDisplay.innerText = songs[songIndex].songName;
      audio1.play();
      audio1.currentTime = 0;
      gif.style.opacity = "1";
    } else {
      audio1.pause();
      gif.style.opacity = "0";
    }
  });
});

document.getElementById("next").addEventListener("click", () => {
  if (songIndex == 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audio1.src = `songs/${songIndex + 1}.mp3`;
  audio1.play();
  songDisplay.innerText = songs[songIndex].songName;
  audio1.currentTime = 0;
  gif.style.opacity = "1";
});

document.getElementById("back").addEventListener("click", () => {
  if (songIndex == 0) {
    songIndex = 6;
  } else {
    songIndex -= 1;
  }
  audio1.src = `songs/${songIndex + 1}.mp3`;
  audio1.play();
  songDisplay.innerText = songs[songIndex].songName;
  audio1.currentTime = 0;
  gif.style.opacity = "1";
});
