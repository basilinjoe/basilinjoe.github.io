"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-2 group-[.toaster]:rounded-none group-[.toaster]:border-foreground group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:shadow-brutal",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:rounded-none group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:bg-accent-hot group-[.toast]:text-accent-hot-foreground",
          cancelButton:
            "group-[.toast]:rounded-none group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:bg-background group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
