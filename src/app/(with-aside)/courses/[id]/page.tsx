import { Skeleton } from '@/components/ui/skeleton';
import YoutubeEmbed from '@/components/client/youtubeEmbed';
import Link from 'next/link';
import { cache, Suspense } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import VideoList from '@/components/client/pages/courses/videoList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { verifySession } from '@/lib/session';
import { env } from '@/env';
import Lesson from './lesson';
import type { CourseLessonModel, CourseLessonVideoModel } from 'lms-types';

const getVideoData = cache(async (videoId: string) => {
  'use server';
  const res = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { cache: 'force-cache' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch video data');
  }

  return res.json();
});

const getLessons = cache(async (id: string) => {
  'use server';
  if (!id) {
    return null;
  }

  const session = await verifySession();

  if (!session.isAuth) {
    throw new Error('Unauthorized');
  }

  try {
    const res = await fetch(env.API_URL + `/courses/${id}/lessons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch lessons');
    }

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error('Failed to fetch lessons');
  }
});

const getVideos = cache(
  async (courseId: string | number, lessonId: string | number) => {
    'use server';
    const session = await verifySession();

    const res = await fetch(
      env.API_URL + `/courses/${courseId}/lessons/${lessonId}/videos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
        },
      }
    );

    console.log(res, courseId, lessonId);

    if (!res.ok) {
      throw new Error('Failed to fetch videos');
    }

    const { data } = await res.json();

    return data;
  }
);

export default async function CoursesPage({
  searchParams,
  params: { id },
}: {
  searchParams: Record<string, string>;
  params: { id: string };
}) {
  const isExpanded = searchParams['expanded'] === 'true';
  const lessons: CourseLessonModel[] = await getLessons(id);
  const lessonId = searchParams['lessonId'] ?? lessons[0].id;
  const videos: CourseLessonVideoModel[] = await getVideos(id, lessonId);
  const videoIds = videos.map((video => video.youtubeLink.split('v=')[1].split('&')[0]));

  const materials = await Promise.all(
    videoIds.map(async (videoId) => {
      const { title, thumbnail_url, author_name } = await getVideoData(videoId);
      return { videoId, title, thumbnail_url, author_name };
    })
  );

  const query = searchParams['q'] || materials[0].videoId;
  const title = materials.find(({ videoId }) => videoId === query)?.title;
  const author = materials.find(
    ({ videoId }) => videoId === query
  )?.author_name;
  const params = `?q=${query}&expanded=${isExpanded}`;

  const Description = () => (
    <div className='bg-slate-200 rounded-md p-1.5 h-full flex flex-col gap-3'>
      <div className=''>
        <h4 className='text-sm md:text-base'>Ebook Link:</h4>
        <Link
          href='/ebook'
          className='text-xs md:text-sm text-blue-500 underline hover:text-blue-700'
        >
          {videos.find(({ youtubeLink }) => youtubeLink.split('v=')[1].split('&')[0] === query).attachment}
        </Link>
      </div>
      <div className='text-justify'>
        <h4 className='text-sm md:text-base'>Summary:</h4>
        <p className='text-xs md:text-sm'>
          {videos.find(({ youtubeLink }) => youtubeLink.split('v=')[1].split('&')[0] === query)?.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className='flex gap-6'>
      <Lesson
        lessonId={lessonId}
        params={params}
        lessons={lessons}
      />
      <ScrollArea className='w-full bg-white shadow-md rounded-xl md:relative border-t-0 md:h-[calc(100vh-4rem)]'>
        <Suspense
          fallback={<Skeleton className='w-full aspect-video rounded-xl' />}
        >
          <YoutubeEmbed
            embedId={query}
            title={title}
            className='rounded-t-xl rounded-b-sm md:rounded-xl'
          />
        </Suspense>
        <div className='px-3 pb-4 md:hidden'>
          <Accordion
            type='single'
            collapsible
          >
            <AccordionItem value='desc'>
              <AccordionTrigger className='py-2 text-sm flex justify-between font-normal text-black group/ancestor'>
                <div className={`text-left group/parent`}>
                  <p>{title}</p>
                  <p className='text-muted-foreground text-3xs group-data-[state=open]/ancestor:hidden'>
                    author: {author}{' '}
                    <span className='ml-2 text-black'>...more</span>
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Description />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <VideoList
            materials={materials}
            isExpanded={isExpanded}
            query={query}
          />
        </div>
        <div className='px-4 py-4 space-y-4 h-full hidden md:block'>
          <h4 className='text font-semibold'>{title}</h4>
          <Description />
        </div>
      </ScrollArea>
      <ScrollArea className='hidden md:block w-[450px] relative h-[calc(100vh-4rem)]'>
        <p className='pb-4 sticky top-0 z-[2] bg-background'>All Videos</p>
        <VideoList
          materials={materials}
          isExpanded={true}
          query={query}
        />
      </ScrollArea>
    </div>
  );
}
