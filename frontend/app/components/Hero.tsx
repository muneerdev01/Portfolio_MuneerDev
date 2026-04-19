'use client';

import Image from 'next/image';
import { ChevronDown, Github, Linkedin, Mail, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

export default function Hero() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-16">
            <div className="max-w-7xl mx-auto grid gap-12 items-center lg:grid-cols-[1.2fr_0.9fr]">
                <div className="space-y-8">
                    <div >

                    </div>

                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Hi, I'm</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                            <span className="block">Ghulam Muneer Uddin</span>
                            <span className="gradient-text block mt-2">Automation Expert & Healthcare Software Engineer</span>
                        </h1>
                        <p className="text-base text-slate-300">Reducing clinical overhead through intelligent automation and precise web data extraction.</p>
                    </div>



                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            Hire Me
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-8 py-3 text-sm font-semibold text-white transition hover:border-violet-500 hover:text-violet-200"
                        >
                            See Projects
                        </a>
                    </div>

                    {/* <div className="flex flex-wrap gap-4">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@muneerdev.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-500 hover:text-violet-200"
                        >
                            <Mail size={16} />
                            contact@muneerdev.com
                        </a>
                        <a
                            href="https://www.linkedin.com/in/muneer-dev-57871b3b4/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-500 hover:text-violet-200"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                    </div> */}

                    <div className="flex flex-wrap items-center gap-3 text-slate-300">
                        <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Connect</span>
                        {[
                            { href: 'https://github.com/muneerdev', icon: <Github size={18} /> },
                            { href: 'https://www.linkedin.com/in/muneer-dev-57871b3b4/', icon: <Linkedin size={18} /> },
                            // { href: 'https://www.facebook.com/people/Dev-Muneer/61585046272340/', icon: <Facebook size={18} /> },
                            { href: 'https://x.com/DevMuneerAi', icon: <Twitter size={18} /> },
                            // { href: 'https://www.instagram.com/muneerdev/', icon: <Instagram size={18} /> },
                            { href: 'https://wa.me/923151304012', icon: <MessageCircle size={18} /> },
                            { href: 'mailto:contact@muneer.dev01@gmail.com', icon: <Mail size={18} /> },
                        ].map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-200 transition hover:border-violet-500 hover:text-violet-200">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto max-w-md">
                    <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-sky-500/10 to-transparent blur-3xl" />
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_50px_120px_-40px_rgba(99,102,241,0.45)]">
                        <Image
                            src="/pic/portfolio_MuneerDev_pic.png"
                            alt="Profile photo of Ghulam Muneer Uddin"
                            width={800}
                            height={1000}
                            className="h-[620px] w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-14 flex justify-center">
                <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-200 transition hover:border-violet-500 hover:text-white"
                >
                    Learn more about my work
                    <ChevronDown size={18} />
                </button>
            </div>
        </section>
    );
}
