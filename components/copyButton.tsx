"use client"
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    };
  
    return (
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-md transition-colors hover:bg-gray-700 text-gray-400 hover:text-gray-200"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    );
  };