import {ReactNode} from "react";

export default function ProfileLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <>
      {children} {modal}
    </>
  );
}

export const metadata = {}