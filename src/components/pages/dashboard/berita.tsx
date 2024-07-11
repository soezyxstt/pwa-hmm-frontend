'use client';

import { type HTMLAttributes, type RefObject, useRef, useState } from 'react';
import Image from 'next/image';
import { useInterval } from '@/hooks/useInterval';
import { cn } from '@/lib/utils';

export default function Berita() {
  const images = ['berita.png', 'logo.png', 'store.png'];
  const ref = useRef(<div />) as unknown as RefObject<HTMLDivElement>;
  const [desc, setDesc] = useState('');
  const [index, setIndex] = useState(0);

  function handleNext() {
    if (ref.current) {
      if (
        ref.current.scrollLeft + ref.current.clientWidth <
        ref.current.scrollWidth - 10
      ) {
        ref.current.scrollTo({
          left: ref.current.scrollLeft + ref.current.clientWidth,
          behavior: 'smooth',
        });
        let i = Math.floor(ref.current.scrollLeft / ref.current.clientWidth) + 1;
        setDesc(`This is image ${i + 1}`);
        setIndex(i);
      } else {
        ref.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
        setDesc(`This is image 1`);
        setIndex(0);
      }
    }
  }

  function handleClick({ index, desc }: { index: number; desc: string }) {
    if (ref.current) {
      ref.current.scrollTo({
        left: index * ref.current.clientWidth,
        behavior: 'smooth',
      });
      setDesc(desc);
      setIndex(index);
    }
  }

  useInterval(() => {
    if (ref.current) {
      handleNext();
    }
  }, 4000);

  return (
    <div className='w-full md:w-auto md:h-[50vh] aspect-[16/14] relative overflow-hidden rounded-xl'>
      <div
        ref={ref}
        className='overflow-hidden flex w-full h-full aspect-[16/14] snap-center scroll-smooth'
      >
        {images.map((image, i) => (
          <div
            key={i}
            className='relative rounded-xl w-fit snap-x snap-mandatory'
          >
            <Image
              src={`/images/${image}`}
              alt='Berita'
              width={1000}
              height={1000}
              className='rounded-xl max-h-[50vh] md:h-[50vh] md:max-w-[calc(16/14*50vh)] max-w-[calc(100vw-2rem)] aspect-[16/14] object-cover'
            />
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4 justify-end absolute px-6 w-full h-full bg-gradient-to-t from-black/40 via-black/35 to-black/5 top-0 left-0 py-4 md:py-6 md:px-8'>
        <div className='text-white md:text-md font-semibold'>
          {desc}
        </div>
        <div className='flex gap-4 items-center justify-center'>
          {images.map((_, i) => (
            <Dot
              key={i}
              active={i === index}
              onClick={() =>
                handleClick({
                  index: i,
                  desc: `This is image ${i + 1}`,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Dot({
  active,
  ...props
}: { active: boolean } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'md:w-2 w-1.5 h-1.5 md:h-2 rounded-full bg-[#aaa] focus:outline-none transition-all hover:bg-white',
        active && 'bg-abu-1 md:h-2.5 h-2 w-2 md:w-2.5'
      )}
      {...props}
    />
  );
}
