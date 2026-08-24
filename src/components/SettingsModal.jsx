import React, { useState } from 'react';
import { Settings, Key, Folder, Shield, Check, X, Database } from 'lucide-react';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  settings, 
  onSave 
}) {
  const [folderId, setFolderId] = useState(settings.folderId || '1ahlR-csyceKW1uqvdqYq_NZt8MvxacT9');
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [credentials, setCredentials] = useState(settings.credentials || '');
  const [isDemoMode, setIsDemoMode] = useState(settings.isDemoMode ?? true);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      folderId,
      apiKey,
      credentials,
      isDemoMode
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>Google Drive & Gemini Settings</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          
          {/* Demo / Live Toggle */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Execution Mode</div>
              <div className="text-slate-400">Switch between pre-loaded Demo data and Live Google Drive sync.</div>
            </div>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                isDemoMode ? 'bg-amber-950 text-amber-300 border border-amber-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}
            >
              {isDemoMode ? 'Demo Workspace Mode' : 'Live Google Sync'}
            </button>
          </div>

          {/* Drive Folder ID */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>Google Drive Target Folder ID</span>
            </label>
            <input
              type="text"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              placeholder="e.g. 1ahlR-csyceKW1uqvdqYq_NZt8MvxacT9"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Target folder containing Google Docs with weekly meeting minute tabs.
            </p>
          </div>

          {/* Gemini API Key */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-purple-400" />
              <span>Gemini API Key (Optional in Demo Mode)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 font-mono focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Google Service Account Credentials */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Google Service Account JSON Credentials</span>
            </label>
            <textarea
              rows={3}
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder='Paste Service Account JSON or credentials {"type": "service_account", ...}'
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        <div className="flex items-center justify-end space-x-3 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white glow-button flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </div>
    </div>
  );
}
