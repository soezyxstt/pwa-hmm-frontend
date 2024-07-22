import Search from '@/components/client/search';
import Header from '@/components/client/header';
import CoursesItem from '@/components/client/pages/courses/item';
import { courses as courses_action} from '@/actions/courses-action';

const items: { id: number; title: string }[] = [
  { id: 0, title: 'Analisis Numerik' },
  { id: 1, title: 'Dinamika Sistem' },
  { id: 2, title: 'Mekatronika' },
  { id: 3, title: 'Sistem Penggerak Elektrik' },
  { id: 4, title: 'Statistika Turu' },
  { id: 5, title: 'Elemen Mesin Dasar' },
];

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
      <div className='grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 md:gap-x-8 lg:gap-x-10 md:gap-y-10 flex-1 grid-rows-2 mt-5'>
        {courses
          .map((course: {title: string, image: string, material: string, totalVideos: number, totalLessons: number}, i: number) => (
            <CoursesItem
              href=''
              key={i}
              id='13212312'
              title={course.title}
              image='/images/store.png'
              subject='MS2111'
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
