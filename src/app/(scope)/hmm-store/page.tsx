import Main from '@/components/pages/hmm-store/item-wrapper';
import Search from '@/components/search';
import Header from '@/components/header';

const HMMStorePage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  return (
    <main className='flex flex-col items-stretch w-full h-full relative'>
      <Header title='HMM Store' className='md:mb-5' />
      <Search />
      <Main searchParams={searchParams} />
    </main>
  );
};

export const metadata = {
  title: 'HMM Store',
};

export default HMMStorePage;
