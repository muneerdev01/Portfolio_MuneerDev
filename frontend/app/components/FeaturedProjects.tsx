'use client';

import { Github, ExternalLink, Code2 } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
        id: 'rxsafe-ai',
        title: 'RxSafe AI (ohdrug.com)',
        description:
            'Advanced drug interaction checker leveraging the RxNav API. Real-time clinical significance scoring with MongoDB persistence.',
        technologies: ['FastAPI', 'Python', 'RxNav API', 'React', 'MongoDB'],
        features: [
            'Real-time drug interaction checking',
            'Clinical severity classification',
            'Search history with MongoDB',
            'RESTful API with async operations',
        ],
        github: '#',
        demo: '#',
        image: '/projects/rxsafe.png',
    },
    {
        id: 'healthtech-dashboard',
        title: 'HealthTech Dashboard',
        description:
            'Comprehensive clinic booking system built with Next.js and FastAPI. Manages appointments, patient records, and healthcare workflows.',
        technologies: ['Next.js 15', 'Tailwind CSS', 'FastAPI', 'MongoDB', 'AWS EC2'],
        features: [
            'Patient appointment booking',
            'Real-time availability management',
            'Secure patient dashboard',
            'Admin analytics and reporting',
        ],
        github: '#',
        demo: '#',
        image: '/projects/dashboard.png',
    },
    {
        id: 'pharma-scrapers',
        title: 'Custom Pharmaceutical Scrapers',
        description:
            'Collection of intelligent Python scrapers for pharmaceutical data extraction. Automated data pipelines for drug catalogs, pricing, and regulatory updates.',
        technologies: ['Python', 'BeautifulSoup', 'Selenium', 'MongoDB', 'Celery'],
        features: [
            'Multi-source drug data aggregation',
            'Regulatory compliance tracking',
            'Automated pricing updates',
            'Scheduled pipeline execution',
        ],
        github: '#',
        demo: '#',
        image: '/projects/scrapers.png',
    },
];

export default function FeaturedProjects() {
    return (
        <section id="projects" className="py-20 px-6 bg-slate-900">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-xl text-gray-400">
                        Production-ready solutions that merge pharmacy expertise with cutting-edge tech.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-12">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:auto-cols-reverse' : ''}`}
                        >
                            {/* Project Info */}
                            <div className="order-2 md:order-none">
                                <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {project.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-gray-300">
                                            <span className="text-primary mt-1">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-3">Technologies:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-blue-900/30 text-primary text-sm px-3 py-1 rounded-full border border-primary/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.github}
                                        className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                                    >
                                        <Github size={20} />
                                        <span>Code</span>
                                    </a>
                                    <a
                                        href={project.demo}
                                        className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors"
                                    >
                                        <ExternalLink size={20} />
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>

                            {/* Project Image Placeholder */}
                            <div className="order-1 md:order-none">
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700 p-8 flex items-center justify-center min-h-64">
                                    <Code2 size={64} className="text-primary/40" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More */}
                <div className="text-center mt-16">
                    <p className="text-gray-400 mb-4">Want to see more projects?</p>
                    <Link
                        href="https://github.com/muneerdev"
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        <Github size={20} />
                        Visit My GitHub
                    </Link>
                </div>
            </div>
        </section>
    );
}
