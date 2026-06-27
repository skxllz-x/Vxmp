// ==========================================
// MUSIC CONTROL & CONFIG (Improved)
// ==========================================

// Load after DOM is ready to avoid null elements
document.addEventListener('DOMContentLoaded', () => {
    // =====================
    // CONFIG
    // =====================
    const CONFIG = {
        discordLink: 'https://discord.gg/eY3U6YBM3Z',      // Replace with your Discord server invite
        robloxLink: 'https://www.roblox.com',              // Replace with your Roblox game link
        logoImage: 'logo.png',                             // Logo/crest image
        backgroundImage: 'background.gif',                 // Background image (.gif, .jpg, .png, .webp)
        musicFile: 'music.mp3',                            // Music file path (.mp3, .wav, .ogg, .m4a)
        musicVolume: 0.6                                   // Default volume (0.0 - 1.0)
    };

    // =====================
    // ELEMENT REFERENCES
    // =====================
    const musicBtn = document.getElementById('musicBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const bgEl = document.querySelector('.background');
    const logoEl = document.getElementById('logo');
    const discordBtn = document.getElementById('discordBtn');
    const robloxBtn = document.getElementById('robloxBtn');

    // Apply basic config safely
    if (discordBtn) discordBtn.href = CONFIG.discordLink;
    if (robloxBtn) robloxBtn.href = CONFIG.robloxLink;
    if (logoEl) logoEl.src = CONFIG.logoImage;
    if (bgEl) bgEl.style.backgroundImage = `url('${CONFIG.backgroundImage}')`;

    // If audio element is missing, skip audio setup
    if (!audioPlayer || !musicBtn) return;

    // AUDIO SETUP
    audioPlayer.src = CONFIG.musicFile;
    audioPlayer.preload = 'metadata';
    audioPlayer.loop = true;
    audioPlayer.volume = typeof CONFIG.musicVolume === 'number' ? CONFIG.musicVolume : 0.6;

    // State
    let isPlaying = false;

    // Helpers
    function setButtonState(playing) {
        if (!musicBtn) return;
        isPlaying = !!playing;
        musicBtn.classList.toggle('playing', isPlaying);
        musicBtn.setAttribute('aria-pressed', String(isPlaying));
        musicBtn.title = isPlaying ? 'Pause music' : 'Play music';
        musicBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }

    // Error handling
    audioPlayer.addEventListener('error', function(e) {
        console.error('Error loading audio file. Check CONFIG.musicFile and that the file exists and is a supported format.', e);
    });

    audioPlayer.addEventListener('ended', function() {
        // If loop is false this will run; keep state consistent
        setButtonState(false);
        try { localStorage.setItem('vxmp_music_playing', '0'); } catch (e) { }
    });

    // Toggle play/pause with user interaction
    musicBtn.addEventListener('click', async function () {
        if (isPlaying) {
            audioPlayer.pause();
            setButtonState(false);
            try { localStorage.setItem('vxmp_music_playing', '0'); } catch (e) { }
            return;
        }

        try {
            await audioPlayer.play();
            setButtonState(true);
            try { localStorage.setItem('vxmp_music_playing', '1'); } catch (e) { }
        } catch (err) {
            // Autoplay prevented by browser; user gesture required.
            // We already are inside a user click so this should rarely happen, but keep the error visible.
            console.warn('Playback failed or was prevented:', err);
        }
    });

    // Restore last known play state (optional)
    try {
        const stored = localStorage.getItem('vxmp_music_playing');
        if (stored === '1') {
            // Try to start playback silently; if blocked we ignore
            audioPlayer.play().then(() => setButtonState(true)).catch(() => setButtonState(false));
        } else {
            setButtonState(false);
        }
    } catch (e) {
        // localStorage may be disabled; just set default button state
        setButtonState(false);
    }

    // Expose a small API (useful for debugging in console)
    window.VXMP = window.VXMP || {};
    window.VXMP.audio = audioPlayer;
    window.VXMP.setBackground = (url) => { if (bgEl) bgEl.style.backgroundImage = `url('${url}')`; };
});
