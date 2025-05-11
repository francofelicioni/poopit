import Link from "next/link"

export function AppFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">© 2025 PoopIt. All rights reserved.</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/calendar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Calendar
          </Link>
          <Link href="/food-stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Food Stats
          </Link>
          <Link href="/badges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Badges
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/supabase-test" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Database
          </Link>
        </nav>
      </div>
    </footer>
  )
}
