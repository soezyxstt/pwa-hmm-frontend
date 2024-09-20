import type {HTMLAttributes, ReactNode} from "react";
import {cn} from "@/lib/utils";

function GradientText({children, className, ...props}: { children: ReactNode } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('bg-gradient-to-r from-white to-kuning bg-clip-text box-decoration-clone shadow-none font-bold text-transparent',
        className)} {...props}>
      {children}
    </p>
  );
}

export default GradientText;