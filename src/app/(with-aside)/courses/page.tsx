import Search from '@/components/client/search';
import Header from '@/components/client/header';
import CoursesItem from '@/components/client/pages/courses/item';
import { courses as courses_action } from '@/actions/courses-action';

export const dynamic = 'force-dynamic';

const CoursesPage = async () => {
  const courses = await courses_action();
  // console.log(courses);
  return (
    <div className='w-full h-full'>
      <Header
        title='Courses'
        className='md:mb-5'
      />
      <Search />
      <div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 md:gap-x-8 lg:gap-x-10 md:gap-y-10 flex-1 grid-rows-2 mt-5'>
        {courses.map(({ course }: any, i: number) => (
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
    // <CourseContent />
  );
};

export const metadata = {
  title: 'Courses',
};

export default CoursesPage;
