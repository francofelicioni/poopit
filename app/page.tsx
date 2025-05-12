import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BarChart3, Award, Utensils } from "lucide-react"
import { AppHeader } from "@/components/layout/app-header"
import { AppContainer } from "@/components/layout/app-container"
import { AppFooter } from "@/components/layout/app-footer"
import { QuickLogFloatingButton } from "@/components/quick-log/quick-log-floating-button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader showLogo />

      <main className="flex-1">
        <AppContainer>
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Track Your Bathroom Habits</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your digestive health, discover food correlations, and gain valuable insights.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/log-visit">
                <Button size="lg" className="gap-2">
                  <span>Log a Visit</span>
                </Button>
              </Link>
              <Link href="/stats">
                <Button size="lg" variant="outline" className="gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>View Stats</span>
                </Button>
              </Link>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/calendar" className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Activity Calendar
                  </CardTitle>
                  <CardDescription>View your logs by date</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track your bathroom visits over time with our easy-to-use calendar view.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="justify-start w-fit">
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/food-stats" className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    Food & Poop Stats
                  </CardTitle>
                  <CardDescription>Discover food correlations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See how your diet affects your digestive health with detailed food correlations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="justify-start w-fit">
                    View Food Stats
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/badges" className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Badges & Achievements
                  </CardTitle>
                  <CardDescription>Earn rewards for tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Collect fun badges and achievements as you track your bathroom habits.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="justify-start w-fit">
                    View Badges
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </section>
        </AppContainer>
      </main>

      <AppFooter />
      <QuickLogFloatingButton />
    </div>
  )
}
