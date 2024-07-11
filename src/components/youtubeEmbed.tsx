import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function YoutubeEmbed({
  embedId,
  title,
  className,
  ...props
}: { embedId: string; title: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('aspect-video rounded-xl', className)}
      {...props}
    >
      <iframe
        width='1000'
        height='1000'
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='w-full h-full rounded-xl'
      ></iframe>
    </div>
  );
}
