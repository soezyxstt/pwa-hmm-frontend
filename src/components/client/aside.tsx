import { cn, pathFormatter } from '@/lib/utils';
import Link, { type LinkProps } from 'next/link';
import { type ReactNode, type HTMLAttributes } from 'react';
import { sideBarTabs, sideBarIcons } from '@/data/data';
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import BurgerX from './burger-x';

type SidebarProps = {
  loc: string;
} & HTMLAttributes<HTMLDivElement>;

function Sidebar({ className, loc, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        'min-w-56 bg-navy md:pl-6 lg:pl-10 py-12 sticky top-0 h-screen hidden md:block',
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
        <h1 className='text-white text-2xl font-bold text-nowrap'>HMM ITB</h1>
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
        'relative py-2.5 pl-2 md:pl-4 pr-4 md:rounded-l-full rounded-md md:rounded-r-none flex md:gap-4 gap-3 items-center transition-all duration-150 ease-in-out before:absolute before:bottom-0 before:left-4 before:h-0.5 before:rounded-full before:w-0 before:transition-all before:bg-background before:translate-y-full',
        isActive
          ? 'md:bg-background md:text-navy text-white bg-blue-200/40 pl-4 md:pl-6'
          : 'md:hover:pl-6 md:hover:before:w-3/4 md:hover:pr-2',
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

function AsideDrawer({ loc, children }: SidebarProps) {
  return (
    <aside className='md:hidden w-full flex justify-between items-center h-16 px-[max(1.5rem,2vw)] border-b'>
      <div className='flex gap-4 items-center min-w-[50%]'>
        <Drawer>
          <DrawerTrigger className='group/drawer'>
            <BurgerX />
          </DrawerTrigger>
          <DrawerContent className='bg-navy'>
            <div className=' text-abu-2 text-sm font-medium bg-navy px-4'>
              <DrawerHeader>
                <DrawerTitle className='text-abu-2'>Menu</DrawerTitle>
              </DrawerHeader>
              <div className='flex flex-col gap-3 pb-4'>
                {sideBarTabs.map((tab, index) => (
                  <CusLink
                    key={index}
                    href={'/' + pathFormatter(tab)}
                    isActive={loc.toLowerCase() === pathFormatter(tab)}
                    icon={sideBarIcons[index]}
                    className='hover:bg-blue-200/20'
                  >
                    {tab}
                  </CusLink>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <h1 className='text-xl font-bold capitalize'>
          {loc === 'mycareer' ? 'MyCareer' : loc.replace('hmm', 'HMM')}
        </h1>
      </div>
      {children}
    </aside>
  );
}

export { Sidebar, AsideDrawer as Drawer };
