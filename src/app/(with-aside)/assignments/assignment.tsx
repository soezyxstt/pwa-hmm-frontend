'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Notebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Button from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useInterval } from '@/hooks/useInterval';

const AssingmentPage = () => {
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

  const timeLeft = (date: Date) => {
    const now = new Date().getTime();
    const deadline = date.getTime();
    const diff = deadline - now;

    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const [timeToDeadline, setTimeToDeadline] = useState(
    timeLeft(new Date('2024-07-27T00:00:00'))
  );

  useInterval(() => {
    setTimeToDeadline(timeLeft(new Date('2024-07-27T00:00:00')));
  }, 1000);

  return (
    <>
      <div className='flex justify-end md:my-6 mb-6'>
        <motion.div layoutId={'add' + id}>
          <Button
            className='text-sm font-semibold px-4 py-2.5'
            onClick={() => setActive('add')}
          >
            <motion.p layoutId={'add-button' + id}>Add Assignment</motion.p>
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {active === 'add' && (
          <div className='fixed inset-0 grid place-items-center z-50 pointer-events-none'>
            <motion.div
              layoutId={'add' + id}
              className='w-full max-w-[min(32rem,90vw)] bg-white rounded-lg shadow-lg p-4 overflow-hidden flex flex-col pointer-events-auto'
            >
              <div className='flex items-center gap-4 justify-between'>
                <div className='flex items-center gap-4'>
                  <Notebook size={32} />
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
                  <CloseIcon />
                </button>
              </div>
              <Separator className='my-2' />
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
                      <SelectValue placeholder='Select Course' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Course</SelectLabel>
                        <SelectItem value='analisis-numerik'>
                          MS2110 Analisis Numerik
                        </SelectItem>
                        <SelectItem value='kinematika-dan-dinamika'>
                          MS2111 Kinematika dan Dinamika
                        </SelectItem>
                        <SelectItem value='mekanika-dan-kekuatan-material'>
                          MS2111 Mekanika dan Kekuatan Material
                        </SelectItem>
                        <SelectItem value='termodinamika'>
                          MS2211 Termodinamika
                        </SelectItem>
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
                    <Input type='time' />
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
                      <SelectValue placeholder='Select Submission' />
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (typeof active === 'object' || active === 'add') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 h-full w-full z-10'
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <div className='fixed inset-0 grid place-items-center z-50 pointer-events-none'>
            <motion.div
              layoutId={`card-${
                active.name + active.class + active.course
              }-${id}`}
              className='w-full max-w-[min(32rem,90vw)] bg-white rounded-lg shadow-lg p-4 overflow-hidden flex flex-col pointer-events-auto'
            >
              <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4 text-navy'>
                    <motion.div
                      layoutId={`notebook-${
                        active.name + active.class + active.course
                      }-${id}`}
                    >
                      <Notebook size={32} />
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
                  <div className=''>{`${timeToDeadline.days}d ${timeToDeadline.hours}h ${timeToDeadline.minutes}m ${timeToDeadline.seconds}s`}</div>
                </div>
                <Separator className='' />
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
                    <td className='text-sm text-muted-foreground'>Class</td>
                    <td className='text-sm'>:</td>
                    <motion.p
                      layoutId={`class-${
                        active.name + active.class + active.course
                      }-${id}`}
                      className='text-sm'
                    >
                      {active.class}
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
                      {active.deadline}
                    </motion.p>
                  </tr>
                  <tr className=''>
                    <td className='text-sm text-muted-foreground pr-4'>Submission</td>
                    <td className='text-sm pr-2'>:</td>
                    <motion.p
                      layoutId={`submission-${
                        active.name + active.class + active.course
                      }-${id}`}
                      className='text-sm'
                    >
                      {active.submission}
                    </motion.p>
                  </tr>
                  <tr className=''>
                    <td className='text-sm text-muted-foreground'>Done?</td>
                    <td className='text-sm'>:</td>
                    <td className='flex gap-6'>
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          id='done'
                          className='data-[state=checked]:bg-green-600'
                        />
                        <label
                          htmlFor='done'
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-600'
                        >
                          Yes
                        </label>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          id='not'
                          className='data-[state=checked]:bg-red-600'
                        />
                        <label
                          htmlFor='not'
                          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-600'
                        >
                          No
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr className=''>
                    <td className='text-sm text-muted-foreground'>Status</td>
                    <td className='text-sm'>:</td>
                    <td className='text-sm text-red-500'>Over Due Date</td>
                  </tr>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className='w-full p-2 rounded-2xl shadow-md bg-white'>
        <Separator />
        {data.map((card, i) => (
          <>
            <motion.div
              layoutId={`card-${card.name + card.class + card.course}-${id}`}
              key={`${card.name + card.class}-${id}`}
              onClick={() => setActive(card)}
              className='py-3 px-4 flex w-full cursor-pointer justify-between items-center gap-4 hover:bg-gray-500/20 transition-[background-color] rounded-lg'
            >
              <div className='flex gap-4 items-center'>
                <motion.div
                  layoutId={`notebook-${
                    card.name + card.class + card.course
                  }-${id}`}
                  className='text-navy'
                >
                  <Notebook size={40} />
                </motion.div>
                <div className=''>
                  <motion.h2
                    layoutId={`name-${
                      card.name + card.class + card.course
                    }-${id}`}
                    className='font-medium text-lg'
                  >
                    {card.name}
                  </motion.h2>
                  <p className='flex gap-2 items-center'>
                    <motion.span
                      layoutId={`class-${
                        card.name + card.class + card.course
                      }-${id}`}
                      className='text-sm text-muted-foreground'
                    >{`${card.class}`}</motion.span>
                    -
                    <motion.span
                      layoutId={`course-${
                        card.name + card.class + card.course
                      }-${id}`}
                      className='text-sm text-muted-foreground'
                    >
                      {card.course}
                    </motion.span>
                  </p>
                  <div
                    className={`text-sm flex gap-2 ${
                      card.status ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    <motion.p
                      layoutId={`deadline-${
                        card.name + card.class + card.course
                      }-${id}`}
                    >
                      {card.deadline}
                    </motion.p>
                    <motion.p
                      layoutId={`submission-${
                        card.name + card.class + card.course
                      }-${id}`}
                    >{`(${card.submission})`}</motion.p>
                  </div>
                </div>
              </div>
              <ChevronRight />
            </motion.div>
            <Separator />
          </>
        ))}
      </ul>
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
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </motion.svg>
  );
};

const data = [
  {
    status: true,
    course: 'MS2110 Analisis Numerik',
    class: 'K01',
    name: 'Tugas Besar',
    deadline: '2022-01-01',
    submission: 'Edunex',
  },
  {
    status: false,
    course: 'MS2111 Kinematika dan Dinamika',
    class: 'K01',
    name: 'Tugas Besar',
    deadline: '2022-01-01',
    submission: 'Edunex',
  },
  {
    status: true,
    course: 'MS2111 Mekanika dan Kekuatan Material',
    class: 'K02',
    name: 'Homework 4',
    deadline: '2022-01-01',
    submission: 'MS Teams',
  },
  {
    status: false,
    course: 'MS2111 Kinematika dan Dinamika',
    class: 'K01',
    name: 'Homework',
    deadline: '2022-01-01',
    submission: 'Edunex',
  },
  {
    status: true,
    course: 'MS2211 Termodinamika',
    class: 'K01',
    name: 'Laporan Praktikum',
    deadline: '2022-01-01',
    submission: 'MS Teams',
  },
];

export default AssingmentPage;
