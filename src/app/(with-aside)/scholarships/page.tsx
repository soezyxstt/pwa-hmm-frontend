import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bitcoin, ChevronRight, DollarSign, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type ScholarshipModel } from 'lms-types';
import { getScholarships } from '@/_actions/scholarship-action';

// This dummy data will be used by both pages
export const dummyData: ScholarshipModel[] = [
  {
    id: 1,
    title: 'Beasiswa Tanoto Foundation',
    provider: 'Tanoto Foundation',
    deadline: new Date('2024-12-31'),
    reference: 'https://www.tanotofoundation.org/en/education/scholarship/',
    funding: 'FULLY_FUNDED',
    scope: 'Undergraduate',
    description: 'Beasiswa untuk mahasiswa berprestasi dari Tanoto Foundation',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Beasiswa LPDP',
    provider: 'LPDP',
    deadline: new Date('2024-11-30'),
    reference: 'https://www.lpdp.kemenkeu.go.id/',
    funding: 'FULLY_FUNDED',
    scope: 'Graduate',
    description: 'Program beasiswa dari Kementerian Keuangan RI',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'Djarum Beasiswa Plus',
    provider: 'PT Djarum',
    deadline: new Date('2024-10-15'),
    reference: 'https://djarumbeasiswaplus.org/',
    funding: 'PARTIALLY_FUNDED',
    scope: 'Undergraduate',
    description: 'Program beasiswa dari Djarum Foundation',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'Beasiswa Bank Indonesia',
    provider: 'Bank Indonesia',
    deadline: new Date('2024-09-30'),
    reference: 'https://www.bi.go.id/',
    funding: 'PARTIALLY_FUNDED',
    scope: 'Undergraduate',
    description: 'Program beasiswa dari Bank Indonesia',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: 'Beasiswa BCA',
    provider: 'Bank Central Asia',
    deadline: new Date('2024-08-31'),
    reference: 'https://www.bca.co.id/',
    funding: 'FULLY_FUNDED',
    scope: 'Undergraduate',
    description: 'Program beasiswa dari BCA untuk mahasiswa berprestasi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

const Scholarships = async () => {
  const data = await getScholarships();
  const pageId = 'scholarships';

  return (
    <ul className='w-full py-2 rounded-2xl shadow-md bg-white'>
      <Separator />
      {data.map(({ title, provider, deadline, id, funding, scope }, i) => (
        <>
          <Link
            href={`/scholarships/${id}`}
            key={`${title}-${i}-${pageId}`}
            className='flex gap-4 md:gap-8 hover:bg-gray-300 transition-all items-center py-1 md:pr-6 pr-4'
          >
            <Image
              src='/beasiswa.jpg' // Default scholarship image
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
                  <p className='text-xs text-red-600'>{`until - ${new Date(deadline).toDateString()}`}</p>
                </div>
              </div>
              <div className='flex md:w-1/2 items-center gap-1.5'>
                <div className='md:w-1/2'>
                  <Badge
                    variant={funding === 'FULLY_FUNDED' ? 'success' : 'alert'}
                    className='h-min flex items-center w-fit text-3xs md:text-xs py-px px-1 md:py-0.5 md:px-2.5'
                  >
                    {funding === 'FULLY_FUNDED' ? (
                      <Bitcoin className='w-4 md:block hidden' />
                    ) : (
                      <DollarSign className='w-4 md:block hidden' />
                    )}
                    {funding === 'FULLY_FUNDED' ? 'Fully Funded' : 'Partially Funded'}
                  </Badge>
                </div>
                <div className='md:hidden w-px h-4 bg-border'></div>
                <div className='text-muted-foreground capitalize md:w-1/2 flex items-center gap-2 text-2xs md:text-sm line-clamp-2'>
                  {scope}
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

export const metadata = {
  title: 'Scholarships',
};

export default Scholarships;
