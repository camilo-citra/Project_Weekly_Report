import React from 'react';
import { Sparkles, FileText, Download, Settings, RefreshCw, Layers, Sun, Moon } from 'lucide-react';

export default function Header({ 
  onGenerateReport, 
  onExportDoc, 
  onExportPdf, 
  onOpenSettings, 
  isProcessing, 
  hasReport, 
  mode,
  theme,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand / Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Weekly Exec Compiler
              </h1>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                mode === 'live' ? 'badge-emerald' : 'badge-amber'
              }`}>
                {mode === 'live' ? 'Google Drive Sync' : 'Demo Workspace Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-extracts latest Google Doc tabs • Summarizes key risks & decisions
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-indigo-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Google Drive & Gemini Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {hasReport && (
            <>
              <button
                onClick={onExportDoc}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Export to Google Doc</span>
              </button>

              <button
                onClick={onExportPdf}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Export PDF</span>
              </button>
            </>
          )}

          <button
            onClick={onGenerateReport}
            disabled={isProcessing}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white glow-button disabled:opacity-50 disabled:cursor-not-allowed ${
              isProcessing ? 'animate-pulse' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Parsing Tabs & Generating AI Report...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{hasReport ? 'Re-Generate Report' : 'Generate Weekly Report'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
