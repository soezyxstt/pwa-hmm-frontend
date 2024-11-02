import AdminHeader from '@/components/admin/header';
import AssignmentTable from '@/app/portal/atur-atur/(with-aside)/assignments/table';
import { getAssignments } from '@/_actions/assignment-action';
import { getCourses } from '@/_actions/courses-action';
import CustomLink from '@/components/admin/custom-link';
import AdminBreadcrumb from '@/components/admin/breadcrumb';
import { getClasses } from '@/_actions/class-action';

export const dynamic = 'force-dynamic';

export default async function Assignments() {
  const courses = await getCourses();
  const classes = await Promise.all(
    courses.map(async ({ id, title }) => {
      const classes_ = await getClasses(id);
      return classes_.map((class_) => ({
        courseId: id,
        courseTitle: title,
        class: class_,
      }));
    })
  );

  const assignments_ = await Promise.all(
    classes.map(async (c_) => {
      return await Promise.all(
        c_.map(async (c) => {
          const as = await getAssignments(c.courseId, c.class.id);
          return as.map((a) => ({
            ...a,
            course: c.courseTitle,
            courseId: c.courseId,
            classId: c.class.id,
            class: c.class,
          }));
        })
      );
    })
  );

  const assignments = assignments_.flat(2);

  return (
    <>
      <AdminHeader title='Assignments' />
      <div className='flex justify-between items-center'>
        <AdminBreadcrumb />
        <CustomLink href={'assignments/add'}>Add Assignment</CustomLink>
      </div>
      <AssignmentTable data={assignments} />
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
