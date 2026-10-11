import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Maximize2,
  RotateCcw,
  ExternalLink,
  Heart,
  Code,
  Check,
  Keyboard,
  Info
} from 'lucide-react';

export function GamePlayerModal({
  game,
  isFavorite,
  onClose,
  onToggleFavorite,
  onSelectGame,
  allGames,
}) {
  const containerRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showJsonEmbed, setShowJsonEmbed] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFullscreen = () => {
    if (iframeContainerRef.current) {
      if (!document.fullscreenElement) {
        iframeContainerRef.current.requestFullscreen().catch((err) => {
          console.error('Fullscreen request error:', err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(game.iframe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedGames = allGames
    .filter((g) => g.id !== game.id && (g.category === game.category || Math.random() > 0.5))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
      >
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl">{game.thumbnailEmoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  {game.title}
                </h2>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  · {game.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate hidden md:block">
                Loaded via JSON Iframe storage
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(game.id)}
              title={isFavorite ? 'Remove Favorite' : 'Save to Favorites'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleReload}
              title="Restart Game"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleFullscreen}
              title="Toggle Fullscreen"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <a
              href={game.src}
              target="_blank"
              rel="noopener noreferrer"
              title="Open standalone game tab"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setShowJsonEmbed(!showJsonEmbed)}
              title="View stored JSON Iframe code"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                showJsonEmbed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="h-5 w-px bg-slate-800 mx-1" />

            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* JSON Iframe Inspector Banner */}
        {showJsonEmbed && (
          <div className="px-4 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-slate-400 font-mono">
                Stored in <code>games.json</code>:
              </span>
              <button
                onClick={handleCopyIframe}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Iframe!' : 'Copy Embed Code'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-[11px] overflow-x-auto selection:bg-emerald-500 selection:text-black">
              {game.iframe}
            </pre>
          </div>
        )}

        {/* Main Game Iframe Viewport */}
        <div
          ref={iframeContainerRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[68vh] bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800"
        >
          <iframe
            key={iframeKey}
            src={game.src}
            title={game.title}
            className="w-full h-full border-0 select-none"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>

        {/* Bottom Details & Controls Section */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-900/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Description & Overview */}
            <div className="md:col-span-2 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>About this Game</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <span>Rating: <strong className="text-amber-400 font-medium">{game.rating} / 5.0</strong></span>
                <span aria-hidden="true">·</span>
                <span>All-time sessions: <strong className="text-slate-200">{game.plays}</strong></span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-mono">ID: {game.id}</span>
              </div>
            </div>

            {/* Controls Guide */}
            <div className="space-y-2.5 bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Controls Guide</span>
              </div>
              <div className="space-y-2 text-xs">
                {game.controls.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="font-mono bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-emerald-300 font-semibold text-[11px]">
                      {c.key}
                    </span>
                    <span className="text-slate-400 text-right truncate">
                      {c.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Recommendations row */}
          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>More Unblocked Games</span>
              <span className="text-[11px] text-slate-500 normal-case">Instant switch</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {relatedGames.map((rg) => (
                <button
                  key={rg.id}
                  onClick={() => onSelectGame(rg)}
                  className="flex items-center gap-2 p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-left transition-colors cursor-pointer group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {rg.thumbnailEmoji}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 truncate">
                      {rg.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {rg.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
