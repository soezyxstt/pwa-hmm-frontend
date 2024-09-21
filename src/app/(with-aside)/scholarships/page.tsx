import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bitcoin, ChevronRight, DollarSign, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Scholarships = () => {
  const pageId = 'scholarships';
  return (
    <ul className='w-full py-2 rounded-2xl shadow-md bg-white'>
      <Separator />
      {data.map(({ title, src, provider, deadline, id }, i) => (
        <>
          <Link
            href={`/scholarships/${id}`}
            key={`${title}-${i}-${pageId}`}
            className='flex gap-4 md:gap-8 hover:bg-gray-300 transition-all items-center py-1 md:pr-6 pr-4'
          >
            <Image
              src={src}
              alt={title}
              width={100}
              height={100}
              className='h-full max-h-24 md:max-h-28 max-w-32 w-64 md:max-w-40 object-cover'
            />
            <div className='flex w-full md:items-center flex-col md:flex-row py-4'>
              <div className='md:w-1/2 md:space-y-2'>
                <h3
                  className='md:text-lg text-base font-semibold line-clamp-1'
                  title={title}
                >
                  {title}
                </h3>
                <div>
                  <p className='text-xs text-gray-600'>{provider}</p>
                  <p className='text-xs text-red-600'>{`until - ${deadline.toDateString()}`}</p>
                </div>
              </div>
              <div className='flex md:w-1/2 items-center gap-1.5'>
                <div className='md:w-1/2'>
                  <Badge
                    variant={i % 2 === 0 ? 'success' : 'alert'}
                    className='h-min flex items-center w-fit text-3xs md:text-xs py-px px-1 md:py-0.5 md:px-2.5'
                  >
                    {i % 2 === 0 ? (
                      <Bitcoin className='md:w-4 w-2.5 h-min' />
                    ) : (
                      <DollarSign className='md:w-4 w-2.5 h-min' />
                    )}
                    {i % 2 === 0 ? 'Fully Funded' : 'Partially Funded'}
                  </Badge>
                </div>
                <div className='md:hidden w-px h-4 bg-border'></div>
                <div className='text-muted-foreground capitalize md:w-1/2 flex items-center gap-2 text-2xs md:text-sm'>
                  <Users className='md:w-4 w-2.5' />{' '}
                  {'Semester ' + Math.ceil(Math.random() * 8).toString()}
                </div>
              </div>
            </div>
            <ChevronRight className='w-4 h-4 md:w-6 md:h-6 hidden md:block' />
          </Link>
          <Separator key={`${title}-${id}`} />
        </>
      ))}
    </ul>
  );
};

const data = [
  {
    title: 'Beasiswa Tanoto Foundation',
    provider: 'Tanoto Foundation',
    deadline: new Date(),
    src: '/beasiswa.jpg',
    id: '1',
  },
  {
    title: 'Beasiswa LPDP',
    provider: 'LPDP',
    deadline: new Date(),
    src: '/beasiswa.jpg',
    id: '2',
  },
  {
    title: 'Djarum Beasiswa Plus',
    provider: 'PT Djarum',
    deadline: new Date(),
    src: '/beasiswa.jpg',
    id: '3',
  },
  {
    title: 'Beasiswa Bank Indonesia',
    provider: 'Bank Indonesia',
    deadline: new Date(),
    src: '/beasiswa.jpg',
    id: '4',
  },
  {
    title: 'Beasiswa BCA',
    provider: 'Bank Central Asia',
    deadline: new Date(),
    src: '/beasiswa.jpg',
    id: '5',
  },
];

export const metadata = {
  title: 'Scholarships',
};

export default Scholarships;
