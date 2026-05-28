import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/[0.12] text-primary",
        warning: "border-amber-400/30 bg-amber-400/10 text-amber-200",
        destructive: "border-red-400/30 bg-red-400/10 text-red-200",
        muted: "border-white/10 bg-white/5 text-muted-foreground",
        info: "border-sky-400/30 bg-sky-400/10 text-sky-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
