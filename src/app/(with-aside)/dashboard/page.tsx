import Assignments from '@/components/client/pages/dashboard/assignments';
import Calendar, {
  type EventMap,
} from '@/components/client/pages/dashboard/calendar-x';
import UpcomingSchedule from '@/components/client/pages/dashboard/upcomingSched';
import Berita from '@/components/client/pages/dashboard/berita';

export default async function Home() {
  const events: EventMap[] = [
    {
      '2024-07-28': [
        { title: 'Ngaso Bareng Dosen' },
        { title: 'Kinematika dan Dinamika Permesinan' },
        { title: 'Tugas Besar - MS2200 Termodinamika' },
      ],
    },
    { '2024-07-25': [{ title: 'Homework 4 - MS2101 Analisis Numerik' }, { title: 'Hearing Machining' }] },
    { '2024-07-31': [{ title: 'Pre-Machining' }, { title: 'FRS' }] },
  ];
  return (
    <div className='flex flex-col items-stretch flex-1 h-max gap-6 relative'>
      <div className='flex flex-col md:flex-row gap-6'>
        <UpcomingSchedule />
        <Assignments />
      </div>
      <div className='flex flex-col md:flex-row w-full gap-6 items-center'>
        <Calendar events={events} />
        <Berita />
      </div>
      <div className='relative bg-white w-full rounded-xl shadow-md py-2'>
        <div className='text-7xl font-bold text-abu-1 px-4'>#QOTD</div>
        <p className='top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 absolute italic text-center w-max max-w-[90vw] text-sm md:text-base'>
          {`"Success is not final, failure is not fatal: It is the courage to
          continue that counts."`}{' '}
          <br /> <span className='font-bold'>Winston Churchill</span>
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Dashborad',
};
