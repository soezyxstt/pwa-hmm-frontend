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
          'pl-10 pr-2 rounded-full text-navy bg-white py-2 placeholder:text-sm outline-navy shadow',
          className
        )}
        onChange={(e) => setQuery?.(e.target.value)}
        placeholder='Search here...'
        {...props}
      />
      <div className='absolute left-3'>
        <FiSearch />
      </div>
    </div>
  );
};

export default Search;
