import { AppContainer } from "@/components/layout/app-container"
import { AppHeader } from "@/components/layout/app-header"
import { AppFooter } from "@/components/layout/app-footer"
import { SupabaseTest } from "@/components/supabase-test"
import { SectionHeader } from "@/components/layout/section-header"

export default function SupabaseTestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader showLogo />

      <main className="flex-1">
        <AppContainer>
          <SectionHeader
            title="Supabase Integration Test"
            description="Testing the connection to our Supabase database"
          />

          <div className="mt-6">
            <SupabaseTest />
          </div>
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}
