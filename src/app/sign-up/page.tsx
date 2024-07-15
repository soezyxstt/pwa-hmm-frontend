import Button from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { type BaseSyntheticEvent } from 'react';
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

export default function SignUp({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const showPassword = searchParams['show'] === 'true';
  const showConfirmPassword = searchParams['showc'] === 'true';

  return (
    <div className='relative w-full min-h-dvh flex items-center justify-center'>
      <Image
        src='/hmm-vstock/bp-black-transparent.png'
        className=' opacity-20 absolute left-0 bottom-0 w-2/5 md:w-1/6'
        alt='bp-black-transparent'
        width={2000}
        height={2000}
      />
      <Image
        src='/hmm-vstock/bp-black-transparent.png'
        className=' opacity-20 absolute right-0 top-0 w-1/3 md:w-1/6'
        alt='bp-black-transparent'
        width={2000}
        height={2000}
      />
      <form className='flex flex-col items-center max-w-64 gap-3'>
        <h1 className=''>Sign Up</h1>
        <h4 className='text-center font-semibold'>
          Enter your details below to create an account
        </h4>
        <Label className='self-start text-navy font-semibold'>Fullname</Label>
        <Input
          className=''
          placeholder=''
        />
        <Label className='self-start text-navy font-semibold'>Email</Label>
        <Input
          className=''
          type='email'
        />
        <Label className='self-start text-navy font-semibold'>Password</Label>
        <div className='relative flex items-center'>
          <Input
            className=''
            type={showPassword ? 'text' : 'password'}
          />
          {showPassword ? (
            <Link href='?show=false'>
              <FiEye className='absolute right-3 cursor-pointer text-navy' />
            </Link>
          ) : (
            <Link href='?show=true'>
              <FiEyeOff className='absolute right-3 cursor-pointer text-navy' />
            </Link>
          )}
        </div>
        <Label className='self-start text-navy font-semibold'>
          Confirm Password
        </Label>
        <div className='relative flex items-center'>
          <Input
            className=''
            type={showConfirmPassword ? 'text' : 'password'}
          />
          {showConfirmPassword ? (
            <Link href='?showc=false'>
              <FiEye className='absolute right-3 cursor-pointer text-navy' />
            </Link>
          ) : (
            <Link href='?showc=true'>
              <FiEyeOff className='absolute right-3 cursor-pointer text-navy' />
            </Link>
          )}
        </div>
        <Button
          type='submit'
          className=' rounded-md w-full shadow-md'
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
    </div>
  );
}
