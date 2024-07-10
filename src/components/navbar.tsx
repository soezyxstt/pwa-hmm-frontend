"use client";

import { extractFirstSegment } from '@/lib/utils';
import { Aside } from '@/components/aside';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const pathName = usePathname();
  const firstPath = extractFirstSegment(pathName as string);

  return (
    <Aside
      loc={
        firstPath.includes('hmm') ? firstPath.replace('hmm', 'HMM') : firstPath
      }
    />
  );
}
