import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn, extractFirstSegment, pathFormatter } from '@/lib/utils';
import { headers } from 'next/headers';
import { sideBarTabs } from '@/data/data';
import { Aside } from '@/components/aside';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'HMM ITB',
    template: '%s | HMM ITB',
    absolute: 'HMM ITB',
  },
  description: 'PWA for HMM ITB',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = headers().get('x-current-path');
  const firstPath = extractFirstSegment(pathName as string);
  const clientTabs = sideBarTabs.map((tab) => pathFormatter(tab));
  const isClientTab = clientTabs.includes(firstPath);

  return (
    <html lang='en'>
      <body className={cn(poppins.className, 'md:flex')}>
        {isClientTab && <Aside loc={firstPath.includes('hmm') ? firstPath.replace('hmm', 'HMM') : firstPath} />}
        <main
          className={cn(
            'flex flex-col flex-1 h-max',
            isClientTab && 'px-4 pb-6 md:px-6 md:py-8'
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
