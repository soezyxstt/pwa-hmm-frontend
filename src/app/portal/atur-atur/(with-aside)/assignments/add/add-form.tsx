'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addAssignmentSchema, submissionsEnum } from '@/lib/schema';
import { $CourseAPI, $CourseClassAPI } from 'lms-types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { createAssignment } from '@/_actions/assignment-action';
import { toast } from 'sonner';
import ErrorText from '@/app/portal/atur-atur/error-text';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

function AddForm({
  courses,
  classes,
}: {
  courses: $CourseAPI.GetCourses.Response['data'];
  classes: ($CourseClassAPI.GetClasses.Response['data'][number] & {
    courseId: number;
  })[];
}) {
  const { execute, result, isExecuting } = useAction(createAssignment, {
    onSuccess: () => {
      toast.success('Assignment created successfully');
    },
    onError: (err) => {
      toast.error(
        err.error.validationErrors?.toString() ||
          err.error.serverError ||
          'Failed to create assignment'
      );
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof addAssignmentSchema>>({
    defaultValues: {
      submissions: undefined,
      title: '',
      deadline: new Date(),
      submission: undefined,
      description: '',
      taskType: undefined,
      classId: undefined,
      courseId: undefined,
    },
    resolver: zodResolver(addAssignmentSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof addAssignmentSchema>> = (
    data,
    e
  ) => {
    e?.preventDefault();
    execute(data);
  };

  return (
    <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
      <div>
        <Label>Title</Label>
        <Input {...register('title')} placeholder="Enter assignment title" />
        {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
      </div>

      <div>
        <Label>Submissions</Label>
        <Select onValueChange={(v) => setValue('submission', v)}>
          <SelectTrigger className='mb-4 border border-navy bg-transparent'>
            <SelectValue placeholder='Select submissions'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {submissionsEnum.map((submission) => (
              <SelectItem
                value={submission}
                key={submission}
                className='capitalize'
              >
                {submission}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.submissions && <ErrorText>{errors.submissions.message}</ErrorText>}
      </div>

      <div>
        <Label>Deadline</Label>
        <Input
          type='datetime-local'
          {...register('deadline', {
            validate: (val) => new Date(val) > new Date(),
          })}
        />
        {errors.deadline && <ErrorText>{errors.deadline.message}</ErrorText>}
      </div>

      <div>
        <Label>Task Type</Label>
        <Select
          onValueChange={(e) =>
            setValue('taskType', (e as 'PERSONAL_TASK') || 'GROUP_TASK')
          }
        >
          <SelectTrigger className='mb-4 border border-navy bg-transparent'>
            <SelectValue placeholder='Select Type'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value='PERSONAL_TASK'
              key={1}
              className='capitalize'
            >
              Personal
            </SelectItem>
            <SelectItem
              value='GROUP_TASK'
              key={2}
              className='capitalize'
            >
              Group
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.taskType && <ErrorText>{errors.taskType.message}</ErrorText>}
      </div>

      <div>
        <Label>Course</Label>
        <Select onValueChange={(e) => setValue('courseId', Number(e))}>
          <SelectTrigger className='mb-4 border border-navy bg-transparent'>
            <SelectValue placeholder='Select course'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem
                value={String(course.id)}
                key={course.id}
                className='capitalize'
              >
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.courseId && <ErrorText>{errors.courseId.message}</ErrorText>}
      </div>

      {watch('courseId') && (
        <div>
          <Label>Class</Label>
          <Select onValueChange={(e) => setValue('classId', Number(e))}>
            <SelectTrigger className='mb-4 border border-navy bg-transparent'>
              <SelectValue placeholder='Select class'></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {classes
                .filter((c) => c.courseId === watch('courseId'))
                .map((c) => (
                  <SelectItem
                    value={String(c.id)}
                    key={c.id}
                    className='capitalize'
                  >
                    {c.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.classId && <ErrorText>{errors.classId.message}</ErrorText>}
        </div>
      )}

      <Button
        type='submit'
        onClick={(e) => handleSubmit(onSubmit)(e)}
        className="bg-navy"
        disabled={isExecuting}
      >
        {isExecuting ? 'Creating...' : 'Create Assignment'}
      </Button>
    </form>
  );
}

export default AddForm;
