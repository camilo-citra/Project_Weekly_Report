import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckSquare, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';

export default function ExecutiveReportView({ report }) {
  const [collapsedProjects, setCollapsedProjects] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  if (!report) return null;

  const toggleCollapse = (id) => {
    setCollapsedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const buildProjectText = (proj) => {
    let text = `Date: ${proj.meetingDate || report.reportDate}\n`;
    text += `Project name: ${proj.projectName}\n`;
    text += `Executive summary: ${proj.summary}\n`;
    text += `Project risks:\n`;
    if (proj.keyRisks && proj.keyRisks.length > 0) {
      proj.keyRisks.forEach(r => {
        const detail = typeof r === 'string' ? r : (r.risk ? `${r.risk}${r.impact ? ': ' + r.impact : ''}` : JSON.stringify(r));
        text += `• ${detail}\n`;
      });
    } else {
      text += `• No critical risks identified.\n`;
    }
    text += `Key decisions:\n`;
    if (proj.criticalDecisions && proj.criticalDecisions.length > 0) {
      proj.criticalDecisions.forEach(d => {
        text += `• ${d}\n`;
      });
    } else {
      text += `• No key decisions recorded for this period.\n`;
    }
    text += `The Way Forward:\n`;
    if (proj.wayForward && proj.wayForward.length > 0) {
      proj.wayForward.forEach(w => {
        const detail = typeof w === 'string' ? w : `${w.task}${w.owner ? ' (Owner: ' + w.owner : ''}${w.deadline ? ', Target: ' + w.deadline + ')' : ')'}`;
        text += `• ${detail}\n`;
      });
    } else {
      text += `• Proceed as scheduled.\n`;
    }
    return text;
  };

  const handleCopyProject = (proj) => {
    const text = buildProjectText(proj);
    navigator.clipboard.writeText(text);
    setCopiedId(proj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = report.projects.map(p => buildProjectText(p)).join('\n\n---\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedId('ALL');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="executive-report-document" className="space-y-8">
      
      {/* Report Document Banner Header */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-200 dark:border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Consolidated Executive Report • Executive Bullet-Point Format</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Weekly Portfolio Executive Summary
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Formatted according to standard Executive Summary structure • Date: {report.reportDate}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={handleCopyAll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 shadow-sm transition-colors"
            >
              {copiedId === 'ALL' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'ALL' ? 'Copied Full Executive Report!' : 'Copy All Reports (Text)'}</span>
            </button>
            <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-slate-700 dark:text-slate-300 font-mono">Date: {report.reportDate}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Executive KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{report.totalProjects}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Active Projects</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{report.highRisksCount}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">High Risks Identified</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{report.decisionsCount}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Key Decisions</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{report.actionItemsCount}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Way Forward Items</div>
            </div>
          </div>
        </div>

        {/* Portfolio Executive Synthesis Narrative */}
        <div className="mt-6 bg-slate-50 dark:bg-slate-900/80 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
            <span>Portfolio Executive Overview</span>
          </h3>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>
      </div>

      {/* Per-Project Consolidated Sections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Individual Executive Project Summaries ({report.projects?.length})
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Structure: Date • Project name • Executive summary • Project risks • Key decisions • Way forward
          </span>
        </div>

        {report.projects?.map((proj) => {
          const isCollapsed = collapsedProjects[proj.id];

          return (
            <div 
              key={proj.id} 
              className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 shadow-sm"
            >
              {/* Project Bar Header */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    proj.status === 'At Risk' ? 'badge-amber' : 
                    proj.status === 'Off Track' ? 'badge-rose' : 'badge-emerald'
                  }`}>
                    {proj.status}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{proj.projectName}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Date: <span className="text-indigo-600 dark:text-indigo-300 font-medium">{proj.meetingDate || report.reportDate}</span> • 
                      Doc: <span className="text-slate-700 dark:text-slate-300 font-medium">{proj.docTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyProject(proj)}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                    title="Copy formatted executive text"
                  >
                    {copiedId === proj.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === proj.id ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={() => toggleCollapse(proj.id)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="p-6 space-y-6 text-sm text-slate-800 dark:text-slate-200">
                  
                  {/* Metadata Fields */}
                  <div className="space-y-1 font-mono text-xs bg-slate-100 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div><strong className="text-slate-500 dark:text-slate-400">Date:</strong> <span className="text-slate-900 dark:text-white">{proj.meetingDate || report.reportDate}</span></div>
                    <div><strong className="text-slate-500 dark:text-slate-400">Project name:</strong> <span className="text-indigo-600 dark:text-indigo-300 font-bold">{proj.projectName}</span></div>
                  </div>

                  {/* Executive Summary */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Executive summary:</span>
                    </h5>
                    <p className="text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  {/* Project Risks */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Project risks:</span>
                    </h5>

                    <ul className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                      {proj.keyRisks?.map((riskItem, rIdx) => {
                        const riskText = typeof riskItem === 'string' 
                          ? riskItem 
                          : `${riskItem.risk}${riskItem.impact ? ' — ' + riskItem.impact : ''}`;
                        return (
                          <li key={rIdx} className="flex items-start space-x-2 text-xs">
                            <span className="text-rose-500 dark:text-rose-400 font-bold shrink-0">•</span>
                            <span className="text-slate-800 dark:text-slate-200 leading-relaxed">{riskText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Key Decisions */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Key decisions:</span>
                    </h5>

                    <ul className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                      {proj.criticalDecisions?.map((dec, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2 text-xs">
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold shrink-0">•</span>
                          <span className="text-slate-800 dark:text-slate-200 leading-relaxed">{dec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Way Forward */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>The Way Forward:</span>
                    </h5>

                    <ul className="space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                      {proj.wayForward?.map((wf, wIdx) => {
                        const wayText = typeof wf === 'string'
                          ? wf
                          : `${wf.task}${wf.owner ? ' (' + wf.owner + ')' : ''}`;
                        return (
                          <li key={wIdx} className="flex items-start space-x-2 text-xs">
                            <span className="text-purple-500 dark:text-purple-400 font-bold shrink-0">•</span>
                            <span className="text-slate-800 dark:text-slate-200 leading-relaxed">{wayText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

