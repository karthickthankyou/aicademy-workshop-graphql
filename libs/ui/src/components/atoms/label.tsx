'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../util'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { error?: string; optional?: boolean }
>(({ className, children, title, error, optional = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    <div className="flex justify-between items-baseline">
      <div className="mb-2">{title}</div>
      {optional ? (
        <div className="text-xs text-gray-500">(Optional)</div>
      ) : null}
    </div>
    {children}
    {error ? (
      <div className="mt-1 mb-2 text-xs font-normal text-red-500">{error}</div>
    ) : null}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
