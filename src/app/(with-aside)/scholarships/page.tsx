import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

const Scholarships = () => {
  const pageId = "scholarships";
  return (
    <ul className='w-full py-2 rounded-2xl shadow-md bg-white'>
      <Separator />
      {data.map(({ title, src, provider, deadline, id }, i) => (
        <>
          <Link
            href={`/scholarships/${id}`}
            key={`${title}-${i}-${pageId}`}
            className='flex gap-6 md:gap-8 hover:bg-gray-300 transition-all items-center'
          >
            <Image
              src={src}
              alt={title}
              width={100}
              height={100}
              className='h-full max-h-24 md:max-h-32 max-w-32 w-64 md:max-w-40 object-cover'
            />
            <div className='py-4 md:space-y-2'>
              <h3 className='md:text-lg text-base font-semibold line-clamp-1' title={title}>
                {title}
              </h3>
              <div>
                <p className='text-xs text-gray-600'>{provider}</p>
                <p className='text-xs text-red-600'>{`until - ${deadline.toDateString()}`}</p>
              </div>
            </div>
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
