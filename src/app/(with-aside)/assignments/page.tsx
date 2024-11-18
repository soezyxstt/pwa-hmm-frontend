import { getEnrolledCourses } from '@/_actions/courses-action';
import Assignment from './assignment';
import { getUserAssignment } from '@/_actions/assignment-action';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const assignments = await getUserAssignment();
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
