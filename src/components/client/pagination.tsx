'use client';

import type {Dispatch, HTMLAttributes, SetStateAction} from 'react';
import Icon from '../ui/button/icon';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import {cn} from '@/lib/utils';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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
        icon={<FiChevronLeft/>}
        className={cn(
          'text-navy',
          page === 1 && 'text-gray-300 cursor-not-allowed'
        )}
        onClick={() => {
          if (page == 1) return null;
          setPage(page - 1);
        }}
      />
      <Select value={page.toString()} onValueChange={(v) => setPage(Number(v))}>
        <SelectTrigger className="border border-navy w-16">
          <SelectValue defaultValue={"1"}/>
        </SelectTrigger>
        <SelectContent className="border border-navy ">
          <SelectGroup className="">
            {Array.from({length: totalPage}).map((_, index) => (
              <SelectItem key={'pagination-assignment-admin-' + index}
                          value={(index + 1).toString()}
                          className="">{index + 1}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Icon
        icon={<FiChevronRight/>}
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
