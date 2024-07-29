import ClientBreadcrumb from '@/components/client/breadcrumb';
import HeaderNav from '@/components/client/header';
import Navbar from '@/components/client/navbar';
import ProfileMenu from '@/components/client/profileMenu';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar >
        <ProfileMenu />
      </Navbar>
      <main className='flex flex-col flex-1 h-max px-4 pt-4 pb-6 md:px-6 md:pt-0 lg:px-10 gap-4 md:gap-6'>
        <HeaderNav />
        <ClientBreadcrumb />
        {children}
      </main>
    </>
  );
}
