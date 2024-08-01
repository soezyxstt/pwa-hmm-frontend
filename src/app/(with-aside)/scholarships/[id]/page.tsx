import Link from 'next/link';
import Poster from './poster';
import { Link as LinkIcon } from 'lucide-react';

export default function Scholarship() {
  return (
    <div className='bg-white rounded-xl p-2 md:p-6 md:py-8 flex gap-12 items-center'>
      <div className='hidden md:block'>
        <Poster
          src={data.src}
          alt={data.title}
          mode='desktop'
          className='w-full max-w-96'
        />
      </div>
      <div className='space-y-4 md:space-y-8 flex-1 md:py-2'>
        <div className='flex gap-6 items-center'>
          <Poster
            src={data.src}
            alt={data.title}
            mode='mobile'
          />
          <div className='space-y-3'>
            <h3 className='font-semibold md:text-2xl'>{data.title}</h3>
            <div>
              <p className='text-xs text-gray-600'>{data.provider}</p>
              <p className='text-xs text-red-600'>{`until - ${data.deadline.toDateString()}`}</p>
            </div>
            <Link
              href={data.link}
              className='text-xs flex items-center gap-2 hover:underline transition-all'
            >
              <LinkIcon className='w-3 h-3' /> <span>Link Pendaftaran</span>
            </Link>
          </div>
        </div>
        <div className='space-y-2'>
          <h3 className='text-base'>Description</h3>
          <p className='border border-navy rounded-xl p-4 text-black min-h-[50dvh] md:min-h-[30vh]'>
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const data = {
  title: 'Djarum Beasiswa Plus',
  provider: 'PT Djarum',
  deadline: new Date(),
  src: '/beasiswa.jpg',
  id: '1',
  link: '/',
  description:
    'Beasiswa ini diberikan oleh PT Djarum kepada mahasiswa yang berprestasi',
};
