import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from '../../lib/utils';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-slate-100 dark:tw-bg-slate-800",
      className
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className="tw-h-full tw-w-full tw-flex-1 tw-bg-slate-900 tw-transition-all dark:tw-bg-slate-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export default Progress;
