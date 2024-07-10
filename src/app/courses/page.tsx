import Search from "@/components/search";
import Header from '@/components/header';

const items : {id: number, title: string}[] = [
  {id: 0, title: "Analisis Numerik"},
  {id: 1, title: "Dinamika Sistem"},
  {id: 2, title: "Mekatronika"},
  {id: 3, title: "Sistem Penggerak Elektrik"},
  {id: 4, title: "Statistika Turu"},
  {id: 5, title: "Elemen Mesin Dasar"},
]

const CoursesPage = () => {
  return (
    <div className="w-full h-full">
      <Header title='Courses' />
      <Search />
      
    </div>
    // <CourseContent />
  );
};

export const metadata = {
  title: 'Courses',
};

export default CoursesPage;
