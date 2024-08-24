'use client';

import React, {useState} from 'react';
import {TableBody, TableCell, TableHead, TableHeader, TableRow, Table} from "@/components/ui/table";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Ellipsis} from "lucide-react";
import Pagination from "@/components/client/pagination";
import {$UserAPI} from "lms-types";

function AssignmentTable({data}: { data: $UserAPI.GetUserAssignments.Response["data"] }) {
  const [page, setPage] = useState(1)
  const assignmentPerPage = 6
  const totalPage = Math.ceil(data.length / assignmentPerPage)
  return (
    <div className='rounded-xl shadow-md w-full bg-white flex-1 p-4 flex flex-col justify-between'>
      <Table className='*:*:*:text-xs md:*:*:*:text-sm'>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
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
                <TableCell className=''>{assignment.id}</TableCell>
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
    </div>
  );
}

export default AssignmentTable;