import AdminHeader from '@/components/admin/header';
import { getScholarships } from '@/_actions/scholarship-action';
import CustomLink from '@/components/admin/custom-link';
import AdminBreadcrumb from '@/components/admin/breadcrumb';
import ScholarshipTable from './table';

export const dynamic = 'force-dynamic';

export default async function Scholarships() {
  const scholarships = await getScholarships();
  
  return (
    <>
      <AdminHeader title='Scholarships' />
      <div className='flex justify-between items-center'>
        <AdminBreadcrumb />
        <CustomLink href={'scholarships/add'}>Add Scholarship</CustomLink>
      </div>
      <ScholarshipTable data={scholarships} />
    </>
  );
} 