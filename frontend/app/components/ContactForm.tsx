'use client';

import { useState } from 'react';
import { Mail, Loader } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-6 bg-secondary">
            <div className="max-w-2xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
                    <p className="text-xl text-gray-400">
                        Have a healthcare tech project in mind? I'd love to hear about it.
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/50 border border-gray-700 rounded-xl p-8 space-y-6"
                >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={2}
                            className="w-full bg-slate-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-slate-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            minLength={5}
                            maxLength={200}
                            className="w-full bg-slate-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                            placeholder="What's this about?"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            minLength={10}
                            maxLength={5000}
                            rows={5}
                            className="w-full bg-slate-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="bg-green-900/30 border border-green-600/50 text-green-300 rounded-lg p-4">
                            ✓ Message sent! I'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-900/30 border border-red-600/50 text-red-300 rounded-lg p-4">
                            ✗ Error: {errorMessage}. Please try again.
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-blue-600 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {isSubmitting && <Loader size={20} className="animate-spin" />}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                {/* Alternative Contact */}
                <div className="mt-12 text-center border-t border-gray-700 pt-8">
                    <p className="text-gray-400 mb-4">Or reach out directly:</p>
                    <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-blue-400 transition-colors text-lg"
                    >
                        <Mail size={24} />
                        {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                    </a>
                </div>
            </div>
        </section>
    );
}
