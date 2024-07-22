import { cn } from '@/lib/utils';

export default function BurgerX({ bg }: { bg?: string }) {
  return (
    <div className='flex flex-col gap-[5px] *:transition-all group/parent *:rounded-full w-[19px] overflow-hidden mx-0.5'>
      <div
        className={cn(
          'h-[3px] w-[19px] group-data-[state=open]/drawer:translate-y-[8px] group-data-[state=open]/drawer:rotate-45 bg-navy group-data-[state=open]/drawer:w-[22px]',
          bg && bg
        )}
      ></div>
      <div
        className={cn(
          'h-[3px] w-[19px] bg-navy group-data-[state=open]/drawer:translate-x-6  group-data-[state=open]/drawer:opacity-0',
          bg && bg
        )}
      ></div>
      <div
        className={cn(
          'h-[3px] w-[19px] group-data-[state=open]/drawer:translate-y-[-8px] group-data-[state=open]/drawer:-rotate-45 bg-navy group-data-[state=open]/drawer:w-[22px]',
          bg && bg
        )}
      ></div>
    </div>
  );
}
