'use client';
import React, { useRef, useState } from 'react';
import AdminBreadcrumb from '@/components/admin/breadcrumb';
import AdminHeader from '@/components/admin/header';
import { useParams, useSearchParams } from 'next/navigation';
import Wrapper from '../../../../wrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCourseSchema } from '@/lib/schema';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAction } from 'next-safe-action/hooks';
import { updateCourse } from '@/_actions/courses-action';
import { uploadCourseImage } from '@/_actions/upload-image-action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(searchParams.get('image'));

  const defaultValues = {
    courseId: Number(id),
    code: searchParams.get('code') || '',
    title: searchParams.get('title') || '',
    description: searchParams.get('description') || '',
    status: searchParams.get('status') as 'PUBLISHED' | 'DRAFT' || undefined,
    image: searchParams.get('image') || '',
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof updateCourseSchema>>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues,
  });

  const { execute: executeUpload } = useAction(uploadCourseImage, {
    onSuccess: (url) => {
      if (url.data) {
        setValue('image', url.data);
        setPreviewUrl(url.data);
        toast.success('Image uploaded successfully');
      }
    },
    onError: (error) => {
      toast.error(error.error?.serverError || 'Failed to upload image');
    },
  });

  const { execute: executeUpdateCourse, isExecuting } = useAction(updateCourse, {
    onSuccess: () => {
      toast.success('Course updated successfully');
      router.push('/portal/admin/courses');
    },
    onError: ({ error: { serverError, validationErrors, fetchError } }) => {
      toast.error(
        serverError ||
          fetchError ||
          validationErrors?.toString() ||
          'Failed to update course'
      );
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Upload
    const formData = new FormData();
    formData.append('file', file);
    await executeUpload({ file: formData });
  };

  const onSubmit = handleSubmit((data) => {
    executeUpdateCourse(data);
  });

  return (
    <>
      <AdminHeader title='Edit Course' />
      <AdminBreadcrumb />
      <Wrapper>
        <form className='space-y-4' onSubmit={onSubmit}>
          <div>
            <Label>Code</Label>
            <Input {...register('code')} />
            {errors.code && <span className="text-red-500 text-sm">{errors.code.message}</span>}
          </div>

          <div>
            <Label>Image</Label>
            <div className="flex flex-col gap-4">
              {previewUrl && (
                <div className="relative w-40 h-40">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className='w-fit'
              >
                Choose Image
              </Button>
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <Input {...register('title')} />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(value) => setValue('status', value as 'PUBLISHED' | 'DRAFT')}
              defaultValue={defaultValues.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register('description')} rows={5} />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
          </div>

          <Button type="submit" className="bg-navy" disabled={isExecuting}>
            {isExecuting ? 'Updating...' : 'Update Course'}
          </Button>
        </form>
      </Wrapper>
    </>
  );
} 