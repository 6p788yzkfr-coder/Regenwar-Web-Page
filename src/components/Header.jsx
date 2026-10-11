import React from 'react';
import { Gamepad2, ShieldAlert, Plus, Sparkles, Heart } from 'lucide-react';

export function Header({
  currentCategory,
  onSelectCategory,
  onOpenAddModal,
  onToggleCloak,
  favoritesCount,
  onRandomGame,
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onSelectCategory('All')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <span>NovaPlay <span className="text-emerald-400 font-semibold text-xs tracking-wider uppercase ml-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Arcade</span></span>
          </button>

          {/* Zone 2: Concise Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => onSelectCategory('All')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentCategory === 'All'
                  ? 'text-emerald-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              All Games
            </button>
            <button
              onClick={() => onSelectCategory('Arcade')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentCategory === 'Arcade'
                  ? 'text-emerald-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Arcade
            </button>
            <button
              onClick={() => onSelectCategory('Puzzle')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentCategory === 'Puzzle'
                  ? 'text-emerald-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Puzzle
            </button>
            <button
              onClick={() => onSelectCategory('Action')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                currentCategory === 'Action'
                  ? 'text-emerald-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              Action
            </button>
            <button
              onClick={() => onSelectCategory('Favorites')}
              className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentCategory === 'Favorites'
                  ? 'text-emerald-400 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>Favorites ({favoritesCount})</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRandomGame}
              title="Play a random game"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Surprise Me</span>
            </button>

            <button
              onClick={onOpenAddModal}
              title="Add a custom game iframe"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Game</span>
            </button>

            <button
              onClick={onToggleCloak}
              title="Stealth Mode (Panic key: Esc)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Stealth Cloak</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
