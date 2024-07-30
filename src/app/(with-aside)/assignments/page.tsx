import AssingmentPage from './assignment';
import { getAssignments } from '@/actions/assignment-action';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const assignments = await getAssignments();
  return (
    <>
      <AssingmentPage assignments={assignments} />
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
