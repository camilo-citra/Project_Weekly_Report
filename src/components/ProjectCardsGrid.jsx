import React, { useState } from 'react';
import { FileText, Eye, Bookmark, X } from 'lucide-react';

export default function ProjectCardsGrid({ projects }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Discovered Project Documents ({projects.length})</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Source: Drive Folder
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Each document represents a project. The compiler targets the highlighted <strong className="text-indigo-600 dark:text-indigo-300">Latest Tab</strong> for this week's report.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((proj) => {
          const latestTab = proj.tabs?.find(t => t.isLatest) || proj.tabs?.[0];

          return (
            <div key={proj.id} className="glass-card rounded-xl p-4 flex flex-col justify-between">
              
              <div>
                {/* Doc Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded badge-indigo">
                    Google Doc
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {proj.projectName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
                  {proj.docTitle}
                </p>

                {/* Latest Tab Info */}
                <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 mb-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span>Target Tab:</span>
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/40">
                      LATEST
                    </span>
                  </div>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-300 font-medium truncate">
                    {latestTab?.title || 'Main Tab'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Total Tabs in Doc: {proj.tabs?.length || 1}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedDoc(proj)}
                className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/80 text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-200 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect Tab Notes</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Raw Tab Notes Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedDoc.projectName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Doc: {selectedDoc.docTitle}</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tabs Available in Document:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDoc.tabs.map(t => (
                  <span
                    key={t.id}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${
                      t.isLatest ? 'badge-emerald font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {t.title} {t.isLatest ? '(Targeted for Report)' : ''}
                  </span>
                ))}
              </div>

              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-4">
                Raw Text Extracted from Target Latest Tab:
              </div>
              <pre className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {selectedDoc.tabs?.find(t => t.isLatest)?.rawText || 'No text extracted.'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
