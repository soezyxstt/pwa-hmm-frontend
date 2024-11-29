'use client';

import CustomLink from '@/components/admin/custom-link';
import CoursesTable from './table';
import Search from '@/components/client/search';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { $CourseAPI } from 'lms-types';

export default function CourseSection({ 
  data 
}: { 
  data: $CourseAPI.GetCourses.Response['data']
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);

  const filteredData = data.filter((course) =>
    course.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    course.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    course.status.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <Search
          query={searchQuery}
          setQuery={setSearchQuery}
          className="w-full md:w-[300px]"
        />
        <CustomLink href={'courses/add'}>Add Course</CustomLink>
      </div>
      {filteredData.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          No courses found
        </div>
      ) : (
        <CoursesTable data={filteredData} />
      )}
    </>
  );
} 