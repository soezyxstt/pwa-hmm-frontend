'use client';

import Button from '@/components/button/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { z } from 'zod';

const formSchema = z
  .object({
    fullname: z
      .string()
      .min(3, { message: 'Fullname must be at least 3 characters' }),
    email: z
      .string()
      .email()
      .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/, {
        message: 'Email must be ITB student email',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div className='relative w-full min-h-dvh flex items-center justify-center'>
      <Image
        src='/hmm-vstock/bp-black-transparent.png'
        className=' opacity-20 absolute left-0 bottom-0 w-2/5'
        alt='bp-black-transparent'
        width={2000}
        height={2000}
      />
      <Image
        src='/hmm-vstock/bp-black-transparent.png'
        className=' opacity-20 absolute right-0 top-0 w-1/3'
        alt='bp-black-transparent'
        width={2000}
        height={2000}
      />
      <Form {...form}>
        <form className='flex flex-col items-center max-w-64 gap-3'>
          <h1 className=''>Sign Up</h1>
          <h4 className='text-center font-semibold'>
            Enter your details below to create an account
          </h4>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='self-start text-navy font-semibold'>
                  Fullname
                </FormLabel>
                <FormControl>
                  <Input
                    className=''
                    placeholder=''
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='self-start text-navy font-semibold'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className=''
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-xs'>
                  131*****@mahasiswa.itb.ac.id
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='self-start text-navy font-semibold'>
                  Password
                </FormLabel>
                <FormControl>
                  <div className='relative flex items-center'>
                    <Input
                      className=''
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    {showPassword ? (
                      <FiEye
                        className='absolute right-3 cursor-pointer text-navy'
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FiEyeOff
                        className='absolute right-3 cursor-pointer text-navy'
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='self-start text-navy font-semibold'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className='relative flex items-center'>
                    <Input
                      className=''
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                    />
                    {showConfirmPassword ? (
                      <FiEye
                        className='absolute right-3 cursor-pointer text-navy'
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <FiEyeOff
                        className='absolute right-3 cursor-pointer text-navy'
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className=' rounded-md w-full shadow-md'
            disabled={
              form.formState.isSubmitting ||
              !form.formState.isDirty
            }
          >
            Sign Up
          </Button>
          <span className='flex gap-1'>
            <h6>{'Already have an account?'}</h6>
            <Link href='/sign-in'>
              <h6 className='font-bold'>Sign in</h6>
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
