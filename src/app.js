// ==========================================
// 1. DATA STORE (Music Tracks Data)
// ==========================================
const playlistData = [
  {
    id: 1,
    title: "Deep Work Synthwave",
    artist: "Cyberpunk Audio • 1.2M plays",
    cover: "../images/image-1.webp",
    category: "Focus",
    duration: "4:05"
  },
  {
    id:2,
    title: "Coffee Shop Coding",
    artist: "Lofi Girl • 3.5M plays",
    cover: "../images/image-2.webp",
    category: "Relax",
    duration: "3:40"
  },
  {
    id: 3,
    title: "Rainy Night Debugging",
    artist: "Ambient Devs • 890K plays",
    cover: "../images/image-3.webp",
    category: "Focus",
    duration: "5:12"
  },
  {
    id: 4,
    title: "Chiptune Arcade",
    artist: "Retro Game Beats",
    cover: "../images/image-1.webp",
    category: "Energize",
    duration: "2:50"
  }
];

// Player State
let isPlaying = false;
let currentTrackIndex = 0;


// 2. DOM ELEMENTS SELECTION

// Sidebar & Navigation
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');

// Search & Filters
const searchInput = document.getElementById('search-input');
const pillButtons = document.querySelectorAll('#pill-container button');

// Player Elements
const playPauseBtn = document.getElementById('play-pause-btn');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playerImg = document.getElementById('player-img');
const likeBtn = document.getElementById('like-btn');
const trackCards = document.querySelectorAll('.track-card');

// 3. SIDEBAR CONTROLLER (Mini Guide)

function openSidebar() {
  if (!sidebar || !backdrop) return;
  sidebar.classList.remove('-translate-x-full');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');
}

function closeSidebar() {
  if (!sidebar || !backdrop) return;
  sidebar.classList.add('-translate-x-full');
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !sidebar.classList.contains('-translate-x-full');
    isOpen ? closeSidebar() : openSidebar();
  });
}

if (backdrop) {
  backdrop.addEventListener('click', closeSidebar);
}

// 4. MUSIC PLAYER CONTROLLER

// Track load karne ka function
function loadTrack(track) {
  if (playerTitle) playerTitle.textContent = track.title;
  if (playerArtist) playerArtist.textContent = track.artist;
  if (playerImg) playerImg.src = track.cover;
}

// Play/Pause toggle
function togglePlay() {
  isPlaying = !isPlaying;
  if (playPauseBtn) {
    playPauseBtn.textContent = isPlaying ? '┃┃' : '▶︎';
  }
}

if (playPauseBtn) {
  playPauseBtn.addEventListener('click', togglePlay);
}

// Track Cards par click hone par Player Update karna
trackCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const title = card.getAttribute('data-title') || playlistData[index]?.title;
    const artist = card.getAttribute('data-artist') || playlistData[index]?.artist;
    const img = card.getAttribute('data-img') || playlistData[index]?.cover;

    loadTrack({ title, artist, cover: img });
    
    // Auto-play enable karein
    isPlaying = false;
    togglePlay();
  });
});

// Like Button Toggle (❤︎ state)
if (likeBtn) {
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('text-red-500');
  });
}

// 5. SEARCH & PILL FILTERS INTERACTIVITY

// Filter Pills Selection Highlight
pillButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Reset all pills active styling
    pillButtons.forEach(btn => {
      btn.className = "px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 whitespace-nowrap transition-colors";
    });
    
    // Highlight selected pill
    button.className = "px-4 py-1.5 rounded-lg bg-white text-black font-semibold whitespace-nowrap";
  });
});

// Real-time Search Filter (Cards hide/show karna)
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    trackCards.forEach(card => {
      const title = card.getAttribute('data-title')?.toLowerCase() || card.innerText.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}