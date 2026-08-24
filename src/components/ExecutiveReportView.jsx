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
  ChevronUp
} from 'lucide-react';

export default function ExecutiveReportView({ report }) {
  const [collapsedProjects, setCollapsedProjects] = useState({});

  if (!report) return null;

  const toggleCollapse = (id) => {
    setCollapsedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="executive-report-document" className="space-y-8">
      
      {/* Report Document Banner Header */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-200 dark:border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Consolidated Executive Report • Past Week</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Weekly Portfolio Executive Summary
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Compiled from latest Google Doc tabs • Archived on {report.reportDate}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-slate-700 dark:text-slate-300 font-mono">Week Ending: {report.reportDate}</span>
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
              <div className="text-xs text-slate-500 dark:text-slate-400">Critical Decisions</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{report.actionItemsCount}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Way Forward Tasks</div>
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
            Individual Project Executive Summaries ({report.projects?.length})
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Mandatory Sections: Summary • Key Risks • Critical Decisions • Way Forward
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
                      Doc: <span className="text-slate-700 dark:text-slate-300 font-medium">{proj.docTitle}</span> • 
                      Tab Targeted: <span className="text-indigo-600 dark:text-indigo-300 font-mono font-medium">{proj.latestTabName}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleCollapse(proj.id)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>
              </div>

              {!isCollapsed && (
                <div className="p-6 space-y-6">
                  
                  {/* 1. Summary */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>1. Past Week Executive Summary</span>
                    </h5>
                    <p className="text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  {/* 2. Key Risks */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>2. Key Risks & Mitigations</span>
                    </h5>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                            <th className="py-2.5 px-3">Level</th>
                            <th className="py-2.5 px-3">Risk Description</th>
                            <th className="py-2.5 px-3">Business Impact</th>
                            <th className="py-2.5 px-3">Mitigation Strategy</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                          {proj.keyRisks?.map((riskItem, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  riskItem.level === 'High' ? 'badge-rose' :
                                  riskItem.level === 'Medium' ? 'badge-amber' :
                                  'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                }`}>
                                  {riskItem.level}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-medium text-slate-900 dark:text-slate-200">{riskItem.risk}</td>
                              <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{riskItem.impact}</td>
                              <td className="py-3 px-3 text-indigo-700 dark:text-indigo-300 font-medium">{riskItem.mitigation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 3. Critical Decisions */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>3. Critical Decisions Approved</span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {proj.criticalDecisions?.map((dec, dIdx) => (
                        <div key={dIdx} className="bg-slate-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3.5 flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-normal">{dec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Way Forward */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>4. Way Forward & Deliverables</span>
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {proj.wayForward?.map((wf, wIdx) => (
                        <div key={wIdx} className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col justify-between space-y-2">
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                            {wf.task}
                          </div>
                          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200 dark:border-slate-800/80">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Owner: <strong className="text-indigo-600 dark:text-indigo-300">{wf.owner}</strong></span>
                            <span className="text-purple-600 dark:text-purple-300 font-mono font-medium">{wf.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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
