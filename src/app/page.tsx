import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}

export const metadata = {
  title: 'Dashborad | HMM ITB',
};
