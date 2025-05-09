import { EmojiIcon } from "@/components/ui/emoji-icon"

export function AppFooter() {
  return (
    <footer className="border-t bg-card/80 backdrop-blur-sm px-4 py-3 text-center text-sm text-muted-foreground">
      PoopIt - Making digestive health tracking fun since 2025 <EmojiIcon emoji="💩" label="poop" size="xs" />
    </footer>
  )
}
