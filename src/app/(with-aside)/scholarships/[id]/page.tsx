import Link from 'next/link';
import Poster from './poster';
import { Bitcoin, DollarSign, Link as LinkIcon, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Scholarship({ params }: { params: { id: string } }) {
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
              <div className='flex items-center gap-1.5 mt-1'>
                <div className='text-muted-foreground capitalize md:w-1/2 flex items-center gap-2 text-2xs md:text-sm'>
                  <Users className='md:w-4 w-2.5' />{' '}
                  {'Semester ' + Math.ceil(Math.random() * 8).toString()}
                </div>
                <div className='w-px h-4 bg-border'></div>
                <Badge
                  variant={Number(params.id) % 2 === 0 ? 'success' : 'alert'}
                  className='h-min flex items-center w-max text-3xs text-nowrap md:text-xs py-px px-1 md:py-0.5 md:px-2.5'
                >
                  {Number(params.id) % 2 === 0 ? (
                    <Bitcoin className='md:w-4 w-2.5 h-min' />
                  ) : (
                    <DollarSign className='md:w-4 w-2.5 h-min' />
                  )}
                  {Number(params.id) % 2 === 0
                    ? 'Fully Funded'
                    : 'Partially Funded'}
                </Badge>
              </div>
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
