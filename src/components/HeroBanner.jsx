import React from 'react';
import { Play, Flame, Star, Sparkles } from 'lucide-react';

export function HeroBanner({
  featuredGame,
  onPlayGame,
  onOpenRandom,
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 mb-8 shadow-2xl">
      {/* Background glow */}
      <div
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: featuredGame.accentColor }}
      />
      <div className="absolute right-10 bottom-0 text-9xl opacity-5 select-none pointer-events-none">
        {featuredGame.thumbnailEmoji}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          {/* Metadata Kicker */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Featured Spotlight</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{featuredGame.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{featuredGame.rating}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{featuredGame.plays} plays</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {featuredGame.title}
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {featuredGame.description}
          </p>

          {/* Controls preview row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Quick Keys:</span>
            {featuredGame.controls.slice(0, 2).map((ctrl, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded text-slate-300 font-mono">
                <kbd className="text-emerald-400">{ctrl.key}</kbd>
                <span className="text-slate-400">({ctrl.action})</span>
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onPlayGame(featuredGame)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-150 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Now</span>
            </button>

            <button
              onClick={onOpenRandom}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Surprise Pick</span>
            </button>
          </div>
        </div>

        {/* Visual Card Showcase */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div
            onClick={() => onPlayGame(featuredGame)}
            className="w-full max-w-xs aspect-square rounded-2xl bg-slate-800/60 border border-slate-700/60 p-6 flex flex-col items-center justify-center text-center cursor-pointer group hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-200 shadow-xl"
          >
            <div className="text-6xl sm:text-7xl mb-4 group-hover:scale-110 transition-transform duration-200">
              {featuredGame.thumbnailEmoji}
            </div>
            <div className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
              {featuredGame.title}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Click to launch inside Iframe
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold group-hover:underline">
              <span>Start Session</span>
              <Play className="w-3 h-3 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
