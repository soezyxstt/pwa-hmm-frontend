import { Dialog, DialogContent } from '@/components/ui/dialog';
import Item from './item';
import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Main = ({
  className,
  searchParams,
  ...props
}: {
  searchParams: Record<string, string>;
} & HTMLAttributes<HTMLDivElement>) => {
  const id = searchParams['id'];
  const size = searchParams['size'];

  return (
    <div
      className={cn('flex-1 h-full flex flex-col gap-5 mt-5', className)}
      {...props}
    >
      <div className='grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 md:gap-x-8 lg:gap-x-10 md:gap-y-10 flex-1 grid-rows-2 mt-5'>
        {[...Array(12).fill(1)].map((_, i) => (
          <Item
            title='Goodie Bag'
            price={(60 + Math.round(Math.random() * 40)) * 1000}
            stars={3.5 + Math.round(Math.random() * 15) / 10}
            index={i + 1}
            itemId={i}
            key={i}
          />
        ))}
      </div>
      <Dialog open={Number(id) >= 0}>
        <DialogContent className='p-0 max-w-[90vw] w-[440px] rounded-xl'>
          <Link
            href='?'
            className='absolute top-2 right-4 z-50 text-2xl text-stone-800'
          >
            &times;
          </Link>
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
                  {['S', 'M', 'L', 'XL'].map((s, i) => (
                    <Link
                      href={`?id=${id}&size=${s}`}
                      key={i}
                      className={cn(
                        'rounded text-2xs px-2 py-1 hover:bg-yellow-200',
                        size === s && 'bg-yellow-400 hover:bg-yellow-400'
                      )}
                    >
                      {s}
                    </Link>
                  ))}
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
