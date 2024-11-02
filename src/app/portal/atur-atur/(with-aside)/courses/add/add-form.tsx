'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ErrorText from '../../../error-text';
import { addCourseSchema } from '@/lib/schema';
import { createCourse } from '@/_actions/courses-action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FormData = z.infer<typeof addCourseSchema>;

function AddForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      status: undefined,
      categoryId: "",
      description: '',
      image: "",
    },
  });

  const { execute: executeAddCourse, status } = useAction(createCourse, {
    onSuccess: () => {
      toast.success('Course added successfully');
      router.push('/portal/atur-atur/courses');
    },
    onError: (error) => {
      toast.error(error.error?.serverError || 'Failed to add course');
    },
  });

  const onSubmit = handleSubmit((data) => {
    executeAddCourse(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className='space-y-4'
    >
      <div>
        <Label>Code*</Label>
        <Input
          id='code'
          {...register('code')}
        />
        {errors.code && <ErrorText>{errors.code.message}</ErrorText>}
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          id='imageUrl'
          type='url'
          placeholder='https://example.com/image.jpg'
          {...register('image')}
        />
        {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
      </div>

      <div>
        <Label>Title*</Label>
        <Input
          id='title'
          {...register('title')}
        />
        {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
      </div>

      <div>
        <Label>Status*</Label>
        <Select
          onValueChange={(value) =>
            setValue('status', value as 'PUBLISHED' | 'DRAFT')
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='PUBLISHED'>Published</SelectItem>
            <SelectItem value='DRAFT'>Draft</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <ErrorText>{errors.status.message}</ErrorText>}
      </div>

      <div>
        <Label>Category ID</Label>
        <Input
          id='categoryId'
          {...register('categoryId')}
        />
        {errors.categoryId && (
          <ErrorText>{errors.categoryId.message}</ErrorText>
        )}
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          id='description'
          rows={5}
          {...register('description')}
        />
        {errors.description && (
          <ErrorText>{errors.description.message}</ErrorText>
        )}
      </div>

      <Button
        type='submit'
        className='bg-navy mt-6'
        disabled={status === 'executing'}
      >
        {status === 'executing' ? 'Adding...' : 'Add Course'}
      </Button>
    </form>
  );
}

export default AddForm;
