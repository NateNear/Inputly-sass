import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, ChevronRight, Github, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import demoGif from '@/public/demo.gif';
import Image from 'next/image';
import '../../components/css/demoPage.css'
import { TryDemoButton } from '@/components/tryDemoButton';

export default function DemoPage() {
    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[128px] opacity-60 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[128px] opacity-60 animate-pulse" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="flex justify-center mb-8">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                        <Info className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm text-gray-600">Documentation & Examples</span>
                    </a>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                        Getting Started
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Installation Guide
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Follow these simple steps to integrate our components into your project. Copy the code, customize the styles, and you're ready to go.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    <Card className="p-6 bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">1. Install Dependencies</h3>
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                            <code className="text-sm text-gray-300">
                                npm install @/components/ui
                            </code>
                        </div>
                        <p className="text-gray-600">Install the required dependencies using npm or your preferred package manager.</p>
                    </Card>

                    <Card className="p-6 bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">2. Import Component</h3>
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                            <code className="text-sm text-gray-300">
                                import &#123; Component &#125; from &quot;@/components/ui/component&quot;;
                            </code>
                        </div>
                        <p className="text-gray-600">Import the component into your React application.</p>
                    </Card>
                </div>

                <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold mb-6">Watch Demo</h2>
                    <div className="w-full h-full bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                        <Image 
                            src= {demoGif}
                            alt="Component Demo"
                            className="rounded-lg"
                            unoptimized
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <TryDemoButton/>
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            View Source
                        </Button>
                    </div>
                </div>
{/* 
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Documentation',
                            description: 'Read the full documentation',
                            icon: Book,
                            link: '#'
                        },
                        {
                            title: 'Examples',
                            description: 'View example implementations',
                            icon: Code,
                            link: '#'
                        },
                        {
                            title: 'Support',
                            description: 'Get help from our team',
                            icon: LifeBuoy,
                            link: '#'
                        }
                    ].map((resource, index) => (
                        <Card 
                            key={index}
                            className="p-6 bg-white/80 backdrop-blur border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <resource.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                                    <p className="text-sm text-gray-600">{resource.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div> */}
            </div>
        </div>
    );
}