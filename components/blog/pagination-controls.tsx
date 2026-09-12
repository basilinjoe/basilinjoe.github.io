"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

export default function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page === currentPage) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  return (
    <motion.nav
      aria-label="Pagination"
      variants={fadeInUp}
      className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-6"
    >
      <span className="font-mono text-micro font-bold uppercase tracking-widest text-muted-foreground">
        Page {String(currentPage).padStart(2, "0")} /{" "}
        {String(totalPages).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-2">
        <PageBtn
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          label="Prev"
          arrow="left"
        />

        <div className="flex gap-1.5">
          {[...Array(totalPages)].map((_, i) => {
            const p = i + 1
            const isCurrent = currentPage === p
            const showOnMobile =
              p === currentPage ||
              p === currentPage - 1 ||
              p === currentPage + 1 ||
              p === 1 ||
              p === totalPages
            return (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={cn(
                  "h-9 min-w-9 border-2 border-foreground px-2 font-mono text-sm font-bold uppercase tracking-widest transition-all",
                  isCurrent
                    ? "bg-foreground text-background shadow-brutal-sm"
                    : "bg-background text-foreground hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-accent-lime hover:text-accent-lime-foreground hover:shadow-brutal-sm",
                  !showOnMobile && "hidden sm:inline-flex"
                )}
              >
                {String(p).padStart(2, "0")}
              </button>
            )
          })}
        </div>

        <PageBtn
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          label="Next"
          arrow="right"
        />
      </div>
    </motion.nav>
  )
}

function PageBtn({
  disabled,
  onClick,
  label,
  arrow,
}: {
  disabled: boolean
  onClick: () => void
  label: string
  arrow: "left" | "right"
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 border-2 border-foreground bg-background px-3 font-mono text-micro font-bold uppercase tracking-widest transition-all",
        disabled
          ? "opacity-40"
          : "hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-foreground hover:text-background hover:shadow-brutal-sm"
      )}
    >
      {arrow === "left" && <span aria-hidden>←</span>}
      <span className="hidden sm:inline">{label}</span>
      {arrow === "right" && <span aria-hidden>→</span>}
    </button>
  )
}
