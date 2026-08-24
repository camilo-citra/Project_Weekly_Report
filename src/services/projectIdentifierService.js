// Smart Project Code & Metadata Extractor for Project Meeting Minutes

export function extractProjectMetadata(fileContent, fileName) {
  let projectCode = '';
  let projectTitle = '';
  let meetingDate = new Date().toISOString().split('T')[0];

  // 1. Extract Project Code from filename (e.g., prj035, prj041, prj045, prj133, PRJ-001)
  const codeInFileName = fileName.match(/(prj\s*[-_]?\s*\d+[a-z]*)/i) || fileName.match(/(prj[0-9a-z_-]+)/i);
  if (codeInFileName) {
    projectCode = codeInFileName[1].toUpperCase().replace(/\s+/g, '');
  }

  // 2. Extract Project Code from content metadata if present (Project ID: PRJ035)
  const codeInContent = fileContent.match(/Project\s*ID\s*:\s*([^\n\r]+)/i);
  if (codeInContent && codeInContent[1]) {
    const rawCode = codeInContent[1].trim();
    if (rawCode.length > 2 && rawCode.length < 25) {
      projectCode = rawCode.toUpperCase();
    }
  }

  // 3. Extract Descriptive Project Title
  const cleanTitleFromFileName = fileName
    .replace(/\.(txt|md|doc|docx|json|html)$/i, '')
    .replace(/\s*\(\d+\)\s*/g, '')
    .replace(/(meeting|minutes|sync|notes|weekly|master|report)/gi, '')
    .replace(/[-_]/g, ' ')
    .trim();

  // Extract H1 header title from content if available
  const h1Match = fileContent.match(/^#\s*\*\*?\s*([^\n\r*]+)/m) || fileContent.match(/Title\s*:\s*([^\n\r]+)/i);
  if (h1Match && h1Match[1]) {
    projectTitle = h1Match[1].trim();
  } else {
    projectTitle = cleanTitleFromFileName;
  }

  // Combine Project Code + Title cleanly
  let finalProjectName = '';
  if (projectCode) {
    // Clean title so it doesn't repeat code
    let displayTitle = projectTitle.replace(new RegExp(projectCode, 'gi'), '').replace(/^[-_\s]+/, '').trim();
    if (!displayTitle) displayTitle = cleanTitleFromFileName.replace(new RegExp(projectCode, 'gi'), '').trim();
    finalProjectName = `${projectCode}${displayTitle ? ' - ' + displayTitle : ''}`;
  } else {
    finalProjectName = projectTitle || `Project ${fileName}`;
  }

  // Extract Date patterns
  const datePattern = /(?:20\d{2}[-/.]\d{1,2}[-/.]\d{1,2})|(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?,?\s+20\d{2})/i;
  const dateMatch = fileContent.match(datePattern);
  if (dateMatch) {
    meetingDate = dateMatch[0];
  }

  return {
    projectCode: projectCode || 'PRJ',
    projectName: finalProjectName,
    meetingDate
  };
}

export function getWeeklyArchiveFolderName(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  const year = d.getFullYear();
  const firstJan = new Date(year, 0, 1);
  const dayOfYear = Math.floor((d - firstJan) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((dayOfYear + 1) / 7);
  const paddedWeek = String(weekNum).padStart(2, '0');
  const formattedDate = d.toISOString().split('T')[0];
  return `${year}-W${paddedWeek}_${formattedDate}`;
}
