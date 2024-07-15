import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(poppins.className, 'md:flex')}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'HMM ITB',
    absolute: 'HMM ITB',
  },
  description: 'Progressive Web Apps for HMM ITB',
};
