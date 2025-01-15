import React from 'react';
import { Copy, Github, Info, Code2, Globe, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import demoGif from '@/public/demo.gif';
import Image from 'next/image';
import '../../components/css/demoPage.css';
import { TryDemoButton } from '@/components/tryDemoButton';
import { CopyButton } from '@/components/copyButton';
import DemoPageGithubButton from '@/components/demoPageGithubButton';

export default function DemoPage() {
    const widgetCode = `
    <script src="https://inputly-widget.vercel.app/widget.umd.js"> </script>
    <feedback-widget title="" projectId="Your projectId"> </feedback-widget>
    `;

    const steps = [
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Copy the Code",
            description: "Copy the widget code snippet provided below."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Add to Your Website",
            description: "Paste the code into your website's HTML where you want the feedback widget to appear."
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Start Collecting",
            description: "That's it! Your feedback widget is now live and ready to collect user feedback."
        }
    ];

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[128px] opacity-60 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[128px] opacity-60 animate-pulse" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="flex justify-center mb-8">
                    <a
                        href="/docs"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                        <Info className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm text-gray-600">View Full Documentation</span>
                    </a>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                        Add User Feedback
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            To Your Website
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Integrate our customizable feedback widget into your project in minutes. Collect valuable user feedback and insights with a simple code snippet.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                    {step.icon}
                                </div>
                                <h3 className="font-semibold text-lg">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Card className="bg-gray-900 shadow-2xl overflow-hidden mb-16">
                    <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="ml-4 text-gray-400 text-sm">Widget Installation Code</span>
                        </div>
                    </div>
                    <CardContent className="p-6 relative">
                        <pre className="text-gray-100 font-mono text-sm leading-relaxed overflow-x-auto">
                            {widgetCode}
                        </pre>
                        <CopyButton text={widgetCode} />
                    </CardContent>
                </Card>

                <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold mb-6">See it in Action</h2>
                    <div className="w-full h-full bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                        <Image 
                            src={demoGif}
                            alt="Feedback Widget Demo"
                            className="rounded-lg"
                            unoptimized
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <TryDemoButton/>
                        {/* <DemoPageGithubButton/> */}
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Code2 className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-blue-900">Need help with installation?</h3>
                            <p className="mt-1 text-blue-700">
                                Check out our detailed documentation for step-by-step instructions and troubleshooting tips.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}