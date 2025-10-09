// --- Video Player Controls ---

const playerContainer = document.querySelector('.player-container');
const video = document.querySelector('.video-player');
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop');
const timelineSlider = document.querySelector('.timeline-slider');
const timeDisplay = document.querySelector('.time-display');
const volumeBtn = document.getElementById('mute');
const volumeSlider = document.querySelector('.volume-slider');
const fullscreenBtn = document.getElementById('fullscreen');

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updatePlayPauseIcon() {
    const icon = playPauseBtn.querySelector('i');
    icon.classList.toggle('fa-play', video.paused);
    icon.classList.toggle('fa-pause', !video.paused);
}

function updateVolumeIcon() {
    const icon = volumeBtn.querySelector('i');
    icon.classList.toggle('fa-volume-high', video.volume > 0.5 && !video.muted);
    icon.classList.toggle('fa-volume-low', video.volume <= 0.5 && video.volume > 0 && !video.muted);
    icon.classList.toggle('fa-volume-xmark', video.volume === 0 || video.muted);
}

function togglePlayPause() {
    video.paused ? video.play() : video.pause();
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

function updateTimeline() {
    const percentage = (video.currentTime / video.duration) * 100;
    timelineSlider.value = percentage;
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 0)}`;
}

function setVideoTime() {
    const newTime = (timelineSlider.value / 100) * video.duration;
    video.currentTime = newTime;
}

function setVolume() {
    video.muted = false;
    video.volume = volumeSlider.value;
}

function toggleMute() {
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) {
        video.volume = 0.5;
        volumeSlider.value = 0.5;
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

video.addEventListener('timeupdate', updateTimeline);
video.addEventListener('play', updatePlayPauseIcon);
video.addEventListener('pause', updatePlayPauseIcon);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('loadedmetadata', updateTimeline);

playPauseBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
stopBtn.addEventListener('click', stopVideo);
timelineSlider.addEventListener('input', setVideoTime);
volumeBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('input', setVolume);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
    }
    if (e.code === "KeyF") {
        toggleFullscreen();
    }
});

// --- Top Menu Bar Interactivity ---

const menuItems = document.querySelectorAll('.top-menu > ul > li');


function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
        menu.classList.remove('visible');
    });
}

menuItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown-menu');
 
    if (!dropdown) return;

    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isVisible = dropdown.classList.contains('visible');

        closeAllDropdowns();

        if (!isVisible) {
            dropdown.classList.add('visible');
        }
    });
});

window.addEventListener('click', (e) => {
    if (!e.target.closest('.top-menu > ul > li')) {
        closeAllDropdowns();
    }
});