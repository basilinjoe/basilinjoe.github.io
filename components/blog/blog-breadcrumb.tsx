"use client"

import { motion } from "framer-motion"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { fadeInUp } from "@/lib/animations"

interface BlogBreadcrumbProps {
  postTitle?: string
  tag?: string
}

export function BlogBreadcrumb({ postTitle, tag }: BlogBreadcrumbProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="mb-6"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          <BreadcrumbItem>
            {postTitle ? (
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Blog</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          
          {tag && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">{tag}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          
          {postTitle && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[200px] truncate">
                  {postTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  )
}