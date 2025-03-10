import React from 'react'
import { cn } from '@/lib/utils'

interface MarkdownContentProps {
  children: React.ReactNode
  className?: string
}

export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown', className)}>
      {children}
    </div>
  )
}