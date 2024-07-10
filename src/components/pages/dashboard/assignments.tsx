import Button from '@/components/button/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const beforeColors = [
  'before:bg-oren',
  'before:bg-navy',
  'before:bg-hijau',
  'before:bg-kuning',
];

export const colors = [
  'bg-oren',
  'bg-navy',
  'bg-hijau',
  'bg-kuning',
]

export const Assignments = () => {
  return (
    <div className='md:w-1/2 h-96 bg-white rounded-lg shadow-md py-6 flex flex-col'>
      <h3 className='font-bold px-6 mb-2'>Assignments</h3>
      <ScrollArea className='h-64'>
        <div className='flex flex-col text-center font-medium'>
          <h5 className='font-semibold my-2'>Today</h5>
          <AssignmentCard
            title='Tugas Besar'
            desc='MS2111 K01 KINDIN'
            time='23.59'
            index={0}
          />
          <AssignmentCard
            title='Tugas Besar'
            desc='MS2111 K01 KINDIN'
            time='23.59'
            index={1}
          />
          <h5 className='font-semibold my-2'>Tomorrow</h5>
          <AssignmentCard
            title='Tugas Besar'
            desc='MS2111 K01 KINDIN'
            time='23.59'
            index={0}
          />
          <AssignmentCard
            title='Tugas Besar'
            desc='MS2111 K01 KINDIN'
            time='23.59'
            index={1}
          />
          <AssignmentCard
            title='Tugas Besar'
            desc='MS2111 K01 KINDIN'
            time='23.59'
            index={2}
          />
        </div>
      </ScrollArea>
      <Button className='mt-4 text-xs py-1.5 mx-6'>See All Assignments</Button>
    </div>
  );
};

const AssignmentCard = ({
  title,
  desc,
  time,
  index = 0,
}: {
  title?: string;
  desc?: string;
  time?: string;
  index?: number;
}) => {
  const randomColor = beforeColors[index % 4];

  return (
    <div
      className={` before:absolute text-black relative ${randomColor} before:left-0 before:w-1.5 before:h-full before:top-0 flex justify-between items-center border-y-[1px] border-y-abu-1 px-10 py-3`}
    >
      <div className='flex text-xs gap-1'>
        <p className=''>{title}</p>
        <p className=''>-</p>
        <p className='font-normal'>{desc?.toUpperCase()}</p>
      </div>
      <div className='text-2xs font-semibold'>{time}</div>
    </div>
  );
};

export default Assignments;
