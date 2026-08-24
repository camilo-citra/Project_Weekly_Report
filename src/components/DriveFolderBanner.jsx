import React from 'react';
import { ExternalLink, FolderCheck, Calendar, CheckCircle2, FileSpreadsheet } from 'lucide-react';

export default function DriveFolderBanner({ folderId, projectCount, reportDate }) {
  const driveUrl = `https://drive.google.com/drive/folders/${folderId || '1ahlR-csyceKW1uqvdqYq_NZt8MvxacT9'}`;

  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-indigo-200 dark:border-indigo-500/20 relative overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
            <FolderCheck className="w-4 h-4" />
            <span>Target Google Drive Master Repository</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Folder: Weekly Project Reports</span>
              <a
                href={driveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1 text-xs font-medium underline underline-offset-4"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </h2>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
            Connected to Drive ID <code className="bg-slate-200 dark:bg-slate-900 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-mono">{folderId || '1ahlR-csyceKW1uqvdqYq_NZt8MvxacT9'}</code>.
            Extracts meeting minutes from the <strong className="text-indigo-700 dark:text-indigo-200">latest Google Doc tab</strong> across all active project files.
          </p>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 flex items-center space-x-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Projects Discovered</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{projectCount} Project Docs</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 flex items-center space-x-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Report Period</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Week of {reportDate || 'Aug 21, 2026'}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature indicators */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Latest Tab Isolation (`includeTabsContent`)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Gemini AI Schema Analysis</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Auto-Archived in Google Drive</span>
        </div>
      </div>

    </div>
  );
}
