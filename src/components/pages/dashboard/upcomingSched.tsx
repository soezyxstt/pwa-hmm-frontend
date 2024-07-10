import Button from '@/components/button/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const UpcomingSchedule = () => {
  return (
    <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
      <h3 className='font-bold mb-2'>Upcoming Schedule</h3>
      <ScrollArea className=' h-64'>
        <div className='flex flex-col gap-2 text-center font-medium'>
          <h5 className='font-semibold'>Today</h5>
          <UpSchedCard
            title='Kinematics & Dynamics of Machinery'
            place='Class 4101'
            time='08.00 - 09.00'
          />
          <UpSchedCard
            title='Thermodynamics'
            place='Class 4104'
            time='08.00 - 10.00'
          />
          <UpSchedCard
            title='Fluid Mechanics'
            place='Class 9127'
            time='13.00 - 15.00'
          />
          <h5 className='font-semibold'>Tomorrow</h5>
          <UpSchedCard
            title='Structure & Properties of Materials'
            place='Class 4104'
            time='07.00 - 09.00'
          />
          <UpSchedCard
            title='Engineering Drawing'
            place='Class 4101'
            time='08.00 - 09.00'
          />
          <UpSchedCard
            title='Numerical Analysis'
            place='Class 9104'
            time='15.00 - 17.00'
          />
        </div>
      </ScrollArea>
      <Button className='mt-4 text-xs w-full py-1.5'>See All Activities</Button>
    </div>
  );
};

const UpSchedCard = ({
  time,
  place,
  title,
}: {
  title?: string;
  place?: string;
  time?: string;
}) => {
  return (
    <div className='rounded-2xl bg-background py-1.5 px-4 flex justify-between text-black items-stretch'>
      <div className='text-left'>
        <p className='text-xs'>{title}</p>
        <p className='text-2xs font-normal'>{place}</p>
      </div>
      <div className='font-normal text-2xs flex items-center'>{time}</div>
    </div>
  );
};

export default UpcomingSchedule;