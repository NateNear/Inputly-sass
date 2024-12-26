/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CopyButton } from '@/components/copyButton';

const CodeDisplayPage = async({ params }: { params: { projectId: string } }) => {
  const { projectId } = await params 
  const code = `
    <script src="${process.env.WIDGET_URL}widget.umd.js"> </script>
    <feedback-widget title="" project="${projectId}"> </feedback-widget>
  `;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl lg:mx-[150px] mx-auto space-y-8">
        <div className="space-y-4">
          <Label className="text-4xl font-bold text-gray-900">Start Collecting Feedback</Label>
          <p className="text-lg text-gray-600">
            Embed the code in your site.
          </p>
        </div>

        <Card className="bg-gray-900 shadow-xl">
          <CardContent className="p-6 relative">
            <pre className="text-gray-100 font-mono text-sm leading-relaxed overflow-x-auto">
              {code}
            </pre>
            <CopyButton text={code} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeDisplayPage;