import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Button from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getFullUser } from '@/lib/dal';
import { type UserModel } from 'lms-types';
import Link from 'next/link';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' }),
  nim: z
    .string()
    .length(10, { message: 'NIM must be 10 characters long' })
    .refine((nim) => nim.slice(0, 3) === '131', {
      message: 'NIM must start with 131',
    }),
  location: z
    .string()
    .min(4, { message: 'Location must be at least 4 characters long' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 characters long' }),
  email: z.string().email({ message: 'Invalid email' }),
  born: z
    .string()
    .max(2, { message: 'Only 2 digits or less number is valid' })
    .refine((born) => parseInt(born) <= 31, {
      message: 'Born year must be less than 31',
    }),
  address: z
    .string()
    .min(4, { message: 'Address must be at least 4 characters long' }),
  city: z
    .string()
    .min(4, { message: 'City must be at least 4 characters long' }),
  bloodType: z
    .string()
    .max(2, { message: 'Blood type must be 1 or 2 characters long' }),
  illness: z
    .string()
    .min(4, { message: 'Illness must be at least 4 characters long' }),
  lineId: z
    .string()
    .min(4, { message: 'Line ID must be at least 4 characters long' }),
  emergencyNumber: z.string().min(10, {
    message: 'Emergency number must be at least 10 characters long',
  }),
  hmmPos: z.string().min(4, { message: 'Invalid' }),
  ukm: z.string(),
  hobby: z.string().min(4, { message: 'Invalid hobby' }),
});

export default async function EditProfile({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const user: UserModel = await getFullUser();

  const {
    name,
    avatar,
    email,
    phoneNumber,
    NIM,
    medicalHistories,
    hobbies,
    emergencyNumber,
    lineId,
    UKM,
    HMM,
    dateOfBirth,
    address,
    bloodType,
  } = user;

  const page = parseInt(searchParams['page'] ?? '1');

  const inputLists: {
    label: string;
    type: string;
    name: string;
    id: string;
    defaultValue?: string;
  }[] = [
    {
      label: 'Name',
      type: 'text',
      name: 'name',
      id: 'name',
      defaultValue: name,
    },
    {
      label: 'NIM',
      type: 'number',
      name: 'nim',
      id: 'nim',
      defaultValue: NIM,
    },
    {
      label: 'Location',
      type: 'text',
      name: 'location',
      id: 'location',
      defaultValue: address,
    },
    {
      label: 'Phone Number',
      type: 'number',
      name: 'phoneNumber',
      id: 'phoneNumber',
      defaultValue: phoneNumber!,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      id: 'email',
      defaultValue: email,
    },
    {
      label: 'Born',
      type: 'date',
      name: 'born',
      id: 'born',
      defaultValue: new Date(dateOfBirth).toDateString(),
    },
    {
      label: 'Address',
      type: 'text',
      name: 'address',
      id: 'address',
      defaultValue: address,
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      id: 'city',
      defaultValue: address,
    },
    {
      label: 'Blood Type',
      type: 'text',
      name: 'bloodType',
      id: 'bloodType',
      defaultValue: bloodType,
    },
    {
      label: 'Medical History',
      type: 'text',
      name: 'illness',
      id: 'illness',
      defaultValue: medicalHistories.join(', '),
    },
    {
      label: 'Line ID',
      type: 'text',
      name: 'lineId',
      id: 'lineId',
      defaultValue: lineId,
    },
    {
      label: 'Emergency Number',
      type: 'number',
      name: 'emergencyNumber',
      id: 'emergencyNumber',
      defaultValue: emergencyNumber,
    },
    {
      label: 'HMM Division',
      type: 'text',
      name: 'hmmPos',
      id: 'hmmPos',
      defaultValue: HMM.join(', '),
    },
    {
      label: 'UKM',
      type: 'text',
      name: 'ukm',
      id: 'ukm',
      defaultValue: UKM.join(', '),
    },
    {
      label: 'Hobby',
      type: 'text',
      name: 'hobby',
      id: 'hobby',
      defaultValue: hobbies.join(', '),
    },
  ];

  return (
    <main className='w-full h-full space-y-4 md:space-y-6'>
      <div className='rounded-xl flex flex-col flex-1 bg-white'>
        <div className='bg-navy min-h-[15vh] w-full z-0 relative md:mb-20 mb-16 rounded-t-xl flex justify-end items-center pr-6'>
          <div className='flex items-center justify-center p-1.5 bg-white w-fit rounded-full absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'>
            <Avatar className='md:w-40 md:h-40 h-32 w-32'>
              <AvatarImage
                src={avatar}
                alt='avatar'
              />
              <AvatarFallback className='bg-white'>
                {name.split(' ').map((t: string) => t[0])}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <form className='flex gap-4 md:gap-4 flex-col md:px-16 px-8 md:py-8 py-8 shadow-md rounded-b-xl'>
          {inputLists.map((data, i) => {
            if (Math.floor(i / 5) === page - 1) {
              return (
                <div
                  className='space-y-2'
                  key={data.label}
                >
                  <Label
                    className='text-navy'
                    htmlFor={data.id}
                    key={i}
                  >
                    {data.label}
                  </Label>
                  <Input
                    id={data.id}
                    name={data.name}
                    type={data.type}
                    defaultValue={data.defaultValue}
                    key={i}
                  />
                </div>
              );
            }
          })}
          <div className='mt-8 flex gap-4 w-full *:flex-1'>
            <Link
              href={
                page === 1
                  ? '/profile'
                  : `
              ?page=${page - 1}
            `
              }
              className='rounded-lg bg-navy flex items-center justify-center text-white py-2'
            >
              {page === 1 ? 'Back to Profile' : 'Back'}
            </Link>
            {page === 3 && (
              <Button
                type='submit'
                className='rounded-lg py-2 w-auto px-0'
              >
                Save
              </Button>
            )}
            {(page === 1 || page === 2) && (
              <Link
                href={`?page=${page + 1}`}
                className='rounded-lg bg-navy flex items-center justify-center text-white py-2'
              >
                Next
              </Link>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
