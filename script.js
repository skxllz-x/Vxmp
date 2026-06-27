// ==========================================
// MUSIC CONTROL FUNCTIONALITY
// ==========================================

const musicBtn = document.getElementById('musicBtn');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;

// Set your music file path here
// Example: 'music.mp3' or 'https://example.com/music.mp3'
audioPlayer.src = 'music.mp3';

// Handle audio loading errors
audioPlayer.addEventListener('error', function() {
    console.error('Error loading audio file. Check the file path in CONFIG.musicFile');
});

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        audioPlayer.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        // Allow autoplay
        audioPlayer.play().catch(function(error) {
            console.log('Autoplay prevented by browser. User gesture required.', error);
        });
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
    robloxLink: 'https://www.roblox.com',              // Replace with your Roblox game link
    logoImage: 'logo.png',                             // Logo/crest image
    backgroundImage: 'background.gif',                 // Background image (.gif, .jpg, .png, .webp)
    musicFile: 'music.mp3'                             // Music file path (.mp3, .wav, .ogg, .m4a)
};

// Apply configurations
document.getElementById('discordBtn').href = CONFIG.discordLink;
document.getElementById('robloxBtn').href = CONFIG.robloxLink;
document.getElementById('logo').src = CONFIG.logoImage;
document.querySelector('.background').style.backgroundImage = `url('${CONFIG.backgroundImage}')`;
audioPlayer.src = CONFIG.musicFile;

// Preload audio
audioPlayer.preload = 'metadata';

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