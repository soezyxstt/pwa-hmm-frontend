'use client';

import type { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import Icon from '../ui/button/icon';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const Pagination = ({
  page,
  setPage,
  totalPage,
  className,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex self-end items-center gap-1.5', className)}>
      <Icon
        icon={<FiChevronLeft />}
        className={cn(
          'text-navy',
          page === 1 && 'text-gray-300 cursor-not-allowed'
        )}
        onClick={() => {
          if (page == 1) return null;
          setPage(page - 1);
        }}
      />
      {page > 3 && (
        <button
          onClick={() => setPage(1)}
          className={`rounded-full w-8 h-8 flex items-center justify-center border text-xs border-navy ${
            1 === page ? 'bg-navy text-white' : ' text-navy'
          }`}
        >
          {1}
        </button>
      )}
      {totalPage > 4 && page >= totalPage - 2 && <span>...</span>}
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((i) => {
        if (i < page - 1) {
          if (page === totalPage) {
            if (i < totalPage - 2) return null;
          } else {
            return null;
          }
        } else if (i > page + 1) {
          if (page === 1) {
            if (i > 3) return null;
          } else {
            return null;
          }
        }
        return (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`rounded-full w-8 h-8 flex items-center justify-center border text-xs border-navy ${
              i === page ? 'bg-navy text-white' : ' text-navy'
            }`}
          >
            {i}
          </button>
        );
      })}
      {totalPage > 4 && page < totalPage - 2 && <span>...</span>}
      {totalPage > 3 && page < totalPage - 2 && (
        <button
          onClick={() => setPage(totalPage)}
          className={`rounded-full w-8 h-8 flex items-center justify-center border text-xs border-navy ${
            totalPage === page ? 'bg-navy text-white' : ' text-navy'
          }`}
        >
          {totalPage}
        </button>
      )}
      <Icon
        icon={<FiChevronRight />}
        className={cn(
          'text-navy',
          page === totalPage && 'text-gray-300 cursor-not-allowed'
        )}
        onClick={() => {
          if (page == totalPage) return null;
          setPage(page + 1);
        }}
      />
    </div>
  );
};

export default Pagination;
