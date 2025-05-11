"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { Badge } from "@/components/ui/badge"
import { Copy, Twitter, Facebook, Linkedin } from "lucide-react"
import type { BadgeData } from "./badge-card"
import { useState } from "react"

interface ShareBadgeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  badge: BadgeData
}

export function ShareBadgeDialog({ open, onOpenChange, badge }: ShareBadgeDialogProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `I just earned the "${badge.name}" badge on PoopIt! ${badge.description}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Badge</DialogTitle>
          <DialogDescription>Share your achievement with friends and family</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
            <EmojiIcon emoji={badge.emoji} label={badge.name} size="xl" />
          </div>

          <h3 className="text-xl font-bold">{badge.name}</h3>
          <p className="mt-1 text-center text-sm text-muted-foreground">{badge.description}</p>

          <Badge variant="outline" className="mt-2">
            {badge.requirement}
          </Badge>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span className="text-sm text-muted-foreground truncate">{shareText}</span>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && <p className="text-xs text-green-600">Copied to clipboard!</p>}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
