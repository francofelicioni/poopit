import { CalendarView } from "@/components/calendar/calendar-view"
import { AppContainer } from "@/components/layout/app-container"
import { AppHeader } from "@/components/layout/app-header"
import { AppFooter } from "@/components/layout/app-footer"
import { SectionHeader } from "@/components/layout/section-header"

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader title="Activity Calendar" showBackButton />

      <main className="flex-1">
        <AppContainer>
          <SectionHeader
            title="Activity Calendar"
            description="View and track your bathroom visits by date"
            icon="📅"
          />

          <div className="mt-6">
            <CalendarView />
          </div>
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}
