import React from 'react';
import { Play, Star, Heart } from 'lucide-react';

export function GameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) {
  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative flex flex-col bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl shadow-slate-950"
    >
      {/* Top Graphic Area */}
      <div
        className="relative h-36 w-full flex items-center justify-center overflow-hidden bg-slate-950"
        style={{
          background: `radial-gradient(circle at 50% 120%, ${game.accentColor}25, #020617 75%)`
        }}
      >
        <div className="text-5xl group-hover:scale-115 transition-transform duration-200 select-none">
          {game.thumbnailEmoji}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(e, game.id)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-lg backdrop-blur-md transition-colors ${
            isFavorite
              ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle badge text if present */}
        {game.badge && (
          <span className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold text-emerald-400 tracking-wide uppercase bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-500/20">
            {game.badge}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
            <span>{game.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span>{game.rating}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{game.plays}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">
            {game.controls[0] ? game.controls[0].key : 'Keyboard / Mouse'}
          </span>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
            <span>Play</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}
