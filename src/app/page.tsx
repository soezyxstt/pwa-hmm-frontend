import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
  return <></>;
}

export const metadata = {
  title: 'Dashborad | HMM ITB',
};
