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

const formSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/, {
      message: 'Email must be ITB student email',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className='relative w-full min-h-dvh flex items-center justify-center'>
      {/* Add images for background */}
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
        <form className='flex flex-col items-center max-w-64 gap-4'>
          <h1 className=''>Sign In</h1>
          <h4 className='text-center font-semibold'>
            Enter your email below to login to your account
          </h4>
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
                <FormDescription className='text-xs'>131*****@mahasiswa.itb.ac.id</FormDescription>
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
                  <div className='relative items-center flex'>
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

          <Button
            type='submit'
            className=' rounded-md w-full shadow-md'
            disabled={
              form.formState.isSubmitting ||
              !form.formState.isDirty
            }
          >
            Sign In
          </Button>
          
          <span className='flex gap-1'>
            <h6>{"Don't have account?"}</h6>
            <Link href='/sign-up'>
              <h6 className='font-bold'>Sign up</h6>
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
