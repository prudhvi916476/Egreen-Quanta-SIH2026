import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  indicatorClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({ 
  value, 
  className, 
  indicatorClassName, 
  showLabel = false,
  ...props 
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={cn("w-full flex items-center gap-3", className)} {...props}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
        <div
          className={cn(
            "h-full bg-[var(--brand-primary)] transition-all duration-500 ease-out",
            indicatorClassName
          )}
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-label text-[var(--text-secondary)] min-w-[3ch] text-right">
          {Math.round(safeValue)}%
        </span>
      )}
    </div>
  )
}
