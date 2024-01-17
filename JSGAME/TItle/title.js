
var backgroundMusic = document.getElementById('background-music');
var musicVolumeSlider = document.getElementById('music');

function startGame() {
    playBackgroundMusic();
    window.location.href = 'Game.html';
}

function openSettings() {
    var settingsBox = document.getElementById('settings-box');
    settingsBox.style.display = 'block';
    musicVolumeSlider.value = (backgroundMusic.volume * 100).toFixed(0);
}

function closeSettings() {
    var settingsBox = document.getElementById('settings-box');
    settingsBox.style.display = 'none';
}

function playBackgroundMusic() {
    backgroundMusic.volume = musicVolumeSlider.value / 100;

    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(function(error) {
            console.error('Error playing background music:', error);
        });
    }
}

musicVolumeSlider.addEventListener('input', function() {
    playBackgroundMusic();
});
