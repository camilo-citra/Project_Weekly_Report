import React from 'react';
import { CheckCircle2, ExternalLink, FolderCheck, FileText, Download, X } from 'lucide-react';

export default function ExportSuccessModal({ isOpen, onClose, exportData, type }) {
  if (!isOpen || !exportData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-emerald-500/30 shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <span>Export & Archive Completed</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <FolderCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Archive Folder Location:</span>
            </div>
            <div className="text-xs font-mono text-indigo-300 font-medium break-all">
              {exportData.archivePath}
            </div>
          </div>

          {exportData.docUrl && (
            <a
              href={exportData.docUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/30"
            >
              <FileText className="w-4 h-4" />
              <span>Open Document in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
