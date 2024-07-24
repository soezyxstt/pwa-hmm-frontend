import Main from '@/components/client/pages/hmm-store/item-wrapper';
import Search from '@/components/client/search';
import Header from '@/components/client/header';

const HMMStorePage = () => {
  return (
    <main className='flex flex-col items-stretch w-full h-full relative'>
      <Header
        title='HMM Store'
        className='md:mb-5'
      />
      <Search />
      <Main  />
    </main>
  );
};

export const metadata = {
  title: 'HMM Store',
};

export default HMMStorePage;
