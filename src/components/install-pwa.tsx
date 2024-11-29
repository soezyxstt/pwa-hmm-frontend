'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show install button
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <>
      <Tooltip>
        <TooltipTrigger className='bg-white p-2 rounded-full text-lg hidden md:block'>
          <Download onClick={handleInstallClick} />
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>Install App</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuItem onClick={handleInstallClick}>
        <Download />
        <span>Install App</span>
      </DropdownMenuItem>
    </>
  )

} 