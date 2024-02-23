const tracks = [
    {
        name: 'Shape of You',
        artist: 'Ed Sheeran',
        cover: 'song1.png',
        src: 'song1.mp3'
    },
    {
        name: "Can't Buy Me Loving",
        artist: 'Rauf & Faik',
        cover: 'song2.webp',
        src: 'song2.mp3'
    },
    {
        name: 'Džanum',
        artist: 'Teya Dora',
        cover: 'song3.png',
        src: 'song3.mp3'
    }
]

const audio = new Audio();
let currentTrack = 0;
let isPlaying = false;

let play = document.querySelector('.play');
let pause = document.querySelector('.pause');

let progressBar = document.querySelector('#progressBar');
let start = document.querySelector('#start');
let stop = document.querySelector('#stop');

function loadTrack(index) {
    const track = tracks[index];
    audio.src = './assets/songs/' + track.src;

    audio.addEventListener('loadedmetadata', () => {
        const { mm, ss } = timeConvert(audio.duration);
        stop.textContent = `${mm.toString().padStart(2, '0')}:${ss.toFixed(0).toString().padStart(2, '0')}`;
    })

    document.querySelector('#trackImg').src = `./assets/img/${track.cover}`;
    document.querySelector('h3').textContent = track.name;
    document.querySelector('h6').textContent = track.artist;
}

function playTrack() {
    audio.play();
    isPlaying = true;
    play.style.display = "none";
    pause.style.display = "inline";

    // console.log(audio.duration);

}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    pause.style.display = "none";
    play.style.display = "inline";
}

function nextTrack() {
    if (currentTrack >= tracks.length - 1) {
        pauseTrack();
        currentTrack = 0;
    } else {
        pauseTrack();
        currentTrack += 1;
    }
    loadTrack(currentTrack);
    playTrack();
}

function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function prevPlay() {
    if (currentTrack > 0) {
        pauseTrack();
        currentTrack -= 1
        loadTrack(currentTrack);
        playTrack();
    } else {
        pauseTrack();
        currentTrack = tracks.length - 1;
        loadTrack(currentTrack);
        playTrack();
    }
    playTrack();
}


function timeConvert(sec) {
    const mm = Math.floor(sec / 60);
    const ss = sec % 60;

    return { mm, ss };
}

setInterval(() => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    const { mm, ss } = timeConvert(audio.currentTime);
    start.textContent = `${mm.toString().padStart(2, '0')}:${ss.toFixed(0).toString().padStart(2, '0')}`;
}, 1000);


function progressClick(event){
    // pauseTrack();
    const inputRange = event.target.value / 100;
    const timeUpdate = audio.duration * inputRange;
    audio.currentTime = timeUpdate;
    // playTrack();
}

document.querySelector('#prev').addEventListener('click', prevPlay);
document.querySelector('#toggle').addEventListener('click', togglePlay);
document.querySelector('#tooglePause').addEventListener('click', togglePlay);
document.querySelector('#next').addEventListener('click', nextTrack);

// progressBar.addEventListener('click', progressClick);

loadTrack(currentTrack);