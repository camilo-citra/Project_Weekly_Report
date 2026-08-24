import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FileUploadSection from './components/FileUploadSection';
import ExecutiveReportView from './components/ExecutiveReportView';
import SettingsModal from './components/SettingsModal';
import ExportSuccessModal from './components/ExportSuccessModal';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({
    apiKey: '',
    isDemoMode: false
  });

  const [uploadedProjects, setUploadedProjects] = useState([]);
  const [report, setReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [exportSuccessData, setExportSuccessData] = useState(null);

  // Apply theme class to body element
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Automatically load latest archived files and report on mount
  useEffect(() => {
    loadLatestArchive();
  }, []);

  const loadLatestArchive = async () => {
    try {
      const res = await fetch('/api/load-latest-archive');
      const data = await res.json();
      if (data.success) {
        if (data.projects && data.projects.length > 0) {
          setUploadedProjects(data.projects);
        }
        if (data.report) {
          setReport(data.report);
        }
      }
    } catch (err) {
      console.warn('Could not auto-load latest archive:', err);
    }
  };

  const handleUploadFiles = (newProjects) => {
    setUploadedProjects(prev => [...newProjects, ...prev]);
  };

  const handleRemoveProject = async (id) => {
    const targetProj = uploadedProjects.find(p => p.id === id);
    const updatedProjects = uploadedProjects.filter(p => p.id !== id);
    setUploadedProjects(updatedProjects);

    if (targetProj) {
      try {
        await fetch('/api/delete-project-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            docTitle: targetProj.docTitle,
            projectName: targetProj.projectName
          })
        });
      } catch (err) {
        console.error('Error deleting project file from backend:', err);
      }
    }

    if (updatedProjects.length > 0) {
      try {
        const res = await fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projects: updatedProjects,
            apiKey: settings.apiKey,
            isDemoMode: false
          })
        });
        const data = await res.json();
        if (data.success && data.report) {
          setReport(data.report);
        }
      } catch (err) {
        console.error('Error re-generating report after removal:', err);
      }
    } else {
      setReport(null);
    }
  };

  const handleAddTextProject = (newProject) => {
    setUploadedProjects(prev => [newProject, ...prev]);
  };

  const handleCompileReport = async () => {
    setIsProcessing(true);

    try {
      let targetProjects = uploadedProjects;

      if (targetProjects.length === 0) {
        const loadRes = await fetch('/api/load-latest-archive');
        const loadData = await loadRes.json();
        if (loadData.success && loadData.projects && loadData.projects.length > 0) {
          targetProjects = loadData.projects;
          setUploadedProjects(loadData.projects);
        }
      }

      if (targetProjects.length === 0) {
        alert('Please drag and drop or paste project meeting minute files first!');
        setIsProcessing(false);
        return;
      }

      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projects: targetProjects,
          apiKey: settings.apiKey,
          isDemoMode: false
        })
      });

      const data = await res.json();
      if (data.success && data.report) {
        setReport(data.report);

        await fetch('/api/save-weekly-archive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            report: data.report,
            projects: targetProjects
          })
        });

        setTimeout(() => {
          const el = document.getElementById('executive-report-document');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } catch (err) {
      console.error('Error compiling AI report:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Direct Browser Exporter for .doc / Google Doc compatible file
  const handleExportDoc = async () => {
    if (!report) return;

    try {
      // 1. Build Word-compatible HTML string
      let docHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Executive Weekly Report - ${report.reportDate}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 30px; }
            h1 { color: #4338ca; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; font-size: 24px; }
            h2 { color: #1e1b4b; margin-top: 28px; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
            h3 { color: #334155; margin-top: 20px; font-size: 15px; }
            h4 { color: #475569; margin-top: 14px; font-size: 13px; font-weight: bold; }
            .summary-box { background: #f8fafc; border-left: 4px solid #4f46e5; padding: 14px 18px; margin: 18px 0; border-radius: 4px; }
            .status-badge { display: inline-block; padding: 3px 10px; font-weight: bold; border-radius: 4px; font-size: 11px; text-transform: uppercase; }
            .badge-risk { background: #fef3c7; color: #92400e; }
            .badge-track { background: #d1fae5; color: #065f46; }
            table { width: 100%; border-collapse: collapse; margin: 12px 0; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 12px; }
            th { background: #f1f5f9; font-weight: bold; color: #334155; }
            ul { margin-top: 6px; padding-left: 20px; }
            li { margin-bottom: 4px; font-size: 13px; }
          </style>
        </head>
        <body>
          <h1>Executive Portfolio Weekly Report</h1>
          <p><strong>Report Date:</strong> ${report.reportDate} | <strong>Total Active Projects:</strong> ${report.totalProjects}</p>
          
          <div className="summary-box">
            <h3 style="margin-top:0;">Portfolio Executive Summary</h3>
            <p>${report.executiveSummary}</p>
          </div>
          
          <h2>Project Status Summaries</h2>
      `;

      report.projects?.forEach(p => {
        docHtml += `
          <div style="margin-bottom: 30px;">
            <h3>${p.projectName} &nbsp;<span class="status-badge ${p.status === 'At Risk' ? 'badge-risk' : 'badge-track'}">${p.status}</span></h3>
            <p><strong>Summary:</strong> ${p.summary}</p>
            
            <h4>Key Risks & Mitigations</h4>
            <table>
              <thead>
                <tr>
                  <th style="width:25%;">Risk</th>
                  <th style="width:30%;">Impact</th>
                  <th style="width:15%;">Level</th>
                  <th style="width:30%;">Mitigation</th>
                </tr>
              </thead>
              <tbody>
                ${p.keyRisks?.map(r => `
                  <tr>
                    <td><strong>${r.risk}</strong></td>
                    <td>${r.impact}</td>
                    <td><strong>${r.level}</strong></td>
                    <td>${r.mitigation}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <h4>Critical Decisions Approved</h4>
            <ul>
              ${p.criticalDecisions?.map(d => `<li>${d}</li>`).join('')}
            </ul>
            
            <h4>Way Forward & Deliverables</h4>
            <ul>
              ${p.wayForward?.map(w => `<li><strong>${w.task}</strong> — <em>Owner: ${w.owner} (Target: ${w.deadline})</em></li>`).join('')}
            </ul>
          </div>
        `;
      });

      docHtml += `</body></html>`;

      // 2. Trigger direct browser download
      const blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Executive_Weekly_Report_${report.reportDate}.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // 3. Save to backend archive
      const res = await fetch('/api/save-weekly-archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report, projects: uploadedProjects })
      });
      const data = await res.json();

      setExportSuccessData({
        archivePath: `Downloads / Executive_Weekly_Report_${report.reportDate}.doc`,
        docUrl: null
      });

    } catch (err) {
      console.error('Export error:', err);
    }
  };

  // Direct Browser Exporter for PDF
  const handleExportPdf = () => {
    if (!report) return;
    const element = document.getElementById('executive-report-document');
    
    if (window.html2pdf && element) {
      const opt = {
        margin:       [0.4, 0.4, 0.4, 0.4],
        filename:     `Executive_Weekly_Report_${report.reportDate}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      window.html2pdf().set(opt).from(element).save().then(() => {
        setExportSuccessData({
          archivePath: `Downloads / Executive_Weekly_Report_${report.reportDate}.pdf`,
          docUrl: null
        });
      }).catch((err) => {
        console.warn('html2pdf issue, using window.print fallback:', err);
        window.print();
      });
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation */}
      <Header
        onGenerateReport={handleCompileReport}
        onExportDoc={handleExportDoc}
        onExportPdf={handleExportPdf}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isProcessing={isProcessing}
        hasReport={!!report}
        mode="upload"
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Drag & Drop Bulk File Upload Section */}
        <FileUploadSection
          uploadedProjects={uploadedProjects}
          onUploadFiles={handleUploadFiles}
          onRemoveProject={handleRemoveProject}
          onAddTextProject={handleAddTextProject}
          onCompileReport={handleCompileReport}
          isProcessing={isProcessing}
        />

        {/* Executive Consolidated Report */}
        {report && (
          <ExecutiveReportView
            report={report}
          />
        )}

      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />

      {/* Export Confirmation Modal */}
      <ExportSuccessModal
        isOpen={!!exportSuccessData}
        onClose={() => setExportSuccessData(null)}
        exportData={exportSuccessData}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>Executive Weekly Project Report Generator • Bulk Uploads & Automated Weekly Filing System</p>
      </footer>

    </div>
  );
}
