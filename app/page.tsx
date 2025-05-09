"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, PlusCircle, TrendingUp, Trophy } from "lucide-react"
import { RecentLogs } from "@/components/recent-logs"
import { StatsOverview } from "@/components/stats-overview"
import { MascotWithSpeech } from "@/components/mascot/mascot-with-speech"
import { EmojiIcon } from "@/components/ui/emoji-icon"
import { QuickLogButton } from "@/components/quick-log/quick-log-button"
import { RecentBadges } from "@/components/badges/recent-badges"
import { mockBadges } from "@/data/mock-badges"
import { useEffect, useState } from "react"
import type { BadgeData } from "@/components/badges/badge-card"
import { BadgeCard } from "@/components/badges/badge-card"
import { AppHeader } from "@/components/layout/app-header"
import { AppContainer } from "@/components/layout/app-container"
import { AppFooter } from "@/components/layout/app-footer"
import { motion } from "framer-motion"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

export default function Home() {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Check if this is the first visit
  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete")
    if (!onboardingComplete) {
      setShowOnboarding(true)
    }

    // Simulate loading badges
    setBadges(mockBadges)
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showOnboarding && <OnboardingFlow onComplete={handleOnboardingComplete} />}

      <AppHeader showLogo />

      <main className="flex-1">
        <AppContainer>
          <div className="mb-6">
            <MascotWithSpeech
              messages={[
                "Welcome back! Ready to log your latest bathroom adventure?",
                "Did you know? The average person spends about 1.5 years on the toilet in their lifetime!",
                "Tracking your bathroom habits can help identify digestive issues early.",
                "Stay regular, stay healthy! 💩",
              ]}
              interval={6000}
              size="md"
            />
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">
                <EmojiIcon emoji="🏠" label="home" className="mr-2" size="xs" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="stats">
                <EmojiIcon emoji="📊" label="stats" className="mr-2" size="xs" /> Stats
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <EmojiIcon emoji="🏆" label="trophy" className="mr-2" size="xs" /> Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to PoopIt!</CardTitle>
                  <CardDescription>
                    Track your bathroom visits and gain insights into your digestive health.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl bg-primary/10 p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <span className="font-medium">Today's Status</span>
                    </div>
                    <p className="mt-2">You've logged 1 visit today. Your last visit was 3 hours ago.</p>
                  </div>

                  <RecentLogs />
                </CardContent>
                <CardFooter className="flex gap-2">
                  <QuickLogButton />
                  <Link href="/log-visit" className="flex-1">
                    <Button className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Detailed Log
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Link href="/food-stats" className="block">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <EmojiIcon emoji="🍽️" label="food" size="sm" />
                            Food & Poop Stats
                          </CardTitle>
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <CardDescription>Discover how your diet affects your digestive health</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          See correlations between what you eat and your bathroom results 1-2 days later.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Food Correlations
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </Link>

                <Link href="/badges" className="block">
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <EmojiIcon emoji="🏆" label="trophy" size="sm" />
                            Badges & Achievements
                          </CardTitle>
                          <Trophy className="h-5 w-5 text-primary" />
                        </div>
                        <CardDescription>Collect badges by tracking your bathroom habits</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Unlock achievements like "The Regular", "Rainbow Master", and "Fiber Fanatic"!
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Your Badges
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </Link>
              </div>

              <RecentBadges badges={badges} />
            </TabsContent>

            <TabsContent value="stats" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Poop Stats</CardTitle>
                      <CardDescription>Insights into your bathroom habits and nutrition.</CardDescription>
                    </div>
                    <EmojiIcon emoji="💩" label="poop" size="lg" withBackground backgroundClass="bg-primary/10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <StatsOverview />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Badges & Achievements
                      </CardTitle>
                      <CardDescription>Collect badges by tracking your bathroom habits</CardDescription>
                    </div>
                    <Link href="/badges">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {badges
                      .filter((badge) => badge.unlocked)
                      .slice(0, 6)
                      .map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} size="sm" showProgress={false} />
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/badges" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Trophy className="mr-2 h-4 w-4" />
                      View All Badges
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </AppContainer>
      </main>

      <AppFooter />
    </div>
  )
}
