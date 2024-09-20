import React, { type HTMLAttributes} from 'react';
import Link, {type LinkProps} from "next/link";
import {cn} from "@/lib/utils";

function CustomLink({href, className, children, ...props}: HTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link href={href} className={cn('bg-navy hover:bg-navy/80 transition-all px-3 py-1.5 md:px-4 md:py-2 text-white w-fit rounded-lg', className)} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;