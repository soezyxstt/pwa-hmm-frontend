import Search from '@/components/client/search';
import Header from '@/components/client/header';
import CoursesItem from '@/components/client/pages/courses/item';

const items: { id: number; title: string }[] = [
  { id: 0, title: 'Analisis Numerik' },
  { id: 1, title: 'Dinamika Sistem' },
  { id: 2, title: 'Mekatronika' },
  { id: 3, title: 'Sistem Penggerak Elektrik' },
  { id: 4, title: 'Statistika Turu' },
  { id: 5, title: 'Elemen Mesin Dasar' },
];

const CoursesPage = () => {
  return (
    <div className='w-full h-full'>
      <Header
        title='Courses'
        className='md:mb-5'
      />
      <Search />
      <div className='grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-8 flex-1 grid-rows-2 mt-5'>
        {Array(6)
          .fill(1)
          .map((_, i) => (
            <CoursesItem
              href=''
              key={i}
              id='13212312'
              title='Analisis Numerik'
              image='/images/berita.png'
              subject='MS2111'
              numberOfMaterials={10}
              numberOfVideos={5}
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
