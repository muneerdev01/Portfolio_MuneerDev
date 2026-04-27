import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muneer Dev — Pharma × Tech Portfolio',
  description:
    'Senior developer bridging 19 years of pharmaceutical expertise with modern automation engineering. Specializing in medical dashboards, data analytics, and AI-powered health platforms.',
  keywords: ['developer', 'portfolio', 'medical dashboard', 'CKD', 'pharmaceutical', 'Next.js', 'React'],
  authors: [{ name: 'Muneer' }],
  openGraph: {
    title: 'Muneer Dev — Pharma × Tech Portfolio',
    description: 'Precision engineering for healthcare innovation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-text-primary antialiased">{children}</body>
    </html>
  );
}
