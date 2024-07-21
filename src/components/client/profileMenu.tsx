import 'server-only';

import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { getUser } from '@/lib/dal';

const ProfileMenu = async () => {
  const { data: {name, avatar, role} } = await getUser();

  return (
    <div className='flex gap-3 items-center'>
      <Tooltip>
        <TooltipTrigger className='bg-white p-2 rounded-full text-lg'>
          <IoMdNotificationsOutline />
        </TooltipTrigger>
        <TooltipContent className='hidden md:block'>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger className='bg-white p-2 rounded-full text-lg'>
            <IoSettingsOutline />
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
                <p className='font-semibold'>{name}</p>
                <p className='text-abu-3'>{role}</p>
              </div>
              <Avatar>
                <AvatarImage
                  src={avatar}
                  alt='avatar'
                />
                <AvatarFallback className='bg-white'>{name.split(' ').map((t: string) => t[0])}</AvatarFallback>
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
