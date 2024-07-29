import Main from '@/components/client/pages/hmm-store/item-wrapper';
import Search from '@/components/client/search';

const HMMStorePage = () => {
  return (
    <main className='flex flex-col items-stretch w-full h-full relative'>
      <Search />
      <Main  />
    </main>
  );
};

export const metadata = {
  title: 'HMM Store',
};

export default HMMStorePage;
