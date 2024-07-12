import { cn, pathFormatter } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import { type ReactNode, type HTMLAttributes } from 'react';
import { sideBarTabs, sideBarIcons } from '../data/data';
import Image from 'next/image';
import ProfileMenu from './profileMenu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { EllipsisVertical } from 'lucide-react';
import { Button } from './ui/button';

type SidebarProps = {
  loc: string;
} & HTMLAttributes<HTMLDivElement>;

function Sidebar({ className, loc, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-64 bg-navy pl-10 py-12 sticky top-0 h-dvh hidden md:block',
        className
      )}
      {...props}
    >
      <div className='flex mb-6 items-center gap-3'>
        <Image
          src='/images/logo.png'
          width={40}
          height={40}
          alt='logo'
        />
        <h1 className='text-white text-2xl font-bold'>HMM ITB</h1>
      </div>
      <div className='flex flex-col gap-3 text-abu-2 text-sm font-medium'>
        {sideBarTabs.map((tab, index) => (
          <CusLink
            key={index}
            href={'/' + pathFormatter(tab)}
            isActive={loc.toLowerCase() === pathFormatter(tab)}
            icon={sideBarIcons[index]}
          >
            {tab}
          </CusLink>
        ))}
      </div>
    </aside>
  );
}

function CusLink({
  href,
  className,
  children,
  isActive = false,
  icon,
}: {
  className?: string;
  isActive?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
} & LinkProps) {
  return (
    <Link
      className={cn(
        'relative py-2.5 pl-4 rounded-l-full flex gap-4 items-center transition-all duration-150 ease-in-out before:absolute before:bottom-0 before:left-4 before:h-0.5 before:rounded-full before:w-0 before:transition-all before:bg-background before:translate-y-full',
        isActive
          ? 'bg-background text-navy '
          : 'md:hover:pl-6 md:hover:before:w-3/4',
        className
      )}
      href={href}
    >
      {icon}
      <h5 className='text-inherit'>{children}</h5>
      {isActive && (
        <>
          <div className='hidden md:block aspect-square h-2 absolute right-0 top-0 -translate-y-full bg-background'>
            <div className='absolute right-0 top-0 bg-navy rounded-br-full h-full w-full'></div>
          </div>
          <div className='hidden md:block aspect-square h-2 absolute right-0 bottom-0 translate-y-full bg-background'>
            <div className='absolute right-0 top-0 bg-navy rounded-tr-full h-full w-full'></div>
          </div>
        </>
      )}
    </Link>
  );
}

function AsideDrawer({ loc }: SidebarProps) {
  return (
    <aside className='md:hidden w-full flex justify-between items-center py-5 px-4'>
      <div className='flex gap-4 items-center'>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant='ghost'
              className='px-1 py-0'
            >
              <EllipsisVertical size={24} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className='bg-navy'>
            <div className=' text-abu-2 text-sm font-medium bg-navy px-3'>
              <DrawerHeader>
                <DrawerTitle className='text-abu-2'>Menu</DrawerTitle>
              </DrawerHeader>
              <div className='flex flex-col gap-3 pb-4'>
                {sideBarTabs.map((tab, index) => (
                  <CusLink
                    key={index}
                    href={'/' + pathFormatter(tab)}
                    isActive={false}
                    icon={sideBarIcons[index]}
                  >
                    {tab}
                  </CusLink>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <h1 className='text-xl font-bold capitalize'>{loc}</h1>
      </div>
      <ProfileMenu />
    </aside>
  );
}

function Aside({ loc }: SidebarProps) {
  return (
    <>
      <Sidebar loc={loc} />
      <AsideDrawer loc={loc} />
    </>
  );
}

export { Sidebar, AsideDrawer as Drawer, Aside };
