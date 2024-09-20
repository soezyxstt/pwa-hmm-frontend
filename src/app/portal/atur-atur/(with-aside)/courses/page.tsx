import AdminHeader from '@/components/admin/header';
import CoursesTable from "@/app/portal/atur-atur/(with-aside)/courses/table";
import AdminBreadcrumb from "@/components/admin/breadcrumb";
import CustomLink from "@/components/admin/custom-link";

export default function Courses() {
  return (
    <>
      <AdminHeader title='Courses'/>
      <div className="flex justify-between items-center">
        <AdminBreadcrumb/>
        <CustomLink href={'courses/add'}>
          Add Course
        </CustomLink>
      </div>
      <CoursesTable data={[]} />
    </>
  )
}