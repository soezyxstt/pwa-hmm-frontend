import Button from '@/components/ui/button/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import Link from 'next/link';
import {getAssignments} from "@/actions/assignment-action";

export const beforeColors = [
  'before:bg-oren',
  'before:bg-navy',
  'before:bg-hijau',
  'before:bg-kuning',
];

export const colors = ['bg-oren', 'bg-navy', 'bg-hijau', 'bg-kuning'];

export const Assignments = async () => {
  const assignments = await getAssignments();
  const today = new Date();
  const todayAssignments = assignments.filter(({deadline}) => {
    const deadlineDate = new Date(deadline);
    return deadlineDate.getDate() === today.getDate() && deadlineDate.getMonth() === today.getMonth();
  })

  const tomorrowAssignments = assignments.filter(({deadline}) => {
    const deadlineDate = new Date(deadline);
    return deadlineDate.getDate() === today.getDate() + 1 && deadlineDate.getMonth() === today.getMonth();
  })

  const pageId = "assignments-at-dashboard"

  return (
    <div className='md:w-1/2 h-96 bg-white rounded-lg shadow-md py-6 flex flex-col'>
      <h3 className='font-bold px-6 mb-2'>Assignments</h3>
      <ScrollArea className='h-64'>
        <div className='flex flex-col text-center font-medium'>
          <h5 className='font-semibold my-2'>Today</h5>
          {todayAssignments.map((assignment, index) => (
            <AssignmentCard
              key={index + assignment.title + pageId}
              title={assignment.title}
              desc={assignment.class.title}
              time={new Date(assignment.deadline)}
              index={index}
            />
          ))
          }
          {todayAssignments.length === 0 && (
            <p className='text-xs text-muted-foreground border-y border-y-abu-1 py-3'>No Assignments</p>
          )}
          <h5 className='font-semibold my-2'>Tomorrow</h5>
          {tomorrowAssignments.map((assignment, index) => (
            <AssignmentCard
              key={index + assignment.title + pageId}
              title={assignment.title}
              desc={assignment.submission}
              time={new Date(assignment.deadline)}
              index={index}
            />
          ))
          }
          {tomorrowAssignments.length === 0 && (
            <p className='text-xs text-muted-foreground border-y border-y-abu-1 py-3'>No Assignments</p>
          )}
        </div>
      </ScrollArea>
      <Link
        href='/assignments'
        className='w-full pt-4 px-6'
      >
        <Button className=' text-xs py-1.5 w-full'>See All Assignments</Button>
      </Link>
    </div>
  );
};

const AssignmentCard = ({
                          title,
                          desc,
                          time,
                          index = 0,
                        }: {
  title: string;
  desc: string;
  time: Date;
  index: number;
}) => {
  const randomColor = beforeColors[index % 4];

  return (
    <div
      className={` before:absolute text-black relative ${randomColor} before:left-0 before:w-1.5 before:h-full before:top-0 flex justify-between items-center border-y-[1px] border-y-abu-1 px-10 py-3`}
    >
      <div className='flex text-xs gap-2 *:text-left items-center'>
        <p className='line-clamp-1' title={title}>{title}</p>
        <p className=''>-</p>
        <p className='font-normal line-clamp-1' title={desc}>{desc?.toUpperCase()}</p>
      </div>
      <div
        className='text-2xs font-semibold w-max min-w-16 text-right'>
        {`${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default Assignments;
