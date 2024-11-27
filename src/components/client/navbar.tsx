'use client';

import { Drawer, Sidebar } from '@/components/client/aside';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePathname } from 'next/navigation';
export default function Navbar({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const firstPath = pathName.split('/')[1];
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <nav className={`${isMobile} `}>
      <Drawer loc={firstPath}>{children}</Drawer>
      <Sidebar loc={firstPath} />
    </nav>
  );
}
