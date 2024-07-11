'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CourseDrawer({
  materials,
  query,
}: {
  materials: string[];
  query: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger>
        <div className='flex gap-2 items-center'>
          <Menu className='' />
          <h4 className=''>All Materials</h4>
        </div>
      </DrawerTrigger>
      <DrawerContent className='bg-navy border-kuning'>
        <DrawerHeader>
          <h3 className='text-white text-center'>Course Materials</h3>
        </DrawerHeader>
        <div className='flex flex-col gap-3 pb-6 px-4'>
          {materials.map((material, index) => (
            <Link
              key={index}
              href={`?q=${material}`}
              className='text-kuning px-2 py-2 hover:bg-slate-300/30 rounded-md transition-colors border border-kuning'
              onClick={() => setIsOpen(false)}
            >
              {material}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
