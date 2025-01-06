"use client"
import React from "react";
import { Button } from "@/components/ui/button";

function HeroPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="container mx-auto flex flex-col items-center py-12 px-6">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-center">
            Seamlessly Collect Feedback on Any Website
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-center max-w-2xl">
            Integrate our lightweight feedback component to gather valuable insights from your users. Simple, elegant, and easy to use.
          </p>
          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => window.location.href = "/get-started"}
              className="px-6 py-3 text-lg font-medium bg-white text-indigo-600 rounded shadow hover:shadow-lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
              className="px-6 py-3 text-lg font-medium bg-indigo-600 border border-white hover:bg-indigo-700"
            >
              Play Snake Game
            </Button>
          </div>
        </div>
      </header>

      {/* Feedback Component Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800">
            How It Works
          </h2>
          <p className="mt-4 text-center text-gray-600 max-w-xl mx-auto">
            Our feedback widget is easy to integrate into any website. All feedback is securely stored and accessible anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <code className="bg-gray-100 p-4 rounded shadow-lg text-gray-800 text-sm">
              &lt;script src="https://yourdomain.com/feedback.js"&gt;&lt;/script&gt;{" "}
              <br />
              &lt;feedback-widget&gt;&lt;/feedback-widget&gt;
            </code>
          </div>
          <div className="flex justify-center mt-6">
            <Button className="px-8 py-3 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Snake Game Section */}
      <section id="snake-game" className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800">
            Take a Break, Play Snake!
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Enjoy a quick game while exploring our website.
          </p>
          <div className="flex justify-center mt-8">
            <iframe
              src="https://play.snake-google.com"
              title="Snake Game"
              className="w-full max-w-md h-96 border rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HeroPage;
