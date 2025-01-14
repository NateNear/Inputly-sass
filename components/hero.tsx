import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import './css/heroPage.css';
import { GotToDashboardButton } from './goToDashboardButton';

export default function Hero() {
    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-blob-1 bg-purple-500/20 dark:bg-purple-500/40 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] gradient-blob-2 bg-blue-500/20 dark:bg-blue-500/40 rounded-full blur-[128px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">

                <div className="flex flex-wrap justify-center items-center gap-3 mb-8 scale-up-animation">
                    <a
                        href="https://github.com/NateNear/Inputly-sass"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-105 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 transition-colors"
                    >
                        <Star className="w-4 h-4 text-yellow-500 float-animation" />
                        <span className="text-sm">Star on GitHub</span>
                    </a>
                    <span className="px-4 py-1.5 text-sm bg-gray-100 dark:bg-white/5 rounded-full border border-gray-300 dark:border-white/10 hover:scale-105 transition-all duration-300">
                        <Sparkles className="w-4 h-4 inline mr-2 text-purple-400 float-animation" />
                        Soon: AI-Powered Insights
                    </span>
                </div>

                <div className="max-w-4xl mx-auto text-center mb-12 scale-up-animation">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white to-gray-700 dark:to-white/80">
                        Transform Customer
                        <br />
                        Feedback Into Action
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Collect, analyze, and leverage customer feedback to build products your users truly love. 
                        Soon to be powered by advanced AI for deeper insights.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 ">
                    <GotToDashboardButton />
                    <Button 
                        size="lg"
                        variant="outline"
                        className="border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-8 rounded-full h-12 transition-all duration-300 hover:scale-105"
                    >
                        Watch the Demo
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto scale-up-delay-3">
                    {[
                        {
                            title: 'AI-Powered Analysis',
                            description: 'Automatically categorize and analyze feedback'
                        },
                        {
                            title: 'Real-time Dashboard',
                            description: 'Track feedback trends and insights live'
                        },
                        {
                            title: 'Seamless Integration',
                            description: 'Easily integrate with your existing tools and services.'
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10  transition-all duration-300 hover:scale-105 hover:shadow-md float-animation`}
                             style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
