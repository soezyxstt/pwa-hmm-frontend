import type { Metadata } from 'next';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'HMM ITB',
    template: '%s | HMM ITB',
    absolute: 'HMM ITB',
  },
};
