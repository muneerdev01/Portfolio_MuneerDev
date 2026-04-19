'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub',    url: 'https://github.com/muneerdev',                      icon: Github },
        { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/muneer-dev-57871b3b4/', icon: Linkedin },
        { name: 'X',         url: 'https://x.com/DevMuneerAi',                         icon: Twitter },
        { name: 'Vercel',    url: 'https://vercel.com/muneerdev01-5476s-projects',      icon: ExternalLink },
    ];

    return (
        <footer className="bg-slate-950 border-t border-gray-700 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Footer Content */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-2">MuneerDev</h3>
                        <p className="text-gray-400">
                            Pharmacist & Automation Expert. Building healthcare tech that works.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#home" className="hover:text-primary transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-primary transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="hover:text-primary transition-colors">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-primary transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <a
                            href="mailto:muneer.dev01@gmail.com"
                            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-2"
                        >
                            <Mail size={18} />
                            muneer.dev01@gmail.com
                        </a>
                        <p className="text-sm text-gray-500">{process.env.NEXT_PUBLIC_AVAILABILITY}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 py-8">
                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mb-6">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
                                    title={link.name}
                                >
                                    <Icon size={24} />
                                </a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Ghulam Muneer Uddin. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-xs mt-2">
                            Built with Next.js 15, Tailwind CSS, and FastAPI
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
