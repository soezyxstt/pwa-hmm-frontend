import AdminHeader from '@/components/admin/header';
import Button from '@/components/ui/button/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default function Assignments() {
  const dummy = [
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
    {
      id: '21j8-po1o-2o13-i2iu-o99i-pdaj',
      color: 'oren',
      course: 'MS2111 KINDIN',
      name: 'Tubes Besar',
      dueDate: '2024-03-08',
      submission: 'MS Teams',
    },
  ];
  return (
    <>
      <AdminHeader title='Assignments' />
      <Button className='rounded-lg w-fit px-3 flex gap-2 items-center'>
        <Plus /> Add
      </Button>
      <div className='rounded-xl shadow-md w-full bg-white flex-1 p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Submission</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummy.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>{item.submission}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
