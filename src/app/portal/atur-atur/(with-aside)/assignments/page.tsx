import AdminHeader from '@/components/admin/header';
import AssignmentTable from "@/app/portal/atur-atur/(with-aside)/assignments/table";
import {getAssignments} from "@/actions/assignment-action";
import Add from "@/app/portal/atur-atur/(with-aside)/assignments/add";
import {getCourses} from "@/actions/courses-action";

export const dynamic = 'force-dynamic';

export default async function Assignments() {
  const assignments = await getAssignments();
  const courses = await getCourses();
  return (
    <>
      <AdminHeader title='Assignments'/>
      <Add courses={courses}/>
      <AssignmentTable data={assignments}/>
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
