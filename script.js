// ==========================================
// MUSIC CONTROL FUNCTIONALITY
// ==========================================

const musicBtn = document.getElementById('musicBtn');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;

// Set your music file path here
// Example: 'music.mp3' or 'https://example.com/music.mp3'
audioPlayer.src = 'music.mp3';

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        audioPlayer.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        audioPlayer.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.classList.add('playing');
        isPlaying = true;
    }
});

// Update button when audio ends
audioPlayer.addEventListener('ended', function() {
    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
    musicBtn.classList.remove('playing');
    isPlaying = false;
});

// ==========================================
// CUSTOM LINK CONFIGURATION
// ==========================================

// Change these URLs to your custom links
const CONFIG = {
    discordLink: 'https://discord.gg/eY3U6YBM3Z',      // Replace with your Discord server invite
    robloxLink: 'https://www.roblox.com',    // Replace with your Roblox game link
    logoImage: 'logo.png',                   // Logo/crest image
    backgroundImage: 'background.jpg',       // Background image
    musicFile: 'music.mp3'                   // Music file path
};

// Apply configurations
document.getElementById('discordBtn').href = CONFIG.discordLink;
document.getElementById('robloxBtn').href = CONFIG.robloxLink;
document.getElementById('logo').src = CONFIG.logoImage;
document.querySelector('.background').style.backgroundImage = `url('${CONFIG.backgroundImage}')`;
audioPlayer.src = CONFIG.musicFile;

// ==========================================
// LOGO IMAGE UPLOAD (OPTIONAL)
// ==========================================

// Uncomment this to enable drag-and-drop logo upload
/*
const logoElement = document.getElementById('logo');

logoElement.addEventListener('dragover', (e) => {
    e.preventDefault();
    logoElement.style.opacity = '0.7';
});

logoElement.addEventListener('dragleave', () => {
    logoElement.style.opacity = '1';
});

logoElement.addEventListener('drop', (e) => {
    e.preventDefault();
    logoElement.style.opacity = '1';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                logoElement.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
});
*/
