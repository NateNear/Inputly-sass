import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CopyButton } from '@/components/copyButton';
import { Code2, Globe, Rocket } from 'lucide-react';

type PageProps = Promise<{
    projectId: string;
  }>;

async function CodeDisplayPage  ({ params }: { params: PageProps }) {
  const { projectId } = await params;
  const code = `
    <script src="${process.env.WIDGET_URL}widget.umd.js"> </script>
    <feedback-widget title="" project="${projectId}"> </feedback-widget>
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Start Collecting Feedback
          </h1>
          <p className="text-xl text-gray-600">
            Follow these simple steps to integrate the feedback widget into your website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <Card className="bg-gray-900 shadow-2xl overflow-hidden">
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
              {code}
            </pre>
            <CopyButton text={code} />
          </CardContent>
        </Card>

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
};

export default CodeDisplayPage;