'use client';

import useMeasure from "react-use-measure";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import MotionFramer from "@/components/client/modal-framer";
import MotionOverlay from "@/components/client/modal-overlay";
import Link from "next/link";
import {Ellipsis} from "lucide-react";

function WhatsNext({events}: { events: { title: string, date: Date }[] }) {
  const [ref, {height}] = useMeasure();
  const [active, setActive] = useState<{ title: string, date: string } | null>(null)
  return (
    <div className="bg-white rounded-xl p-6 space-y-4 md:space-y-6">
      <h3 className="md:text-xl text-sm font-bold">{"What's next in HMM ITB"}</h3>
      <div className="flex gap-3 md:gap-4">
        <button
          className='py-1 px-2 h-fit bg-navy text-white hover:bg-kuning hover:text-navy transition rounded-full text-2xs font-medium'>Recommended
        </button>
        <button
          className='py-1 px-2 h-fit bg-navy text-white hover:bg-kuning hover:text-navy transition rounded-full text-2xs font-medium'>Manage
        </button>
      </div>
      <div className="relative w-1 rounded-full bg-navy ml-2 md:ml-4"
           style={{height: (events.length - 1) * (height + 12), marginTop: height, marginBottom: height / 2}}>
        {events.map(({title, date}, index) => (
          <div className="absolute w-3 h-3 rounded-full bg-kuning left-1/2 transform -translate-x-1/2 -translate-y-1/2"
               style={{top: index * (height + 12)}}
               key={'myhmm-page-event' + index}>
            <div className="-translate-y-1/2 cursor-pointer absolute">
              <motion.div layoutId={`popup-myhmm-proker-${title}-${date.toDateString()}`}
                          ref={index == 0 ? ref : undefined}
                          className='pl-6 md:pl-8 w-max '
                          onClick={() => setActive({title, date: date.toDateString()})}>
                <motion.p layoutId={'title-myhmm-proker-' + title}
                          className='text-xs md:text-sm capitalize line-clamp-1'>{title}</motion.p>
                <motion.p layoutId={'date-myhmm-proker-' + date.toDateString()}
                          className='text-2xs md:text-xs text-muted-foreground'>{date.toDateString()}</motion.p>
                <Ellipsis className='text-navy'/>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <MotionFramer id={`popup-myhmm-proker-${active.title}-${active.date}`} className='border border-navy'>
            <motion.h3 layoutId={'title-myhmm-proker-' + active.title}>{active.title}</motion.h3>
            <motion.p layoutId={'date-myhmm-proker-' + active.date}
                      className='text-muted-foreground text-xs'>{active.date} - <span
              className='text-muted-foreground text-xs'>Social Service</span>
            </motion.p>
            <p className='my-3 md:py-4 text-xs md:text-sm text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Maecenas aliquet pellentesque tellus, vitae varius
              sem consequat id. Sed velit lorem, pharetra non fringilla eu, convallis id enim. In bibendum dolor quam,
              sed
              consectetur nisi aliquet suscipit. Pellentesque velit dolor, vehicula id cursus et, tincidunt nec leo.
              Nunc id
              augue semper, elementum purus id, vulputate nibh. Donec interdum sed nibh eu vehicula. Maecenas porta
              interdum
              sem, a tempus nulla egestas eget. Cras sollicitudin posuere leo eu ullamcorper. Praesent molestie risus ut
              venenatis suscipit. Fusce non condimentum eros, eu suscipit massa. Phasellus scelerisque ex ut justo porta
              efficitur. Sed sed venenatis lectus. Etiam mattis neque ligula, et suscipit elit accumsan nec.</p>
            <Link href='#' className='rounded-full bg-navy hover:bg-kuning transition w-fit text-white hover:text-navy h-fit md:px-4 px-2.5 py-1.5 text-xs md:text-sm'>RSVP</Link>
          </MotionFramer>
        )}
      </AnimatePresence>
      <MotionOverlay setActive={setActive} setTo={null} show={active !== null}/>
    </div>
  );
}

export default WhatsNext;