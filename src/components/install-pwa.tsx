'use client';

import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { FiDownload } from 'react-icons/fi';

export function InstallPWA({className}:{className?:string}) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setIsInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', () => setIsInstalled(true));
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('clicked');
    if (isInstalled) return; // Do nothing if already installed
    if (!deferredPrompt) return; // Do nothing if installation prompt not available

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
  };

  return (
    <>
      {isMobile ? (
        <div onClick={handleInstallClick} className={cn('flex items-center gap-2 cursor-pointer ',className)}>
          <FiDownload />
          <span>{isInstalled ? 'Already Installed' : 'Install App'}</span>
        </div>
      ) : (
        <Tooltip>
        <TooltipTrigger className='bg-white p-2 rounded-full text-lg hidden md:block' onClick={handleInstallClick}>
          <FiDownload />
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>{isInstalled ? 'Already Installed' : 'Install App'}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
} 