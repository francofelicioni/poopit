import Link from "next/link"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { QuickLogButton } from "@/components/quick-log/quick-log-button"

interface AppHeaderProps {
  showLogo?: boolean
}

export function AppHeader({ showLogo = true }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {showLogo && (
          <Link href="/" className="flex items-center gap-2">
            <EmojiIcon emoji="🚽" label="toilet" size="lg" />
            <h1 className="text-xl font-bold text-primary">PoopIt</h1>
          </Link>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <QuickLogButton />
          <Link href="/log-visit">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Log Visit
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
