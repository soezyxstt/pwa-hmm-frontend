import { cn } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import Image from 'next/image';
import { FileSpreadsheet, SquarePlay } from 'lucide-react';
type CoursesItemProps = {
  id: string;
  title: string;
  image: string;
  subject: string;
  numberOfMaterials: number;
  numberOfVideos: number;
  className?: string;
} & LinkProps;

export default function CoursesItem({
  id,
  title,
  image,
  subject,
  numberOfMaterials,
  numberOfVideos,
  className,
  href='',
}: CoursesItemProps) {
  const COLORS = ['bg-kuning', 'bg-hijau', 'bg-oren', 'bg-blue-500'];

  return (
    <Link
      href={`/courses/${id}`}
      className={cn(
        'rounded-xl shadow-md flex flex-col justify-end overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform ease-in-out',
        className
      )}
    >
      <Image
        src={image}
        alt='item'
        width={300}
        height={200}
        className='object-cover aspect-[16/10]'
      />
      <div className='bg-white py-2 px-7 relative overflow-hidden space-y-2'>
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-4',
            COLORS[Math.floor(Math.random() * 4)]
          )}
        ></div>
        <h6 className='text-abu-3'>{subject}</h6>
        <h4 className='text-sm md:text-base'>{title}</h4>
        <div className="flex justify-end gap-2 items-center text-sm">
          <FileSpreadsheet size={10} />
          <span>{numberOfMaterials}</span>
          <SquarePlay size={10} />
          <span>{numberOfVideos}</span>
        </div>
      </div>
    </Link>
  );
}
