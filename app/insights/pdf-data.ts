export type PdfItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  fileUrl: string;
};

export const newsPdfs: PdfItem[] = [
  {
    id: 'gcc-expansion-q1-2026',
    title: 'GCC Expansion Roundup — Q1 2026',
    description: 'A quarterly summary of new GCC launches, capacity expansions, and footprint announcements across India.',
    date: 'Apr 2026',
    tag: 'Expansion',
    fileUrl: '/news/gcc-expansion-q1-2026.pdf',
  },
  {
    id: 'ai-talent-trends-2026',
    title: 'AI Talent Trends in India GCCs — 2026',
    description: 'How AI adoption is reshaping hiring demand, role mix, and skill priorities inside Global Capability Centres.',
    date: 'Mar 2026',
    tag: 'AI',
    fileUrl: '/news/ai-talent-trends-2026.pdf',
  },
  {
    id: 'leadership-appointments-feb-2026',
    title: 'Leadership Appointments — Feb 2026',
    description: 'Notable GCC leadership moves, new site heads, and executive transitions across the ecosystem.',
    date: 'Feb 2026',
    tag: 'Leadership',
    fileUrl: '/news/leadership-appointments-feb-2026.pdf',
  },
];

export const reportPdfs: PdfItem[] = [
  {
    id: 'gcc-benchmarking-report-2026',
    title: 'India GCC Benchmarking Report — 2026',
    description: 'Benchmarking study covering scale, maturity, function mix, and operating models across leading GCCs.',
    date: 'Jun 2026',
    tag: 'Benchmarking',
    fileUrl: '/reports/gcc-benchmarking-report-2026.pdf',
  },
  {
    id: 'talent-intelligence-report',
    title: 'GCC Talent Intelligence Report',
    description: 'Talent supply, demand, attrition, and compensation intelligence for India’s GCC corridors.',
    date: 'May 2026',
    tag: 'Talent',
    fileUrl: '/reports/talent-intelligence-report.pdf',
  },
  {
    id: 'compensation-study-2026',
    title: 'GCC Compensation Study — 2026',
    description: 'Role-level compensation benchmarks, variable pay trends, and benefits practices across GCCs.',
    date: 'Apr 2026',
    tag: 'Compensation',
    fileUrl: '/reports/compensation-study-2026.pdf',
  },
];
