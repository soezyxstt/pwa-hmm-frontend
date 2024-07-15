import { cn } from '@/lib/utils';

export default function BurgerX({ isExpanded, bg }: { isExpanded: boolean; bg?: string }) {
  return (
    <div className='flex flex-col gap-[5.5px] *:transition-all'>
      <div
        className={cn(
          isExpanded
            ? 'h-[3px] w-[25px] translate-y-[8.5px] rotate-45 bg-white'
            : 'h-[3px] w-[22px] bg-white',
          bg && bg
        )}
      ></div>
      <div
        className={cn(
          isExpanded
            ? 'h-[3px] w-[22px] translate-x-6 bg-white opacity-0'
            : 'h-[3px] w-[22px] bg-white',
          bg && bg
        )}
      ></div>
      <div
        className={cn(
          isExpanded
            ? 'h-[3px] w-[25px] translate-y-[-8.5px] -rotate-45 bg-white'
            : 'h-[3px] w-[22px] bg-white',
          bg && bg
        )}
      ></div>
    </div>
  );
}
