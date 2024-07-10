import Assignments from '@/components/pages/dashboard/assignments';
import Calendar, { type EventMap } from '@/components/pages/dashboard/calendar-x';
import UpcomingSchedule from '@/components/pages/dashboard/upcomingSched';
import Image from 'next/image';
import Header from '@/components/header';

export default function Home() {
  const events: EventMap[] = [
    {
      '2024-03-08': [
        { title: 'Tubes' },
        { title: 'Tubes' },
        { title: 'Tubes' },
      ],
    },
    { '2024-03-09': [{ title: 'Tubes' }, { title: 'Tubes' }] },
  ];
  return (
      <div className='flex flex-col items-stretch flex-1 h-max gap-6 relative'>
        <Header title='Dashboard' />
        <div className='flex flex-col md:flex-row gap-6 md:mt-4'>
          <UpcomingSchedule />
          <Assignments />
        </div>
        <div className='flex flex-col md:flex-row w-full gap-6 items-center'>
          <Calendar events={events} />
          <div className='relative rounded-xl w-fit'>
            <Image
              src='/images/berita.png'
              alt='Berita'
              width={1000}
              height={1000}
              objectFit='contain'
              className='rounded-xl h-[50vh] w-[55vh] '
            />
          </div>
        </div>
        <div className='relative bg-white w-full rounded-xl shadow-md py-2 hidden md:block'>
          <div className='text-7xl font-bold text-abu-1 px-4'>#QOTD</div>
          <p className='top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 absolute italic text-center w-max'>
            {`"Success is not final, failure is not fatal: It is the courage to
          continue that counts."`}{' '}
            <br /> <span className='font-bold'>Winston Churchill</span>
          </p>
        </div>
      </div>
  );
}

export const metadata = {
  title: 'Dashborad | HMM ITB',
};
