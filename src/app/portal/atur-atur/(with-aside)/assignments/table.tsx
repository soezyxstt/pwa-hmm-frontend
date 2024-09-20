'use client';

import React, {useState} from 'react';
import {TableBody, TableCell, TableHead, TableHeader, TableRow, Table} from "@/components/ui/table";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Ellipsis} from "lucide-react";
import Pagination from "@/components/client/pagination";
import {$UserAPI} from "lms-types";
import Wrapper from "@/app/portal/atur-atur/wrapper";

function AssignmentTable({data}: { data: $UserAPI.GetUserAssignments.Response["data"] }) {
  const [page, setPage] = useState(1)
  const assignmentPerPage = 6
  const totalPage = Math.ceil(data.length / assignmentPerPage)
  return (
    <Wrapper>
      <Table className='table-admin'>
        <TableHeader>
          <TableRow>
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
          {data.map(({type, assignment}, index) => {
            if (index < (page - 1) * assignmentPerPage || index >= page * assignmentPerPage) return null

            return (
              <TableRow key={assignment.id}>
                <TableCell>{type === "personal" ? "Personal" : assignment.class.title}</TableCell>
                <TableCell>{assignment.title}</TableCell>
                <TableCell
                  className='whitespace-nowrap text-nowrap'>{(new Date(assignment.deadline)).toDateString()}</TableCell>
                <TableCell>{assignment.submission}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis size={20}/>
                    </PopoverTrigger>
                    <PopoverContent align='end' className='w-40 border-navy border p-1'>
                      <div className='flex flex-col text-sm *:text-left *:font-medium'>
                        <h3 className='font-bold text-sm p-2'>Action</h3>
                        <button className='hover:bg-navy/40 p-2 rounded-md transition'>Edit</button>
                        <button className='hover:bg-navy/40 p-2 rounded-md transition'>Delete</button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
    </Wrapper>
  );
}

export default AssignmentTable;