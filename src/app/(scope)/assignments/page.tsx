import Header from '@/components/header';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AssingmentPage = () => {
  const data = [
    {
      status: true,
      course: 'MS2111 KINDIN',
      class: 'K01',
      name: 'Tugas Besar',
      deadline: '2022-01-01',
      submission: 'Edunex',
    },
    {
      status: false,
      course: 'MS2111 KINDIN',
      class: 'K01',
      name: 'Tugas Besar',
      deadline: '2022-01-01',
      submission: 'Edunex',
    },
    {
      status: true,
      course: 'MS2111 KINDIN',
      class: 'K01',
      name: 'Tugas Besar',
      deadline: '2022-01-01',
      submission: 'Edunex',
    },
    {
      status: false,
      course: 'MS2111 KINDIN',
      class: 'K01',
      name: 'Tugas Besar',
      deadline: '2022-01-01',
      submission: 'Edunex',
    },
    {
      status: true,
      course: 'MS2111 KINDIN',
      class: 'K01',
      name: 'Tugas Besar',
      deadline: '2022-01-01',
      submission: 'Edunex',
    },
  ];
  return (
    <>
      <Header title='Assignments' />
      <Table className='text-sm md:text-base text-center'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-center'>Course</TableHead>
            <TableHead className='text-center'>Name</TableHead>
            <TableHead className='text-center'>Deadline</TableHead>
            <TableHead className='text-center'>Submission</TableHead>
            <TableHead className='text-center'>Class</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  id={item.name + item.course}
                  checked={item.status}
                />
              </TableCell>
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.deadline}</TableCell>
              <TableCell>{item.submission}</TableCell>
              <TableCell>{item.class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export const metadata = {
  title: 'Assignments',
};

export default AssingmentPage;
