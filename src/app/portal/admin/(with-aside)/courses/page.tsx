import AdminHeader from '@/components/admin/header';
import CoursesTable from '@/app/portal/admin/(with-aside)/courses/table';
import AdminBreadcrumb from '@/components/admin/breadcrumb';
import CustomLink from '@/components/admin/custom-link';
import { getCourses } from '@/_actions/courses-action';

export const dynamic = 'force-dynamic';

async function Courses() {
  const courses = await getCourses();
  return (
    <>
      <AdminHeader title='Courses' />
      <div className='flex justify-between items-center'>
        <AdminBreadcrumb />
        <CustomLink href={'courses/add'}>Add Course</CustomLink>
      </div>
      <CoursesTable data={courses} />
    </>
  );
}
export default Courses;
