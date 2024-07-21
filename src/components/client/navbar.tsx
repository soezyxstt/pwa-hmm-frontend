'use client';

import { Drawer, Sidebar } from '@/components/client/aside';
import { usePathname } from 'next/navigation';
export default function Navbar({children}: {children: React.ReactNode}) {
  const pathName = usePathname();
  const firstPath = pathName.split('/')[1];

  return (
    <>
      <Drawer loc={firstPath}>
        {children}
      </Drawer>
      <Sidebar loc={firstPath} />
    </>
  );
}
