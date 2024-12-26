/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CopyButton } from '@/components/copyButton';

const CodeDisplayPage = async({ params }: { params: { projectId: string } }) => {
  const { projectId } = await params 

  return (
   <div>
    PAGE {projectId}
   </div>
  );
};

export default CodeDisplayPage;