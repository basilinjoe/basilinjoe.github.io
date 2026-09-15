"use client"

import { 
  TwitterIcon, 
  LinkedinIcon, 
  FacebookIcon, 
  LinkIcon,
  Share2,
  CheckIcon,
  AlertCircleIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SocialShareProps {
  title: string
  url: string
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  
  const shareLinks = [
    {
      name: "Twitter",
      icon: <TwitterIcon className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      // X brands as black-on-white / white-on-black. The legacy #1DA1F2 blue
      // measured 2.83:1 against white text and failed WCAG AA.
      color: "bg-foreground text-background hover:bg-accent-hot hover:text-accent-hot-foreground",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="h-4 w-4" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-[#0077B5] text-white hover:bg-[#005885]", // 4.88:1 / 7.68:1
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#3b5998] text-white hover:bg-[#2d4373]", // 6.84:1 / 9.71:1
    }
  ]
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopyStatus('success')
      setTimeout(() => setCopyStatus('idle'), 2000)
    } catch (err) {
      setCopyStatus('error')
      setTimeout(() => setCopyStatus('idle'), 2000)
    }
  }
  
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium flex items-center gap-2">
        <Share2 className="h-4 w-4" /> Share this article
      </p>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a 
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 border-2 border-foreground px-3 py-2 font-mono text-micro font-bold uppercase tracking-widest shadow-brutal-sm transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-brutal ${link.color}`}
          >
            {link.icon}
            {link.name}
          </a>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs font-medium inline-flex items-center gap-2"
          onClick={copyLink}
        >
          {copyStatus === 'idle' && (
            <>
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </>
          )}
          {copyStatus === 'success' && (
            <>
              <CheckIcon className="h-4 w-4 text-success" />
              Copied!
            </>
          )}
          {copyStatus === 'error' && (
            <>
              <AlertCircleIcon className="h-4 w-4 text-destructive" />
              Failed to copy
            </>
          )}
        </Button>
      </div>
    </div>
  )
}