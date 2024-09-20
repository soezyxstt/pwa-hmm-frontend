'use client';

import {useRouter} from "next/navigation";
import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

function BackButton({className, children, ...props}: HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className={cn('transition', className)}
      {...props}
    >
      {children || "Back"}
    </button>
  );
}

export default BackButton;