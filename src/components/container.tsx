
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("container mx-auto px-4 md:px-6 max-w-screen-xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
