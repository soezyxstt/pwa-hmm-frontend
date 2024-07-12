import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const ProfileMenu = () => {
  return (
    <div className='flex gap-3 items-center'>
      <Tooltip>
        <TooltipTrigger>
          <button className='bg-white p-2 rounded-full text-lg'>
            <IoMdNotificationsOutline />
          </button>
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <button className='bg-white p-2 rounded-full text-lg'>
            <IoSettingsOutline />
          </button>
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Link href='/profile'>
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
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>Profile</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ProfileMenu;
