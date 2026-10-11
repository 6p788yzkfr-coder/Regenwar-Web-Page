// NovaPlay Standalone Arcade Application
// Pure JavaScript - Zero external framework dependencies - Runs everywhere

(function () {
  'use strict';

  // Master initial games list
  const DEFAULT_GAMES = [
    {
      id: "eaglercraft",
      title: "Eaglercraft 1.8.8",
      category: "Action",
      badge: "Top Pick",
      rating: 5.0,
      plays: "490K",
      description: "Full HTML5 WebGL Minecraft 1.8.8. Explore infinite survival worlds, mine ores, craft items, build creations, and connect to unblocked multiplayer servers.",
      controls: [
        { key: "WASD", action: "Move / Walk" },
        { key: "Mouse Look", action: "Look around 360°" },
        { key: "Left Click", action: "Mine block / Attack" },
        { key: "Right Click", action: "Place block / Use item" },
        { key: "SPACE", action: "Jump" },
        { key: "E", action: "Open inventory" }
      ],
      src: "https://eaglercraft1-8.github.io/",
      iframe: '<iframe src="https://eaglercraft1-8.github.io/" title="Eaglercraft 1.8.8" class="game-frame" allow="fullscreen; autoplay; gamepad; pointer-lock" allowfullscreen></iframe>',
      accentColor: "#10b981",
      thumbnailEmoji: "⛏️"
    },
    {
      id: "gladihoppers",
      title: "Gladihoppers",
      category: "Action",
      badge: "Hot",
      rating: 4.9,
      plays: "360K",
      description: "Wacky 2D physics-based gladiator battle simulator! Dual battle stances, directional strikes, brutal arena combat, and javelins.",
      controls: [
        { key: "WASD", action: "Move & Hop around arena" },
        { key: "Arrow Keys", action: "Directional attack (High/Low/Thrust)" },
        { key: "SPACE", action: "Switch stance / Jump" },
        { key: "E", action: "Throw javelin" }
      ],
      src: "https://gladihoppers-pro.github.io/file/",
      iframe: '<iframe src="https://gladihoppers-pro.github.io/file/" title="Gladihoppers" class="game-frame" allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>',
      accentColor: "#ef4444",
      thumbnailEmoji: "⚔️"
    },
    {
      id: "2048",
      title: "2048",
      category: "Puzzle",
      badge: "Popular",
      rating: 4.9,
      plays: "184K",
      description: "Slide matching numbered tiles across the 4x4 grid to merge them up to the legendary 2048 tile.",
      controls: [
        { key: "Arrow Keys / WASD", action: "Slide all tiles" },
        { key: "Swipe", action: "Slide on mobile / touch screen" }
      ],
      src: "./games/2048.html",
      iframe: '<iframe src="./games/2048.html" title="2048" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#f59e0b",
      thumbnailEmoji: "🔢"
    },
    {
      id: "retro-snake",
      title: "Retro Snake",
      category: "Arcade",
      badge: "Hot",
      rating: 4.8,
      plays: "142K",
      description: "Guide the slithering serpent to eat glowing energy orbs, grow longer, and avoid crashing into walls or your own tail.",
      controls: [
        { key: "Arrow Keys / WASD", action: "Steer snake direction" },
        { key: "On-screen D-Pad", action: "Touch navigation" }
      ],
      src: "./games/snake.html",
      iframe: '<iframe src="./games/snake.html" title="Retro Snake" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#10b981",
      thumbnailEmoji: "🐍"
    },
    {
      id: "tetris",
      title: "Tetris Block Master",
      category: "Puzzle",
      badge: "Classic",
      rating: 4.9,
      plays: "220K",
      description: "Rotate and maneuver falling tetrominoes into horizontal lines to clear rows and score high multipliers.",
      controls: [
        { key: "← / →", action: "Move piece left / right" },
        { key: "↑ / W", action: "Rotate piece clockwise" },
        { key: "↓ / S", action: "Soft drop" },
        { key: "SPACE", action: "Instant hard drop" }
      ],
      src: "./games/tetris.html",
      iframe: '<iframe src="./games/tetris.html" title="Tetris Block Master" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#06b6d4",
      thumbnailEmoji: "🧩"
    },
    {
      id: "flappy-bird",
      title: "Flappy Wing",
      category: "Arcade",
      badge: "Addictive",
      rating: 4.7,
      plays: "195K",
      description: "Tap or press Space to keep your bird airborne and navigate through narrow green pipe obstacles.",
      controls: [
        { key: "SPACE / Tap", action: "Flap wings & rise" }
      ],
      src: "./games/flappy-bird.html",
      iframe: '<iframe src="./games/flappy-bird.html" title="Flappy Wing" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#eab308",
      thumbnailEmoji: "🐤"
    },
    {
      id: "space-invaders",
      title: "Space Invaders",
      category: "Action",
      badge: "Retro",
      rating: 4.8,
      plays: "130K",
      description: "Defend planet Earth from descending waves of alien invaders using your laser cannon and bunker defenses.",
      controls: [
        { key: "← / → (A / D)", action: "Move defense cannon" },
        { key: "SPACE / Button", action: "Fire laser blast" }
      ],
      src: "./games/space-invaders.html",
      iframe: '<iframe src="./games/space-invaders.html" title="Space Invaders" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#ec4899",
      thumbnailEmoji: "👾"
    },
    {
      id: "pong-classic",
      title: "Pong Classic 1972",
      category: "Retro",
      badge: "2-Player",
      rating: 4.6,
      plays: "98K",
      description: "The grandfather of video gaming! Defeat the AI computer opponent or battle a friend in local head-to-head mode.",
      controls: [
        { key: "Mouse / Touch", action: "Player 1 paddle control" },
        { key: "W / S (Player 1)", action: "Keyboard movement" },
        { key: "I / K (Player 2)", action: "Second player movement" }
      ],
      src: "./games/pong.html",
      iframe: '<iframe src="./games/pong.html" title="Pong Classic 1972" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#38bdf8",
      thumbnailEmoji: "🏓"
    },
    {
      id: "breakout",
      title: "Breakout Smash",
      category: "Arcade",
      badge: "Action",
      rating: 4.7,
      plays: "115K",
      description: "Bounce the steel sphere off your paddle to smash through rows of colored bricks without losing your ball.",
      controls: [
        { key: "Mouse / Touch", action: "Move paddle horizontally" },
        { key: "← / →", action: "Keyboard paddle steering" }
      ],
      src: "./games/breakout.html",
      iframe: '<iframe src="./games/breakout.html" title="Breakout Smash" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#f97316",
      thumbnailEmoji: "🧱"
    },
    {
      id: "dino-run",
      title: "T-Rex Dino Runner",
      category: "Arcade",
      badge: "Endless",
      rating: 4.9,
      plays: "310K",
      description: "The beloved offline browser runner. Sprint through the desert, leaping over cacti and ducking under pterodactyls.",
      controls: [
        { key: "SPACE / ↑", action: "Jump over obstacles" },
        { key: "↓", action: "Duck under flying birds" }
      ],
      src: "./games/dino-run.html",
      iframe: '<iframe src="./games/dino-run.html" title="T-Rex Dino Runner" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#10b981",
      thumbnailEmoji: "🦖"
    },
    {
      id: "minesweeper",
      title: "Minesweeper Pro",
      category: "Puzzle",
      badge: "Strategy",
      rating: 4.8,
      plays: "165K",
      description: "Uncover grid cells without triggering hidden explosive mines using numerical clues and strategic flagging.",
      controls: [
        { key: "Left Click", action: "Reveal safe cell" },
        { key: "Right Click / Mode", action: "Place or remove caution flag" }
      ],
      src: "./games/minesweeper.html",
      iframe: '<iframe src="./games/minesweeper.html" title="Minesweeper Pro" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#ef4444",
      thumbnailEmoji: "💣"
    },
    {
      id: "cookie-clicker",
      title: "Cookie Empire",
      category: "Casual",
      badge: "Idle",
      rating: 4.8,
      plays: "270K",
      description: "Click the giant cookie, hire grandmas, construct cookie farms, and amass trillions of delicious baked goods.",
      controls: [
        { key: "Mouse Click / Tap", action: "Bake cookies" },
        { key: "Shop Menu", action: "Purchase automated bakery gear" }
      ],
      src: "./games/cookie-clicker.html",
      iframe: '<iframe src="./games/cookie-clicker.html" title="Cookie Empire" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#d97706",
      thumbnailEmoji: "🍪"
    },
    {
      id: "connect4",
      title: "Connect Four Battle",
      category: "Strategy",
      badge: "Smart AI",
      rating: 4.7,
      plays: "88K",
      description: "Drop colored discs into the vertical grid. Form an unbroken line of four chips horizontally, vertically, or diagonally.",
      controls: [
        { key: "Click Column", action: "Drop disc into column" },
        { key: "Mode Toggle", action: "Switch between AI and 2-Player local" }
      ],
      src: "./games/connect4.html",
      iframe: '<iframe src="./games/connect4.html" title="Connect Four Battle" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#2563eb",
      thumbnailEmoji: "🔴"
    },
    {
      id: "asteroids",
      title: "Asteroids 1979",
      category: "Action",
      badge: "Retro",
      rating: 4.8,
      plays: "104K",
      description: "Pilot your triangular spaceship through dangerous deep space, blasting massive tumbling space rocks into pieces.",
      controls: [
        { key: "← / →", action: "Rotate ship" },
        { key: "↑ / W", action: "Engage thruster propulsion" },
        { key: "SPACE", action: "Fire photon torpedo" }
      ],
      src: "./games/asteroids.html",
      iframe: '<iframe src="./games/asteroids.html" title="Asteroids 1979" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#38bdf8",
      thumbnailEmoji: "🚀"
    },
    {
      id: "speed-typing",
      title: "Speed Typer",
      category: "Arcade",
      badge: "Fast",
      rating: 4.7,
      plays: "92K",
      description: "Test your keyboard reflexes! Type falling words before they hit the lower border to maintain your streak and WPM.",
      controls: [
        { key: "Keyboard Typing", action: "Type matching word" },
        { key: "ENTER", action: "Confirm typed word" }
      ],
      src: "./games/speed-typing.html",
      iframe: '<iframe src="./games/speed-typing.html" title="Speed Typer" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#a855f7",
      thumbnailEmoji: "⌨️"
    },
    {
      id: "tic-tac-toe",
      title: "Tic Tac Toe Master",
      category: "Puzzle",
      badge: "Minimax AI",
      rating: 4.6,
      plays: "120K",
      description: "Play classic X's and O's against an unbeatable algorithmic AI or face off in 2-player local tabletop mode.",
      controls: [
        { key: "Click Grid Cell", action: "Place X or O marker" }
      ],
      src: "./games/tic-tac-toe.html",
      iframe: '<iframe src="./games/tic-tac-toe.html" title="Tic Tac Toe Master" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>',
      accentColor: "#14b8a6",
      thumbnailEmoji: "❌"
    }
  ];

  // Application State
  let games = [];
  let favorites = [];
  let recentGames = [];
  let currentCategory = 'All';
  let currentSearch = '';
  let currentSort = 'popular';
  let activeGame = null;
  let isCloaked = false;
  let originalTitle = document.title;

  // Initialize
  function init() {
    loadStoredData();
    renderHeader();
    renderRecents();
    renderHero();
    renderGames();
    bindEvents();
    loadRemoteJson();
  }

  function loadStoredData() {
    try {
      const custom = JSON.parse(localStorage.getItem('novaplay_custom_games') || '[]');
      games = [...DEFAULT_GAMES, ...custom];
    } catch {
      games = [...DEFAULT_GAMES];
    }

    try {
      favorites = JSON.parse(localStorage.getItem('novaplay_favorites') || '["2048", "tetris", "retro-snake"]');
    } catch {
      favorites = ['2048', 'tetris', 'retro-snake'];
    }

    try {
      recentGames = JSON.parse(localStorage.getItem('novaplay_recent') || '["2048", "retro-snake", "tetris"]');
    } catch {
      recentGames = ['2048', 'retro-snake', 'tetris'];
    }
  }

  // Attempt to fetch updated games.json asynchronously without breaking if offline
  function loadRemoteJson() {
    fetch('./data/games.json')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const custom = JSON.parse(localStorage.getItem('novaplay_custom_games') || '[]');
          games = [...data, ...custom];
          renderHero();
          renderGames();
          renderRecents();
        }
      })
      .catch(() => {
        // Fallback is already loaded from DEFAULT_GAMES
      });
  }

  function getFilteredGames() {
    return games.filter(g => {
      if (currentCategory === 'Favorites') {
        if (!favorites.includes(g.id)) return false;
      } else if (currentCategory !== 'All' && g.category !== currentCategory) {
        return false;
      }

      if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase();
        return (
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (currentSort === 'rating') return b.rating - a.rating;
      if (currentSort === 'az') return a.title.localeCompare(b.title);
      // popular
      const pa = parseFloat(a.plays) * (a.plays.endsWith('K') ? 1000 : 1);
      const pb = parseFloat(b.plays) * (b.plays.endsWith('K') ? 1000 : 1);
      return pb - pa;
    });
  }

  function renderHeader() {
    const favCountEl = document.getElementById('fav-count');
    if (favCountEl) favCountEl.textContent = favorites.length;

    document.querySelectorAll('.nav-btn, .tab-btn').forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat) {
        btn.classList.toggle('active', cat === currentCategory);
      }
    });
  }

  function renderHero() {
    const heroEl = document.getElementById('hero-spotlight');
    if (!heroEl) return;

    if (currentCategory !== 'All' || currentSearch.trim() !== '') {
      heroEl.style.display = 'none';
      return;
    }

    heroEl.style.display = 'block';
    const featured = games.find(g => g.id === '2048') || games[0];
    if (!featured) return;

    document.getElementById('hero-title').textContent = featured.title;
    document.getElementById('hero-category').textContent = featured.category;
    document.getElementById('hero-rating').textContent = featured.rating;
    document.getElementById('hero-plays').textContent = featured.plays + ' plays';
    document.getElementById('hero-desc').textContent = featured.description;
    document.getElementById('hero-emoji').textContent = featured.thumbnailEmoji;

    const keysEl = document.getElementById('hero-keys');
    keysEl.innerHTML = '';
    featured.controls.slice(0, 2).forEach(c => {
      const span = document.createElement('span');
      span.className = 'key-tag';
      span.innerHTML = `<strong>${c.key}</strong> (${c.action})`;
      keysEl.appendChild(span);
    });

    document.getElementById('hero-play-btn').onclick = () => launchGame(featured);
    document.getElementById('hero-card-preview').onclick = () => launchGame(featured);
  }

  function renderRecents() {
    const section = document.getElementById('recent-section');
    const strip = document.getElementById('recent-strip');
    if (!section || !strip) return;

    if (currentCategory !== 'All' || currentSearch.trim() !== '') {
      section.style.display = 'none';
      return;
    }

    const items = recentGames
      .map(id => games.find(g => g.id === id))
      .filter(Boolean);

    if (items.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    strip.innerHTML = '';

    items.forEach(g => {
      const btn = document.createElement('button');
      btn.className = 'recent-pill';
      btn.innerHTML = `
        <span style="font-size: 20px;">${g.thumbnailEmoji}</span>
        <div style="text-align: left;">
          <div style="font-weight: 700; font-size: 13px;">${g.title}</div>
          <div style="font-size: 10px; color: var(--text-muted);">${g.category}</div>
        </div>
      `;
      btn.onclick = () => launchGame(g);
      strip.appendChild(btn);
    });
  }

  function renderGames() {
    const grid = document.getElementById('game-grid');
    const countEl = document.getElementById('games-count');
    const emptyEl = document.getElementById('empty-state');
    const titleEl = document.getElementById('section-title');

    if (!grid) return;

    const filtered = getFilteredGames();
    countEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'game' : 'games'}`;
    titleEl.textContent = currentCategory === 'Favorites' ? 'Your Saved Favorites' : (currentCategory === 'All' ? 'All Unblocked Games' : `${currentCategory} Games`);

    grid.innerHTML = '';

    if (filtered.length === 0) {
      emptyEl.style.display = 'block';
      grid.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    grid.style.display = 'grid';

    filtered.forEach(game => {
      const isFav = favorites.includes(game.id);
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <div class="card-top" style="background: radial-gradient(circle at 50% 120%, ${game.accentColor}25, #020617 75%);">
          <div class="card-emoji">${game.thumbnailEmoji}</div>
          <button class="card-fav-btn ${isFav ? 'active' : ''}" title="Favorite">
            ${isFav ? '❤️' : '🤍'}
          </button>
          ${game.badge ? `<div class="card-badge">${game.badge}</div>` : ''}
        </div>
        <div class="card-body">
          <div>
            <div class="card-meta">
              <span>${game.category}</span>
              <span>·</span>
              <span class="meta-star">★ ${game.rating}</span>
              <span>·</span>
              <span>${game.plays}</span>
            </div>
            <div class="card-title">${game.title}</div>
            <div class="card-desc">${game.description}</div>
          </div>
          <div class="card-footer">
            <span class="card-key">${game.controls[0] ? game.controls[0].key : 'Controls'}</span>
            <div class="card-play-action">Play ▶</div>
          </div>
        </div>
      `;

      card.onclick = (e) => {
        if (e.target.closest('.card-fav-btn')) {
          e.stopPropagation();
          toggleFavorite(game.id);
        } else {
          launchGame(game);
        }
      };

      grid.appendChild(card);
    });
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('novaplay_favorites', JSON.stringify(favorites));
    renderHeader();
    renderGames();
  }

  function launchGame(game) {
    activeGame = game;
    // update recent
    recentGames = [game.id, ...recentGames.filter(id => id !== game.id)].slice(0, 8);
    localStorage.setItem('novaplay_recent', JSON.stringify(recentGames));
    renderRecents();

    // open modal
    const modal = document.getElementById('player-modal');
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-emoji').textContent = game.thumbnailEmoji;
    document.getElementById('modal-category').textContent = game.category;
    document.getElementById('modal-desc').textContent = game.description;
    document.getElementById('modal-rating').textContent = game.rating;
    document.getElementById('modal-plays').textContent = game.plays;
    document.getElementById('modal-id').textContent = game.id;
    document.getElementById('embed-code').textContent = game.iframe;

    const iframeBox = document.getElementById('modal-iframe-container');
    if (game.iframe) {
      iframeBox.innerHTML = game.iframe;
    } else {
      iframeBox.innerHTML = `
        <iframe src="${game.src}" title="${game.title}" class="game-frame" allow="fullscreen; autoplay; gamepad; pointer-lock" allowfullscreen></iframe>
      `;
    }

    // update fav btn
    const favBtn = document.getElementById('modal-fav-btn');
    favBtn.textContent = favorites.includes(game.id) ? '❤️' : '🤍';
    favBtn.onclick = () => {
      toggleFavorite(game.id);
      favBtn.textContent = favorites.includes(game.id) ? '❤️' : '🤍';
    };

    // controls
    const ctrlBox = document.getElementById('modal-controls-list');
    ctrlBox.innerHTML = '';
    game.controls.forEach(c => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.alignItems = 'center';
      row.innerHTML = `
        <span class="key-tag"><strong>${c.key}</strong></span>
        <span style="font-size: 12px; color: var(--text-muted);">${c.action}</span>
      `;
      ctrlBox.appendChild(row);
    });

    // open standalone link
    document.getElementById('modal-external-link').href = game.src;

    modal.style.display = 'flex';
  }

  function closePlayer() {
    const modal = document.getElementById('player-modal');
    modal.style.display = 'none';
    const iframeBox = document.getElementById('modal-iframe-container');
    iframeBox.innerHTML = '';
    activeGame = null;
  }

  function toggleCloak() {
    isCloaked = !isCloaked;
    const cloakEl = document.getElementById('cloak-screen');
    if (isCloaked) {
      document.title = 'Google Drive - My Drive';
      cloakEl.style.display = 'flex';
    } else {
      document.title = originalTitle;
      cloakEl.style.display = 'none';
    }
  }

  function bindEvents() {
    // Categories
    document.querySelectorAll('[data-category]').forEach(btn => {
      btn.onclick = () => {
        currentCategory = btn.getAttribute('data-category');
        renderHeader();
        renderHero();
        renderRecents();
        renderGames();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });

    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.oninput = (e) => {
      currentSearch = e.target.value;
      renderHero();
      renderRecents();
      renderGames();
    };

    document.getElementById('clear-search').onclick = () => {
      searchInput.value = '';
      currentSearch = '';
      renderHero();
      renderRecents();
      renderGames();
    };

    // Sort
    document.getElementById('sort-select').onchange = (e) => {
      currentSort = e.target.value;
      renderGames();
    };

    // Random Game
    document.getElementById('surprise-btn').onclick = () => {
      if (games.length > 0) {
        const rand = games[Math.floor(Math.random() * games.length)];
        launchGame(rand);
      }
    };
    document.getElementById('hero-surprise-btn').onclick = () => {
      if (games.length > 0) {
        const rand = games[Math.floor(Math.random() * games.length)];
        launchGame(rand);
      }
    };

    // Stealth cloak
    document.getElementById('cloak-btn').onclick = toggleCloak;
    document.getElementById('exit-cloak-btn').onclick = toggleCloak;

    // Export JSON
    document.querySelectorAll('.export-json-btn').forEach(btn => {
      btn.onclick = () => {
        const str = JSON.stringify(games, null, 2);
        const blob = new Blob([str], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'games.json';
        a.click();
        URL.revokeObjectURL(url);
      };
    });

    // Add Custom Game Modal
    const addModal = document.getElementById('add-modal');
    document.getElementById('add-game-btn').onclick = () => {
      addModal.style.display = 'flex';
    };
    document.getElementById('close-add-modal').onclick = () => {
      addModal.style.display = 'none';
    };
    document.getElementById('cancel-add-modal').onclick = () => {
      addModal.style.display = 'none';
    };

    document.getElementById('add-game-form').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('form-title').value.trim();
      const cat = document.getElementById('form-category').value;
      const emoji = document.getElementById('form-emoji').value.trim() || '🎮';
      const input = document.getElementById('form-iframe').value.trim();
      const desc = document.getElementById('form-desc').value.trim();
      const key = document.getElementById('form-key').value.trim() || 'Controls';
      const action = document.getElementById('form-action').value.trim() || 'Play';

      if (!title || !input) return;

      let src = input;
      let iframe = input;
      if (input.startsWith('<iframe')) {
        const m = input.match(/src=["']([^"']+)["']/i);
        if (m) src = m[1];
      } else {
        iframe = `<iframe src="${src}" title="${title}" class="game-frame" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`;
      }

      const customGame = {
        id: 'custom-' + Date.now(),
        title,
        category: cat,
        badge: 'Custom',
        rating: 5.0,
        plays: '1',
        description: desc || 'Custom user added game.',
        controls: [{ key, action }],
        src,
        iframe,
        accentColor: '#10b981',
        thumbnailEmoji: emoji,
        isCustom: true
      };

      try {
        const saved = JSON.parse(localStorage.getItem('novaplay_custom_games') || '[]');
        saved.push(customGame);
        localStorage.setItem('novaplay_custom_games', JSON.stringify(saved));
      } catch(err){}

      games.unshift(customGame);
      addModal.style.display = 'none';
      renderGames();
      launchGame(customGame);
    };

    // Modal controls
    document.getElementById('close-player-btn').onclick = closePlayer;
    document.getElementById('modal-reload-btn').onclick = () => {
      if (activeGame) launchGame(activeGame);
    };
    document.getElementById('modal-fullscreen-btn').onclick = () => {
      const box = document.getElementById('modal-iframe-container');
      if (!document.fullscreenElement) {
        box.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    };
    document.getElementById('modal-code-toggle').onclick = () => {
      const box = document.getElementById('embed-code-drawer');
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    };
    document.getElementById('copy-embed-btn').onclick = () => {
      if (activeGame) {
        navigator.clipboard.writeText(activeGame.iframe);
        const btn = document.getElementById('copy-embed-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy Iframe Code', 2000);
      }
    };

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isCloaked) toggleCloak();
        else if (activeGame) closePlayer();
        else if (addModal.style.display === 'flex') addModal.style.display = 'none';
      } else if (e.key === '`') {
        e.preventDefault();
        toggleCloak();
      } else if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
