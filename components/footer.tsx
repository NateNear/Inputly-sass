import React from 'react';
import { Twitter, Github, Linkedin } from "lucide-react";
import './css/heroPage.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    <div className="flex flex-col items-start">
                        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-all">
                            Inputly
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                            Empowering businesses with actionable insights.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                        <h4 className="text-gray-900 font-semibold mb-2">Quick Links</h4>
                        <a href="/about" className="hover:text-gray-900 transition-all">About Us</a>
                        <a href="/features" className="hover:text-gray-900 transition-all">Features</a>
                        <a href="/pricing" className="hover:text-gray-900 transition-all">Pricing</a>
                        <a href="/contact" className="hover:text-gray-900 transition-all">Contact Us</a>
                    </div>

                    <div className="flex flex-col gap-4 text-sm">
                        <h4 className="text-gray-900 font-semibold mb-2">Follow Us</h4>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://twitter.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-all"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-gray-900 transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm text-gray-600 text-center">
                        &copy; {new Date().getFullYear()} Inputly. All rights reserved. | 
                        <a href="/privacy" className="hover:text-gray-900 ml-2">Privacy Policy</a> | 
                        <a href="/terms" className="hover:text-gray-900 ml-2">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
