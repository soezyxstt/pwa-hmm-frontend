'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import Pagination from '@/components/pagination';
import Item from './item';
import { useState, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Main = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [page, setPage] = useState(1);
  const [itemId, setItemId] = useState(0);
  const [open, setOpen] = useState(false);
  const isMd = useMediaQuery('(min-width: 768px)');

  return (
    <div
      className={cn('flex-1 h-full flex flex-col gap-5', className)}
      {...props}
    >
      <div className='grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 flex-1 grid-rows-2'>
        {[...Array(isMd ? 8 : 6).fill(1)].map((_, i) => (
          <Item
            title='Goodie Bag'
            price={(60 + Math.round(Math.random() * 40)) * 1000}
            stars={3.5 + Math.round(Math.random() * 15) / 10}
            index={i + 1}
            itemId={itemId}
            setItemId={setItemId}
            setOpen={setOpen}
            key={i}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPage={6}
        setPage={setPage}
        className=''
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className='p-0 max-w-[90vw] w-[440px] rounded-xl'>
          <Image
            src={`/images/store.png`}
            alt='item'
            width={1000}
            height={1000}
            className='w-full max-h-96 rounded-t-xl object-cover'
          />
          <div className='flex p-4'>
            <div className='w-1/2'>
              <h5 className='font-bold'>Kaos HMM Yellboys</h5>
              <h6 className='font-semibold'>T-shirt</h6>
              <div className='flex mt-6'>
                <div className='w-1/2'>
                  <p className='text-abu-3 text-3xs'>Price (IDR)</p>
                  <h6>100.000</h6>
                </div>
                <div className='w-1/2'>
                  <p className='text-abu-3 text-3xs'>Rating</p>
                  <h6>
                    <span className='text-kuning'>&#9733;</span>
                    3.5
                  </h6>
                </div>
              </div>
            </div>
            <div className='w-1/2 h-full flex flex-col justify-between'>
              <div className=''>
                <p className='text-abu-3 text-3xs'>Size</p>
                <div className='flex gap-4 mt-2'>
                  <button className='rounded text-2xs px-2 py-1 '>S</button>
                  <button className='rounded text-2xs px-2 py-1 bg-yellow-400'>
                    M
                  </button>
                  <button className='rounded text-2xs px-2 py-1 '>L</button>
                  <button className='rounded text-2xs px-2 py-1 '>XL</button>
                </div>
              </div>
              <button className='px-4 py-1 text-xs font-semibold bg-navy text-white rounded-full'>
                Buy
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Main;
