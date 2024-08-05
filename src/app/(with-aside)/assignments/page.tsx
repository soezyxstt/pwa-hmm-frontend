import { getEnrolledCourses } from '@/actions/courses-action';
import Assignment from './assignment';
import { getAssignments } from '@/actions/assignment-action';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const assignments = await getAssignments();
  const courses = await getEnrolledCourses();
  return (
    <>
      <Assignment assignments={assignments} courses={courses} />
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
