'use client';
import { useEffect } from 'react';
import '@/components/css/heroPage.css';

export function HeroWrapper({ children }) {
  useEffect(() => {
    document.body.classList.add('hero');
    return () => {
      document.body.classList.remove('hero');
    };
  }, []);

  return <>{children}</>;
}