import ClientBreadcrumb from '@/components/client/breadcrumb';
import HeaderNav from '@/components/client/header';
import Navbar from '@/components/client/navbar';
import ProfileMenu from '@/components/client/profileMenu';
import MainTransition from './transition';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <ProfileMenu />
      </Navbar>
      <MainTransition>
        <HeaderNav />
        <ClientBreadcrumb />
        {children}
      </MainTransition>
    </>
  );
}
