import { ScrollArea } from '@/components/ui/scroll-area';
import { type EventModel } from 'lms-types';

const UpcomingSchedule = ({ 
  events 
}: { 
  events: EventModel[]
}) => {
  // Helper function to check if date is today or tomorrow
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  // Filter and sort events
  const todayEvents = events
    .filter(event => isToday(new Date(event.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const tomorrowEvents = events
    .filter(event => isTomorrow(new Date(event.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className='md:w-1/2 bg-white rounded-lg shadow-md p-6'>
      <h3 className='font-bold mb-2'>Upcoming Schedule</h3>
      <ScrollArea className='h-72'>
        <div className='flex flex-col gap-2 text-center font-medium'>
          <h5 className='font-semibold'>Today</h5>
          {todayEvents.map((event) => (
            <UpSchedCard
              key={event.id}
              title={event.title}
              description={event.description || undefined}
              time={new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))}
          {todayEvents.length === 0 && (
            <p className="text-xs text-muted-foreground border-y border-y-abu-1 py-3">No events today</p>
          )}

          <h5 className='font-semibold'>Tomorrow</h5>
          {tomorrowEvents.map((event) => (
            <UpSchedCard
              key={event.id}
              title={event.title}
              description={event.description || undefined}
              time={new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
          ))}
          {tomorrowEvents.length === 0 && (
            <p className="text-xs text-muted-foreground border-y border-y-abu-1 py-3">No events tomorrow</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

const UpSchedCard = ({
  time,
  description,
  title,
}: {
  title?: string;
  description?: string;
  time?: string;
}) => {
  return (
    <div className='relative flex justify-between items-center border-y border-y-abu-1 px-4 py-3'>
      <div className='text-left'>
        <p className='text-xs'>{title}</p>
        <p className='text-2xs font-normal'>{description}</p>
      </div>
      <div className='font-normal text-2xs flex items-center'>{time}</div>
    </div>
  );
};

export default UpcomingSchedule;
