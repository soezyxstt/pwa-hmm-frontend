'use client';
import React, {useEffect, useId, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronRight, LayoutList, Notebook} from 'lucide-react';
import {Separator} from '@/components/ui/separator';
import Button from '@/components/ui/button/button';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {useInterval} from '@/hooks/useInterval';
import MotionFramer from '@/components/client/modal-framer';
import type {
  $UserAPI,
} from 'lms-types';
import MotionOverlay from '@/components/client/modal-overlay';
import {Badge} from "@/components/ui/badge";

const Assignment = ({
                      assignments,
                      courses,
                    }: {
  assignments: $UserAPI.GetUserAssignments.Response['data'];
  courses: $UserAPI.GetUserEnrolledAsStudentCourses.Response['data'];
}) => {
  const data = assignments.map(({assignment, type}) => ({
    status: true,
    course: type === "personal" ? "Personal" : assignment.class.title,
    class: 'K01',
    name: assignment.title,
    deadline: new Date(assignment.deadline),
    submission: assignment.submission,
  }));

  const [active, setActive] = useState<
    (typeof data)[number] | 'add' | boolean | null
  >(null);

  const id = useId();
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null);
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [active]);

  useInterval(() => {
    setTimeToDeadline(
      timeLeft(
        new Date(
          active && typeof active === 'object'
            ? active.deadline
            : '2024-07-27T00:00:00'
        )
      )
    );
  }, 1000);

  const timeLeft = (date: Date) => {
    const now = new Date().getTime();
    const deadline = date.getTime();
    const diff = deadline - now;

    if (diff < 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return {days, hours, minutes, seconds};
  };

  const [timeToDeadline, setTimeToDeadline] = useState(
    timeLeft(new Date('2024-07-27T00:00:00'))
  );

  const badges = [{
    variant: 'warning',
    children: 'Over Due Date',
  },
    {
      variant: 'success',
      children: 'Done',
    },
    {
      variant: 'alert',
      children: 'On Progress',
    },
    {
      variant: "default",
      children: "Not Started"
    }] as {variant: "default" | "warning" | "alert" | "success", children: string}[];

  return (
    <>
      <div className='flex justify-end'>
        <motion.div layoutId={'add' + id}>
          <Button
            className='text-sm font-semibold px-4 py-2 md:py-2.5'
            onClick={() => setActive('add')}
          >
            <motion.p layoutId={'add-button' + id}>Add Assignment</motion.p>
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {active === 'add' && (
          <MotionFramer id={'add' + id}>
            <div className='flex items-center gap-4 justify-between'>
              <div className='flex items-center gap-4'>
                <Notebook size={32}/>
                <motion.p
                  layoutId={'add-button' + id}
                  className='font-medium text-lg'
                >
                  Add Assignment
                </motion.p>
              </div>
              <button
                className='text-sm font-semibold px-4 py-2.5'
                onClick={() => setActive(null)}
              >
                <CloseIcon/>
              </button>
            </div>
            <Separator className='my-2'/>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='name'
                  className='text-sm font-semibold'
                >
                  Name
                </label>
                <Input
                  type='text'
                  id='name'
                  className='Input'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='class'
                  className='text-sm font-semibold'
                >
                  Class
                </label>
                <Input
                  type='text'
                  id='class'
                  className='Input'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='course'
                  className='text-sm font-semibold'
                >
                  Course
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Course'/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course</SelectLabel>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id + course.title}
                          value={course.title.toLowerCase()}
                        >
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='deadline'
                  className='text-sm font-semibold'
                >
                  Deadline
                </label>
                <div className='flex gap-2'>
                  <Input
                    type='date'
                    id='deadline'
                    className='Input'
                  />
                  <Input type='time'/>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='submission'
                  className='text-sm font-semibold'
                >
                  Submission
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Submission'/>
                  </SelectTrigger>
                  <SelectContent className='pointer-events-auto'>
                    <SelectGroup>
                      <SelectLabel>Submission</SelectLabel>
                      <SelectItem value='ms-teams'>MS Teams</SelectItem>
                      <SelectItem value='edunex'>Edunex</SelectItem>
                      <SelectItem value='on-site'>On Site</SelectItem>
                      <SelectItem value='g-drive'>G-Drive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className='text-sm font-semibold px-4 py-2.5'
                onClick={() => setActive(null)}
              >
                Add
              </Button>
            </div>
          </MotionFramer>
        )}
      </AnimatePresence>
      <MotionOverlay
        setActive={setActive}
        setTo={null}
        show={!!(active && (typeof active === 'object' || active === 'add'))}
      />
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <MotionFramer
            // @ts-ignore
            id={`card-${active.name + active.class + active.course}-${id}`}
          >
            <div className='flex flex-col gap-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 text-navy'>
                  <motion.div
                    layoutId={`notebook-${
                      active.name + active.class + active.course
                    }-${id}`}
                  >
                    <Notebook size={32}/>
                  </motion.div>
                  <motion.div
                    layoutId={`name-${
                      active.name + active.class + active.course
                    }-${id}`}
                    className='font-medium text-lg'
                  >
                    {active.name}
                  </motion.div>
                </div>
                <div
                  className=''>{`${timeToDeadline.days}d ${timeToDeadline.hours}h ${timeToDeadline.minutes}m ${timeToDeadline.seconds}s`}</div>
              </div>
              <Separator className=''/>
              <table className='space-y-4 *:*:py-2'>
                <tr className='gap-2'>
                  <td className='text-sm text-muted-foreground'>Course</td>
                  <td className='text-sm'>:</td>
                  <motion.p
                    layoutId={`course-${
                      active.name + active.class + active.course
                    }-${id}`}
                    className='text-sm'
                  >
                    {active.course}
                  </motion.p>
                </tr>
                <tr className=''>
                  <td className='text-sm text-muted-foreground'>Deadline</td>
                  <td className='text-sm'>:</td>
                  <motion.p
                    layoutId={`deadline-${
                      active.name + active.class + active.course
                    }-${id}`}
                    className='text-sm'
                  >
                    {active.deadline.toDateString()}
                  </motion.p>
                </tr>
                <tr className=''>
                  <td className='text-sm text-muted-foreground pr-4'>
                    Submission
                  </td>
                  <td className='text-sm pr-2'>:</td>
                  <motion.p
                    layoutId={`submission-${
                      active.name + active.class + active.course
                    }-${id}`}
                    className='text-sm'
                  >
                    MS-Teams
                  </motion.p>
                </tr>
                <tr className=''>
                  <td className='text-sm text-muted-foreground'>Type</td>
                  <td className='text-sm'>:</td>
                  <motion.p
                    layoutId={`class-${
                      active.name + active.class + active.course
                    }-${id}`}
                    className='text-sm'
                  >
                    Personal Task
                  </motion.p>
                </tr>
                <tr className=''>
                  <td className='text-sm text-muted-foreground'>Tracker</td>
                  <td className='text-sm'>:</td>
                  <td className='flex gap-6'>
                    <Select>
                      <SelectTrigger className='py-0 w-fit h-min'>
                        <SelectValue placeholder='Select Tracker'/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="over-due">Over Due Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
                <tr className=''>
                  <td className='text-sm text-muted-foreground'>Description</td>
                  <td className='text-sm'>:</td>
                  <td className='text-sm text-justify'>You are tasked with organizing a community wellness fair aimed at promoting health and wellness among local residents. This includes coordinating with health professionals, securing vendors for healthy food options, and arranging interactive workshops on topics such as nutrition, mental health, and fitness. Additionally, you will create promotional materials to advertise the event across social media and local bulletin boards, while also establishing partnerships with local businesses to sponsor activities. The fair is set to take place in four weeks, so time management and effective communication will be key to ensuring a successful and engaging experience for all attendees.</td>
                </tr>
              </table>
            </div>
          </MotionFramer>
        )}
      </AnimatePresence>
      {assignments.length === 0 && (
        <p className='font-medium text-muted-foreground w-full text-center'>No Assignments</p>
      )}
      {assignments.length > 0 && (
        <ul className='w-full py-2 overflow-hidden rounded-2xl shadow-md bg-white'>
          <Separator/>
          {data.map((card, i) => (
            <>
              <motion.div
                layoutId={`card-${card.name + card.class + card.course}-${id}`}
                key={`${card.name + card.class}-${id + i}`}
                onClick={() => setActive(card)}
                className='py-3 px-6 md:px-8 flex w-full relative cursor-pointer justify-between items-center gap-4 hover:bg-gray-500/20 transition-[background-color] rounded-lg'
              >
                <div className={`absolute w-2 h-full left-0 top-0 ${['bg-destructive', 'bg-hijau', 'bg-kuning', 'bg-navy'][i%4]}`}></div>
                <div className='flex gap-4 md:gap-6 items-center w-full'>
                  <motion.div
                    layoutId={`notebook-${
                      card.name + card.class + card.course
                    }-${id}`}
                    className='text-navy'
                  >
                    <LayoutList className='w-7 h-7 md:w-10 md:h-10'/>
                  </motion.div>
                  <div className=" flex flex-col md:flex-row items-center flex-1">
                    <div className='md:w-1/2 overflow-hidden '>
                      <motion.h2
                        layoutId={`name-${
                          card.name + card.class + card.course
                        }-${id}`}
                        title={card.name}
                        className='font-medium md:text-lg text-sm line-clamp-1'
                      >
                        {card.name}
                      </motion.h2>
                      <p className='flex gap-2 items-center'>
                        <motion.span
                          layoutId={`class-${
                            card.name + card.class + card.course
                          }-${id}`}
                          className='text-xs md:text-sm text-muted-foreground'
                        >{`${card.class}`}</motion.span>
                        -
                        <motion.span
                          layoutId={`course-${
                            card.name + card.class + card.course
                          }-${id}`}
                          className='text-xs md:text-sm text-muted-foreground line-clamp-1'
                        >
                          {card.course}
                        </motion.span>
                      </p>
                      <div
                        className={`text-xs md:text-sm flex items-center gap-2 text-red-500
                      `}
                      >
                        <motion.p
                          layoutId={`deadline-${
                            card.name + card.class + card.course
                          }-${id}`}
                        >
                          {card.deadline.toDateString()}
                        </motion.p>
                        <div className="w-px h-4 bg-red-500"></div>
                        <motion.p
                          layoutId={`submission-${
                            card.name + card.class + card.course
                          }-${id}`}
                          className='line-clamp-1'
                        >{`${card.deadline.getHours()}:${card.deadline.getMinutes()} @MS-Teams`}</motion.p>
                      </div>
                    </div>
                    <div className="flex w-full md:w-1/2 gap-2 items-center mt-2 md:mt-0">
                      <div className="md:w-1/2">
                        <Badge variant={badges[i%4].variant} className='h-fit'>{badges[i % 4].children}</Badge>
                      </div>
                      <div className="md:hidden w-px h-4 bg-border"></div>
                      <div className='text-muted-foreground capitalize md:w-1/2 text-sm md:text-base'>personal task
                      </div>
                    </div>
                  </div>
                  <ChevronRight className='w-4 h-4 md:w-6 md:h-6'/>
                </div>
              </motion.div>
              <Separator/>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-4 w-4 text-black'
    >
      <path
        stroke='none'
        d='M0 0h24v24H0z'
        fill='none'
      />
      <path d='M18 6l-12 12'/>
      <path d='M6 6l12 12'/>
    </motion.svg>
  );
};

export default Assignment;
