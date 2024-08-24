import Search from '@/components/client/search';
import CoursesItem from '@/app/(with-aside)/courses/item';
import { getEnrolledCourses as courses_action } from '@/actions/courses-action';

export const dynamic = 'force-dynamic';

const CoursesPage = async () => {
  const courses = await courses_action();

  return (
    <div className='w-full h-full'>
      <Search />
      {courses.length === 0 && (
          <p className='text-muted-foreground text-center w-full font-medium py-6'>No courses available</p>
      )}
      <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-6 md:gap-x-8 lg:gap-x-10 md:gap-y-10 flex-1 grid-rows-2 mt-5'>
        {courses.map((course, i: number) => (
          <CoursesItem
            href=''
            key={i}
            id={course.id}
            title={course.title}
            image='/images/store.png'
            subject={'MS2021'}
            numberOfMaterials={course.totalLessons}
            numberOfVideos={course.totalVideos}
          />
        ))}
      </div>
    </div>
  );
};

export const metadata = {
  title: 'Courses',
};

export default CoursesPage;
