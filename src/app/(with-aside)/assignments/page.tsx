import Header from '@/components/client/header';
import AssingmentPage from './assignment';

export default function Page() {
  return (
    <>
      <Header title='Assignments' />
      <AssingmentPage />
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
