"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { PoopMascot } from "@/components/mascot/poop-mascot"
import { Copy, Facebook, Twitter, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { BadgeData } from "./badge-card"

interface ShareBadgeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  badge: BadgeData
}

export function ShareBadgeDialog({ open, onOpenChange, badge }: ShareBadgeDialogProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const shareText = `I just earned the "${badge.name}" badge on PoopIt! ${badge.description} #PoopIt #DigestionGoals`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Share text has been copied to your clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    let url = ""
    const encodedText = encodeURIComponent(shareText)

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=https://poopit.app&quote=${encodedText}`
        break
      default:
        return
    }

    window.open(url, "_blank", "width=600,height=400")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EmojiIcon emoji={badge.emoji} label={badge.name} size="md" />
            Share "{badge.name}" Badge
          </DialogTitle>
          <DialogDescription>
            Let your friends know about your digestive achievements! Don't worry, we'll keep it anonymous.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-4">
          <div className="relative bg-primary/5 rounded-lg p-6 max-w-xs text-center">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <PoopMascot mood="proud" size="md" />
            </div>
            <div className="mt-8">
              <EmojiIcon emoji={badge.emoji} label={badge.name} size="xl" withBackground />
              <h3 className="mt-2 font-bold text-lg">{badge.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-3">
          <p className="text-sm">{shareText}</p>
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy Text"}
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1 bg-[#1DA1F2] hover:bg-[#1a94df]" onClick={() => handleShare("twitter")}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button className="flex-1 bg-[#4267B2] hover:bg-[#3b5998]" onClick={() => handleShare("facebook")}>
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            <LinkIcon className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
