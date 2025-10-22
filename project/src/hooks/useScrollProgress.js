import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setProgress(Number((currentProgress / scrollHeight).toFixed(2)));
      }
    };

    window.addEventListener('scroll', updateScroll);
    
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return progress;
};