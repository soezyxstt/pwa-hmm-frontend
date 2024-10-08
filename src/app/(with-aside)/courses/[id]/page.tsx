import {Skeleton} from '@/components/ui/skeleton';
import YoutubeEmbed from '@/components/client/youtubeEmbed';
import Link from 'next/link';
import {Suspense} from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import VideoList from '@/app/(with-aside)/courses/[id]/videoList';
import {ScrollArea} from '@/components/ui/scroll-area';
import Lesson from './lesson';
import {getLessons, getVideoData, getVideos} from '@/_actions/courses-action';

export default async function CoursesPage({
                                            searchParams,
                                            params: {id},
                                          }: {
  searchParams: Record<string, string>;
  params: { id: string };
}) {
  const isExpanded = searchParams['expanded'] === 'true';
  const lessons = await getLessons(id);
  const lessonId = searchParams['lessonId'] ?? lessons[0].id;
  const videos = await getVideos(id, lessonId);
  const youtubeLinks = [
    "https://youtu.be/zcZZxzkLwOc?si=6hOD1tuEH-tg6X4Z",
    "https://youtu.be/0YDh5cpz_os?si=cs8srW_978VQy4-H",
    "https://youtu.be/6-shbSFc48E?si=-gNxSL-IxMrQr-yL",
    "https://youtu.be/wwSzpaTHyS8?si=juXUNc_KKxRa15CH",
    "https://youtu.be/_5ehRI8epI0?si=mtTji0iWv0XB6Mtw",
    "https://youtu.be/Sqr-PdVYhY4?si=qTO1QjoSZEnS0_9B",
    "https://youtu.be/mSoEjBpJUJ0?si=dHtgMwNOQFVKRAFt",
    "https://youtu.be/MIz-4WTeDnw?si=KiLnwfyVICXwRRBQ",
    "https://youtu.be/Gojd8mTl3Do?si=JCVXwtg0-3xq72vj",
    "https://youtu.be/rP5aJEq0k7s?si=NWUj9Qgz4Cj7pYO4",
    "https://youtu.be/cPuOGUxVnX4?si=WkSuBSgg1CNS4RBk",
    "https://youtu.be/8wMKw4m6-Rc?si=4VImG4-AzqAhQt8p",
    "https://youtu.be/88XxC0_zs74?si=-xU4ATrwTV5Nw2TC",
    "https://youtu.be/6W8FCW2rWNQ?si=Fv_yVm_7AswGC2jX"];
  // const videoIds = videos.map(video => video.youtubeLink.split('v=')[1].split('&')[0]);
  const videoIds = videos.map((_, index) => youtubeLinks[index % youtubeLinks.length].split('.be/')[1].split('?')[0]);

  const materials = await Promise.all(
    videoIds.map(async (videoId) => {
      const {title, thumbnail_url, author_name} = await getVideoData(videoId);
      return {videoId, title, thumbnail_url, author_name};
    })
  );

  const query = searchParams['q'] || materials[0].videoId;
  const title = materials.find(({videoId}) => videoId === query)?.title;
  const author = materials.find(
    ({videoId}) => videoId === query
  )?.author_name;
  const params = `?expanded=${isExpanded}`;

  const Description = () => (
    <div className='bg-slate-200 rounded-md p-1.5 h-full flex flex-col gap-3'>
      <div className=''>
        <h4 className='text-sm md:text-base'>Ebook Link:</h4>
        <Link
          href='https://www.google.com'
          target='_blank'
          className='text-xs md:text-sm text-blue-500 underline hover:text-blue-700'
        >
          {"Click here to download the ebook"}
        </Link>
      </div>
      <div className='text-justify'>
        <h4 className='text-sm md:text-base'>Summary:</h4>
        <p className='text-xs md:text-sm'>
          {videos.find(({youtubeLink}) => youtubeLink.split('v=')[1].split('&')[0] === query)?.description}
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
          fallback={<Skeleton className='w-full aspect-video rounded-xl'/>}
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
                <Description/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <VideoList
            materials={materials}
            isExpanded={isExpanded}
            query={query}
            lessonId={lessonId}
          />
        </div>
        <div className='px-4 py-4 space-y-4 h-full hidden md:block'>
          <h4 className='text font-semibold'>{title}</h4>
          <Description/>
        </div>
      </ScrollArea>
      <ScrollArea className='hidden md:block w-[450px] relative h-[calc(100vh-4rem)]'>
        <p className='pb-4 sticky top-0 z-[2] bg-background'>All Videos</p>
        <VideoList
          materials={materials}
          isExpanded={true}
          query={query}
          lessonId={lessonId}
        />
      </ScrollArea>
    </div>
  );
}
