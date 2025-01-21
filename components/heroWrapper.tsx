'use client';
import { useEffect } from 'react';
import '@/components/css/heroPage.css';

export function HeroWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('hero');
    return () => {
      document.body.classList.remove('hero');
    };
  }, []);

  return <>{children}</>;
}