import ClientBreadcrumb from '@/components/client/breadcrumb';
import HeaderNav from '@/components/client/header';
import Navbar from '@/components/client/navbar';
import ProfileMenu from '@/components/client/profileMenu';
import MainTransition from './transition';
import {ReactNode} from "react";

export default function Template({
                                   children,
                                 }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar>
        <ProfileMenu/>
      </Navbar>
      <MainTransition>
        <HeaderNav/>
        <ClientBreadcrumb/>
        {children}
      </MainTransition>
    </>
  );
}
