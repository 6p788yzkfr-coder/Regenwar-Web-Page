import React, { useEffect } from 'react';
import { FileText, Folder, HardDrive, Share2, Clock, Star, Trash2, Search } from 'lucide-react';

export function CloakScreen({ onExit }) {
  // Sync document title while cloaked
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Google Drive - My Drive';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === '`') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-white text-slate-800 flex flex-col font-sans select-none animate-in fade-in duration-75">
      {/* Top Google Drive Header */}
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            Δ
          </div>
          <span className="text-xl font-medium text-slate-700 tracking-tight">Drive</span>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search in Drive"
              defaultValue="AP US History Research Document 2026.docx"
              className="w-full bg-slate-100 border border-transparent rounded-full py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle exit cloak trigger */}
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Press Esc or click to resume gaming"
          >
            Exit Cloak (Esc)
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            S
          </div>
        </div>
      </header>

      {/* Main Drive Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-60 border-r border-slate-200 p-4 space-y-1">
          <button className="w-full mb-4 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3">
            <span className="text-xl font-light text-blue-600">+</span>
            <span>New Document</span>
          </button>

          <div className="space-y-0.5 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold">
              <HardDrive className="w-4 h-4" />
              <span>My Drive</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-slate-100">
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Shared with me</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-slate-100">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Recent</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-slate-100">
              <Star className="w-4 h-4 text-slate-500" />
              <span>Starred</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-slate-100">
              <Trash2 className="w-4 h-4 text-slate-500" />
              <span>Trash</span>
            </div>
          </div>
        </aside>

        {/* File List */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-medium text-slate-800 mb-4">Suggested Study Files</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700 truncate">Calculus_Unit4_Notes.pdf</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3">
                Derivatives of trigonometric functions, chain rule applications, related rates practice problems.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold text-slate-700 truncate">Biology_Lab_Cellular_Respiration.docx</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3">
                Quantitative examination of ATP synthase output under varied pH gradient conditions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Folder className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-slate-700 truncate">World_History_Project_2026</span>
              </div>
              <p className="text-xs text-slate-500">
                14 files · Modified 3 hours ago
              </p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Files</h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-sm">
            <div className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-800">English_Literature_Essay_Draft_Final.docx</span>
              </div>
              <span className="text-xs text-slate-400">Edited 2 hours ago</span>
            </div>
            <div className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-800">Physics_Kinematics_Problem_Set_4.pdf</span>
              </div>
              <span className="text-xs text-slate-400">Edited yesterday</span>
            </div>
            <div className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-800">Chemistry_Periodic_Trends_Summary.docx</span>
              </div>
              <span className="text-xs text-slate-400">Edited Oct 8</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
