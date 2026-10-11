import React, { useState, useEffect, useMemo, useRef } from 'react';
import initialGamesData from './data/games.json';
import { Header } from './components/Header.jsx';
import { HeroBanner } from './components/HeroBanner.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { CloakScreen } from './components/CloakScreen.jsx';
import {
  Search,
  SlidersHorizontal,
  Clock,
  Gamepad,
  Heart,
  Download,
  Info
} from 'lucide-react';

export default function App() {
  // Load custom games from localStorage
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('novaplay_custom_games');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        return [...initialGamesData, ...parsed];
      }
    } catch (e) {
      console.error('Error loading custom games:', e);
    }
    return initialGamesData;
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('novaplay_favorites');
      return saved ? JSON.parse(saved) : ['2048', 'tetris', 'retro-snake'];
    } catch {
      return ['2048', 'tetris', 'retro-snake'];
    }
  });

  // Recently played games
  const [recentGames, setRecentGames] = useState(() => {
    try {
      const saved = localStorage.getItem('novaplay_recent');
      return saved ? JSON.parse(saved) : ['2048', 'retro-snake', 'tetris'];
    } catch {
      return ['2048', 'retro-snake', 'tetris'];
    }
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Modal states
  const [activeGame, setActiveGame] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCloaked, setIsCloaked] = useState(false);

  const searchInputRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search on '/'
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Panic cloak on '`'
      if (e.key === '`') {
        e.preventDefault();
        setIsCloaked((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (e, id) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem('novaplay_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Launch a game
  const handlePlayGame = (game) => {
    setActiveGame(game);
    // Update recent games
    setRecentGames((prev) => {
      const filtered = prev.filter((gid) => gid !== game.id);
      const updated = [game.id, ...filtered].slice(0, 8);
      localStorage.setItem('novaplay_recent', JSON.stringify(updated));
      return updated;
    });
  };

  // Add custom game
  const handleAddCustomGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter((g) => g.isCustom);
      localStorage.setItem('novaplay_custom_games', JSON.stringify(customOnly));
      return updated;
    });
    handlePlayGame(newGame);
  };

  // Pick random game
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomPick = games[Math.floor(Math.random() * games.length)];
    handlePlayGame(randomPick);
  };

  // Export games.json file
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(games, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered and sorted games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (selectedCategory === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (selectedCategory !== 'All' && game.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesDesc = game.description.toLowerCase().includes(query);
        const matchesCat = game.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'az') return a.title.localeCompare(b.title);
      // default: popular
      const parsePlays = (p) => {
        if (typeof p === 'string' && p.endsWith('K')) return parseFloat(p) * 1000;
        return parseFloat(p) || 0;
      };
      return parsePlays(b.plays) - parsePlays(a.plays);
    });
  }, [games, selectedCategory, searchQuery, sortBy, favorites]);

  // Featured game for the hero banner
  const featuredGame = useMemo(() => {
    return games.find((g) => g.id === '2048') || games[0];
  }, [games]);

  // Recently played items
  const recentGameItems = useMemo(() => {
    return recentGames
      .map((id) => games.find((g) => g.id === id))
      .filter(Boolean);
  }, [recentGames, games]);

  const categories = ['All', 'Arcade', 'Puzzle', 'Action', 'Retro', 'Casual', 'Strategy'];

  if (isCloaked) {
    return <CloakScreen onExit={() => setIsCloaked(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onToggleCloak={() => setIsCloaked(true)}
        favoritesCount={favorites.length}
        onRandomGame={handleRandomGame}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Spotlight (shown when viewing All and not actively searching) */}
        {selectedCategory === 'All' && !searchQuery.trim() && (
          <HeroBanner
            featuredGame={featuredGame}
            onPlayGame={handlePlayGame}
            onOpenRandom={handleRandomGame}
          />
        )}

        {/* Recently Played Quick Bar */}
        {recentGameItems.length > 0 && !searchQuery.trim() && selectedCategory === 'All' && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Jump Back In</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {recentGameItems.length} recent
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {recentGameItems.map((rg) => (
                <button
                  key={rg.id}
                  onClick={() => handlePlayGame(rg)}
                  className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl whitespace-nowrap text-left transition-all shrink-0 cursor-pointer group shadow-sm"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {rg.thumbnailEmoji}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400">
                      {rg.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {rg.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Search, Category Filters, and Sort Toolbar */}
        <section className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input with shortcut hint */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search unblocked games... (Press / to focus)"
                className="w-full pl-10 pr-12 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-3.5 top-2.5 text-[10px] font-mono text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  /
                </span>
              )}
            </div>

            {/* Sort & Download Controls */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="az">Title A-Z</option>
              </select>

              <button
                onClick={handleExportJson}
                title="Download current registry as games.json"
                className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Tabs (Segmented Button Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-slate-950 shadow-sm'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setSelectedCategory('Favorites')}
              className={`flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'Favorites'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>
        </section>

        {/* Games Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {selectedCategory === 'Favorites'
                ? 'Your Saved Favorites'
                : selectedCategory === 'All'
                ? 'All Unblocked Games'
                : `${selectedCategory} Games`}
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
            </span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onPlay={handlePlayGame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8">
              <Gamepad className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">
                No games found
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                {searchQuery
                  ? `No matching games for "${searchQuery}". Try a different search term or category.`
                  : selectedCategory === 'Favorites'
                  ? 'You have not added any favorites yet! Click the heart icon on any game card to bookmark it.'
                  : 'No games available in this category.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>

        {/* Storage Architecture Notice */}
        <section className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  JSON Iframe Storage Specification
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  All games are cataloged inside <code>games.json</code> with direct embedded <code>&lt;iframe&gt;</code> tags.
                  No external ad trackers or school firewall blockers are loaded.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportJson}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download games.json</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            NovaPlay Unblocked Games · High-speed HTML5 Arcade & Puzzle Portal
          </div>
          <div className="flex items-center gap-4">
            <span>Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400 font-mono text-[11px]">`</kbd> for Stealth Mode</span>
            <span>·</span>
            <span>Self-Contained Iframes</span>
          </div>
        </div>
      </footer>

      {/* Active Game Iframe Modal */}
      {activeGame && (
        <GamePlayerModal
          game={activeGame}
          isFavorite={favorites.includes(activeGame.id)}
          onClose={() => setActiveGame(null)}
          onToggleFavorite={(id) => handleToggleFavorite(null, id)}
          onSelectGame={(g) => handlePlayGame(g)}
          allGames={games}
        />
      )}

      {/* Add Custom Game Modal */}
      {isAddModalOpen && (
        <AddGameModal
          onClose={() => setIsAddModalOpen(false)}
          onAddGame={handleAddCustomGame}
        />
      )}
    </div>
  );
}
