import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { MessageCircle } from 'lucide-react';
import { whatsappNumber } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Sticky glassmorphism navbar */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <Projects />
      <Contact />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-float text-white"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </main>
  );
}
