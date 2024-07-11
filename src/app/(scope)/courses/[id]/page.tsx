import CourseDrawer from '@/components/pages/courses/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import YoutubeEmbed from '@/components/youtubeEmbed';
import Link from 'next/link';
import { Suspense } from 'react';

export default function CoursesPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = searchParams['q'] || '';
  const materials = [
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
    'Chapter 4',
    'Chapter 5',
    'Chapter 6',
    'Chapter 7',
    'Chapter 8',
    'Chapter 9',
    'Chapter 10',
  ];
  return (
    <div className='space-y-6'>
      <div className='flex justify-end'>
        <CourseDrawer
          materials={materials}
          query={query}
        />
      </div>
      <div className='w-full border-2 border-navy rounded-xl border-t-0'>
        <Suspense
          fallback={<Skeleton className='w-full aspect-video rounded-xl' />}
        >
          <YoutubeEmbed
            embedId='dQw4w9WgXcQ'
            title='Rick Astley - Never Gonna Give You Up'
          />
        </Suspense>
        <div className='space-y-4 px-4 py-6'>
          <div className=''>
            <h3 className=''>Ebook Link:</h3>
            <Link
              href='/ebook'
              className='text-blue-500 underline text-sm hover:text-blue-700'
            >
              {query}
            </Link>
          </div>
          <div className=''>
            <h3 className=''>Summary:</h3>
            <p className='text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Donec nec
              <strong> {query}</strong> velit. Nullam sit amet metus nec risus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
