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

export default async function CoursesPage({
  searchParams,
  params: { id },
}: {
  searchParams: Record<string, string>;
  params: { id: string };
}) {
  const isExpanded = searchParams['expanded'] === 'true';
  const lessons = await getLessons(id);
  const lessonId = searchParams['lessonId'] ?? lessons[0].id;
  const videoIds = [
    '9bZkp7q19f0',
    'Gb58wGb_Uc4',
    'kffacxfA7G4',
    'CevxZvSJLk8',
    'TWfph3iNC-k',
    'Zs2IpqHzchw',
    'FF50H2RWaEY',
    'Ks-_Mh1QhMc',
    'J---aiyznGQ',
    'dQw4w9WgXcQ',
    'o_l4Ab5FRwM',
  ];

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
          {query}
        </Link>
      </div>
      <div className='text-justify'>
        <h4 className='text-sm md:text-base'>Summary:</h4>
        <p className='text-xs md:text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Donec nec
          <strong> {title}</strong> velit. Nullam sit amet metus nec risus. In
          the tranquil shade of the ancient oak tree, she found solace amidst
          the gentle rustling of leaves in the breeze. The sunlight filtered
          through the canopy above, casting dappled patterns on the soft moss
          below. It was a moment of quiet reflection, where time seemed to slow
          and thoughts drifted like wisps of cloud across a clear blue sky. The
          world around her hummed with the symphony of nature — the distant call
          of a songbird, the faint rustle of small creatures in the underbrush.
          Here, in this hidden sanctuary, she felt a deep sense of peace, as if
          the secrets of the forest whispered their ancient wisdom to her soul.
        </p>
        <p className='text-xs md:text-sm'>
          The city streets bustled with the energy of a thousand stories
          unfolding simultaneously. Neon lights flickered overhead, painting the
          pavement with a kaleidoscope of colors. Pedestrians hurried along,
          their footsteps echoing against the concrete, each person lost in
          their own world of thoughts and ambitions. Cars hummed past, their
          headlights cutting through the evening dusk. Above it all, the skyline
          glittered with towering skyscrapers that seemed to reach for the
          stars, a testament to human ingenuity and ambition. In this urban
          labyrinth, amidst the cacophony of life, every corner held a promise
          of adventure, every alleyway whispered secrets waiting to be
          discovered.
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
