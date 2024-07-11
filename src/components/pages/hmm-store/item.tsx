import { cn } from '@/lib/utils';
import Image from 'next/image';

const Item = ({
  title,
  price,
  stars,
  index,
  itemId,
  setItemId,
  setOpen,
}: {
  title: string;
  stars: number;
  price: number;
  index: number;
  itemId: number;
  setOpen: (open: boolean) => void;
  setItemId: (id: number) => void;
}) => {
  const new_price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const COLORS = ['bg-kuning', 'bg-hijau', 'bg-oren', 'bg-blue-500'];

  return (
    <div
      className='rounded-xl shadow-md flex flex-col justify-end overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out'
      onClick={() => {
        setItemId(index);
        setOpen(true);
      }}
    >
      <Image
        src={`/images/store.png`}
        alt='item'
        width={300}
        height={300}
        className='object-cover aspect-[16/10]'
      />
      <div className='bg-white py-4 px-7 relative overflow-hidden space-y-2'>
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-4',
            COLORS[Math.floor(Math.random() * 4)]
          )}
        ></div>
        <h5 className='font-semibold'>{title + index.toString()}</h5>
        <div className='flex'>
          <div className='w-1/2'>
            <p className='text-abu-3 text-3xs'>Price (IDR)</p>
            <h6>{new_price}</h6>
          </div>
          <div className='w-1/2'>
            <p className='text-abu-3 text-3xs'>Rating</p>
            <h6>
              <span className='text-kuning'>&#9733;</span>
              {stars}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
