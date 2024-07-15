"use client";
import { Sidebar, Drawer} from '@/components/admin/aside';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const rawPath = usePathname();
  const path = rawPath ? rawPath.split('/')[3].toLowerCase() : '';
  return (
    <>
      <Sidebar loc={path} />
      <Drawer loc={path} />
    </>
  );
}