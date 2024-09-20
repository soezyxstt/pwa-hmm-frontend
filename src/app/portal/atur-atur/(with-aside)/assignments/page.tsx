import AdminHeader from '@/components/admin/header';
import AssignmentTable from "@/app/portal/atur-atur/(with-aside)/assignments/table";
import {getAssignments} from "@/_actions/assignment-action";
import {getCourses} from "@/_actions/courses-action";
import CustomLink from "@/components/admin/custom-link";
import AdminBreadcrumb from "@/components/admin/breadcrumb";

export const dynamic = 'force-dynamic';

export default async function Assignments() {
  const assignments = await getAssignments();
  const courses = await getCourses();
  return (
    <>
      <AdminHeader title='Assignments'/>
      <div className="flex justify-between items-center">
        <AdminBreadcrumb/>
        <CustomLink href={'assignments/add'}>
          Add Assignment
        </CustomLink>
      </div>
      <AssignmentTable data={assignments}/>
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
