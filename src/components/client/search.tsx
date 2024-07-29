'use client';

import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

export type SearchProps = {
  query?: string;
  setQuery?: (query: string) => void;
} & HTMLAttributes<HTMLInputElement>;

const Search = ({ className, query, setQuery, ...props }: SearchProps) => {
  return (
    <div className='relative flex items-center'>
      <input
        type='text'
        value={query}
        className={cn(
          'md:pl-10 pl-8 pr-6 rounded-full text-navy bg-white py-1.5 text-sm md:text-base placeholder:text-sm outline-navy shadow',
          className
        )}
        onChange={(e) => setQuery?.(e.target.value)}
        placeholder='Search here...'
        {...props}
      />
      <div className='absolute left-2 md:left-3'>
        <FiSearch className='w-4 h-4 md:w-5' />
      </div>
    </div>
  );
};

export default Search;
