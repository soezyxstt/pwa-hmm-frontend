"use client";

import {Notebook, Plus} from "lucide-react";
import Button from "@/components/ui/button/button";
import React, {useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import MotionOverlay from "@/components/client/modal-overlay";
import MotionFramer from "@/components/client/modal-framer";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {CloseIcon} from "@/app/(with-aside)/assignments/assignment";
import type {CourseModel} from "lms-types";

function Add({courses}: { courses: CourseModel[] }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <>
      <motion.div layoutId={"add-assignment" + id}>
        <Button className='rounded-lg w-fit px-3 flex gap-2 items-center' onClick={() => setOpen(true)}>
          <Plus/> Add
        </Button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <MotionFramer id={'add-assignment' + id}>
            <div className='flex items-center gap-4 justify-between'>
              <div className='flex items-center gap-4'>
                <Notebook size={32}/>
                <p
                  className='font-medium text-lg'
                >
                  Add Assignment
                </p>
              </div>
              <button
                className='text-sm font-semibold px-4 py-2.5'
                onClick={() => setOpen(false)}
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
                      {courses.map(({title, id: courseId}) => (
                        <SelectItem
                          key={courseId + id + title}
                          value={title.toLowerCase()}
                        >
                          {title}
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
                onClick={() => setOpen(false)}
              >
                Add
              </Button>
            </div>
          </MotionFramer>
        )}
      </AnimatePresence>
      <MotionOverlay
        setActive={setOpen}
        setTo={false}
        show={open}
      />
    </>
  );
}

export default Add;