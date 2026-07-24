const fs = require('fs');
const path = require('path');

// Minimal valid PDF generator (single page with text)
function createSimplePdf(title, subtitle) {
  // We'll build a minimal PDF by hand. This is a very basic single-page PDF.
  const content = `BT\n/F1 24 Tf\n70 700 Td\n(${title}) Tj\n/F1 14 Tf\n0 -30 Td\n(${subtitle}) Tj\nET`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

const newsDir = path.join(__dirname, '..', 'public', 'news');
const reportsDir = path.join(__dirname, '..', 'public', 'reports');

const newsItems = [
  { file: 'gcc-expansion-q1-2026.pdf', title: 'GCC Expansion Report Q1 2026', subtitle: 'Industry News - GCC Circle' },
  { file: 'ai-talent-trends-2026.pdf', title: 'AI Talent Trends 2026', subtitle: 'Industry News - GCC Circle' },
  { file: 'leadership-appointments-feb-2026.pdf', title: 'Leadership Appointments Feb 2026', subtitle: 'Industry News - GCC Circle' },
];

const reportItems = [
  { file: 'gcc-benchmarking-report-2026.pdf', title: 'GCC Benchmarking Report 2026', subtitle: 'Reports & Case Studies - GCC Circle' },
  { file: 'talent-intelligence-report.pdf', title: 'Talent Intelligence Report', subtitle: 'Reports & Case Studies - GCC Circle' },
  { file: 'compensation-study-2026.pdf', title: 'Compensation Study 2026', subtitle: 'Reports & Case Studies - GCC Circle' },
];

newsItems.forEach((item) => {
  const pdf = createSimplePdf(item.title, item.subtitle);
  fs.writeFileSync(path.join(newsDir, item.file), pdf);
});

reportItems.forEach((item) => {
  const pdf = createSimplePdf(item.title, item.subtitle);
  fs.writeFileSync(path.join(reportsDir, item.file), pdf);
});

console.log('Dummy PDFs created successfully');
