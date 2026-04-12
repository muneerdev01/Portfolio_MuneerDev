import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MuneerDev - Pharmacist & Automation Expert',
    description:
        'Professional portfolio of Ghulam Muneer Uddin. Full-stack developer specializing in healthcare automation, Python, and Next.js.',
    keywords: [
        'pharmacist',
        'developer',
        'automation',
        'healthcare',
        'python',
        'fastapi',
        'nextjs',
        'full-stack',
    ],
    authors: [{ name: 'Ghulam Muneer Uddin' }],
    viewport: 'width=device-width, initial-scale=1.0',
    robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#0f172a" />
            </head>
            <body className={`${inter.className} bg-slate-950 text-white`}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
