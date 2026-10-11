import React, { useState } from 'react';
import { X, Plus, AlertCircle, Code } from 'lucide-react';

export function AddGameModal({
  onClose,
  onAddGame,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [controlsKey, setControlsKey] = useState('Arrow Keys');
  const [controlsAction, setControlsAction] = useState('Move / Action');
  const [emoji, setEmoji] = useState('🕹️');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }

    if (!iframeInput.trim()) {
      setError('Please provide an iframe embed tag or URL.');
      return;
    }

    let src = '';
    let iframeTag = '';

    // Check if user entered full <iframe ...> tag or bare URL
    if (iframeInput.trim().startsWith('<iframe')) {
      iframeTag = iframeInput.trim();
      const match = iframeInput.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        src = match[1];
      } else {
        setError('Could not extract src URL from the iframe tag.');
        return;
      }
    } else {
      src = iframeInput.trim();
      iframeTag = `<iframe src="${src}" title="${title.replace(/"/g, '&quot;')}" class="w-full h-full border-0 rounded-lg shadow-inner" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups"></iframe>`;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      badge: 'Custom',
      rating: 5.0,
      plays: '1',
      description: description.trim() || 'Custom user-added unblocked game.',
      controls: [
        { key: controlsKey.trim() || 'Controls', action: controlsAction.trim() || 'Play' }
      ],
      src,
      iframe: iframeTag,
      accentColor: '#10b981',
      thumbnailEmoji: emoji || '🎮',
      isCustom: true,
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg text-white">Add Iframe Game</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Game Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Slope Runner, Drift Boss"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Casual">Casual</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Emoji Icon
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={4}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Iframe Embed Code or URL *
            </label>
            <textarea
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              rows={3}
              placeholder='<iframe src="https://example.com/game.html" ...></iframe> OR direct URL'
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Stored directly in the JSON registry format requested.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief summary of gameplay and objective..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Key
              </label>
              <input
                type="text"
                value={controlsKey}
                onChange={(e) => setControlsKey(e.target.value)}
                placeholder="e.g. WASD, Arrow Keys"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Action
              </label>
              <input
                type="text"
                value={controlsAction}
                onChange={(e) => setControlsAction(e.target.value)}
                placeholder="e.g. Steer / Jump"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Save Game to JSON</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
