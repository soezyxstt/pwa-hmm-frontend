import Navbar from '@/components/client/navbar';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className='flex flex-col flex-1 h-max px-4 pb-6 md:px-6 md:py-8'>
        {children}
      </main>
    </>
  );
}
