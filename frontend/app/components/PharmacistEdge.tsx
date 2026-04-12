'use client';

import { Shield, Zap, Brain, CheckCircle } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Clinical Accuracy',
        description:
            'Every line of code is verified against pharmaceutical standards. I ensure regulatory compliance and patient safety in every project.',
    },
    {
        icon: Zap,
        title: 'Rapid Automation',
        description:
            'Custom scrapers and automation workflows that save hours of manual work. Python expertise meets real-world healthcare problems.',
    },
    {
        icon: Brain,
        title: 'Healthcare Insight',
        description:
            'Deep understanding of pharmacy operations, drug interactions, and clinical workflows. Technical solutions grounded in domain knowledge.',
    },
    {
        icon: CheckCircle,
        title: 'Production Ready',
        description:
            'Full-stack solutions deployed to production. From concept to AWS—scalable, secure, and battle-tested.',
    },
];

export default function PharmacistEdge() {
    return (
        <section id="about" className="py-20 px-6 bg-secondary">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">The Pharmacist Edge</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        I'm not just a developer building healthcare software. I'm a pharmacist who codes.
                        That difference matters.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-slate-800/50 border border-gray-700 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group"
                            >
                                <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Divider with Stats */}
                <div className="my-16 border-t border-gray-700 pt-16">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">19+</p>
                            <p className="text-gray-400">Years in Pharmacy</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">20+</p>
                            <p className="text-gray-400">Healthcare Projects and Data Analytics</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary mb-2">94%</p>
                            <p className="text-gray-400">Clinical Accuracy Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
