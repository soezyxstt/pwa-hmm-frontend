import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Link from 'next/link';

const ProfileMenu = () => {
  return (
    <Link href="/profile" className='flex gap-3 items-center'>
      <button
        className='bg-white p-2 rounded-full text-lg'
        title='notifications'
      >
        <IoMdNotificationsOutline />
      </button>
      <button
        className='bg-white p-2 rounded-full text-lg'
        title='notifications'
      >
        <IoSettingsOutline />
      </button>
      <div className='flex items-center gap-2 ml-2'>
        <div className='*:text-[0.625rem]'>
          <p className='font-semibold'>Nama</p>
          <p className='text-abu-3'>Role</p>
        </div>
        <Avatar>
          <AvatarImage
            src='/images/logo.png'
            alt='avatar'
          />
          <AvatarFallback className='bg-white'>HM</AvatarFallback>
        </Avatar>
      </div>
    </Link>
  );
};

export default ProfileMenu;
