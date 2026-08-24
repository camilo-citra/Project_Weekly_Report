import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  Clipboard, 
  Sparkles,
  AlertCircle,
  FolderTree,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { extractProjectMetadata, getWeeklyArchiveFolderName } from '../services/projectIdentifierService';

export default function FileUploadSection({ 
  uploadedProjects, 
  onUploadFiles, 
  onRemoveProject, 
  onAddTextProject, 
  onCompileReport, 
  isProcessing 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteProjectName, setPasteProjectName] = useState('');
  const [pasteContent, setPasteContent] = useState('');
  const fileInputRef = useRef(null);

  const weeklyFolderPreview = getWeeklyArchiveFolderName();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files) => {
    const fileList = Array.from(files);
    const parsedPromises = fileList.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          const meta = extractProjectMetadata(content, file.name);

          resolve({
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            projectName: meta.projectName,
            docTitle: file.name,
            fileSize: (file.size / 1024).toFixed(1) + ' KB',
            sourceType: file.name.split('.').pop().toUpperCase() || 'TXT',
            detectedDate: meta.meetingDate,
            tabs: [
              {
                id: `tab-upload-latest`,
                title: `Uploaded Notes (${meta.meetingDate})`,
                date: meta.meetingDate,
                isLatest: true,
                rawText: content
              }
            ]
          });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(parsedPromises).then((newProjects) => {
      onUploadFiles(newProjects);
    });
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!pasteContent.trim()) return;

    const meta = extractProjectMetadata(pasteContent, pasteProjectName || 'Pasted Project Notes');
    const finalProjectName = pasteProjectName.trim() || meta.projectName;

    onAddTextProject({
      id: `paste-${Date.now()}`,
      projectName: finalProjectName,
      docTitle: `${finalProjectName} Notes`,
      fileSize: (pasteContent.length / 1024).toFixed(1) + ' KB',
      sourceType: 'PASTED',
      detectedDate: meta.meetingDate,
      tabs: [
        {
          id: `tab-paste-latest`,
          title: `Direct Notes (${meta.meetingDate})`,
          date: meta.meetingDate,
          isLatest: true,
          rawText: pasteContent.trim()
        }
      ]
    });

    setPasteProjectName('');
    setPasteContent('');
    setIsPasteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Filing Architecture Banner */}
      <div className="glass-panel rounded-xl p-4 border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FolderTree className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              Automated Weekly Filing Architecture
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-0.5">
              Archive Directory: <strong className="text-indigo-600 dark:text-indigo-300">Executive_Weekly_Archive / {weeklyFolderPreview}</strong>
            </div>
          </div>
        </div>

        <span className="text-[11px] px-2.5 py-1 rounded-full badge-emerald font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Auto-Filing Ready</span>
        </span>
      </div>

      {/* Bulk Drag & Drop Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`glass-panel rounded-2xl p-8 border-2 border-dashed transition-all cursor-pointer text-center relative overflow-hidden ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 scale-[1.01]' 
            : 'border-slate-300 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500/60'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept=".txt,.md,.json,.html,.csv,.doc,.docx"
          className="hidden"
        />

        <div className="max-w-xl mx-auto space-y-3 pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 mx-auto flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Bulk Upload Project Meeting Minutes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select or drop multiple files at once. Project names & dates are <strong className="text-indigo-600 dark:text-indigo-300">automatically detected</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-400 font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Multiple Files</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Auto Project Name Detection</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">Weekly Archiving</span>
          </div>
        </div>

        {/* Quick Paste Option */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPasteModalOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 transition-colors pointer-events-auto"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste Notes Manually</span>
          </button>
        </div>
      </div>

      {/* Uploaded Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Loaded Project Files ({uploadedProjects.length})</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full badge-indigo">
                {uploadedProjects.length > 0 ? 'Projects Ready' : 'Awaiting Uploads'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each file has been assigned its identified project name. Click compile to generate the weekly report.
            </p>
          </div>

          <button
            onClick={onCompileReport}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white glow-button hover:cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Synthesizing Report...' : 'Compile & Archive Weekly Report'}</span>
          </button>
        </div>

        {uploadedProjects.length === 0 ? (
          <div className="glass-panel rounded-xl p-8 text-center text-slate-400 border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium">No project files loaded yet.</p>
            <p className="text-xs text-slate-500 mt-1">Perform a bulk file upload above or click the Compile button to load your archived projects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedProjects.map((proj) => (
              <div key={proj.id} className="glass-card rounded-xl p-4 flex flex-col justify-between border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded badge-emerald flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{proj.sourceType || 'FILE'}</span>
                    </span>
                    <button
                      onClick={() => onRemoveProject(proj.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                    {proj.projectName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
                    File: {proj.docTitle} ({proj.fileSize})
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 line-clamp-3">
                    {proj.tabs?.[0]?.rawText?.substring(0, 150)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Paste Notes Modal */}
      {isPasteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Paste Project Meeting Minutes
            </h3>

            <form onSubmit={handlePasteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Name (Optional - AI auto-detects if left blank)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Project Epsilon"
                  value={pasteProjectName}
                  onChange={(e) => setPasteProjectName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meeting Minutes Text
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Paste raw meeting notes..."
                  value={pasteContent}
                  onChange={(e) => setPasteContent(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-100 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPasteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
