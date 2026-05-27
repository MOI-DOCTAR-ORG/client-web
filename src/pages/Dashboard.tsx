import Header from '../components/Header'
import ReminderBanner from '../components/ReminderBanner'
import HeroSection from '../components/HeroSection'
import SessionGrid from '../components/SessionGrid'
import QuickActions from '../components/QuickActions'
import Icon from '../components/Icon'

export default function Dashboard() {
  return (
    <main className="ml-[var(--spacing-sidebar-width,280px)] min-h-screen px-gutter pt-8 pb-stack-lg max-w-[1400px] mx-auto">
      <Header />
      <ReminderBanner />
      <HeroSection />

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Recent Sessions
        </h3>
        <a
          className="text-primary font-label-md flex items-center gap-1 hover:gap-2 transition-all"
          href="#"
        >
          See all activity{' '}
          <Icon icon="arrow_forward" className="text-[18px]" />
        </a>
      </div>

      <SessionGrid />
      <QuickActions />
    </main>
  )
}
