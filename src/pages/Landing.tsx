import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import Logo from '../assets/landing/Logo.png'
import CloseIcon from '../assets/landing/close.png'
import MenuIcon from '../assets/landing/burger-menu.png'
import UsersImage from '../assets/landing/Group3.png'
import TrustImage from '../assets/landing/Group5.png'
import HeroImage from '../assets/landing/hero-bg.png'

type InfoCard = {
  label?: string
  number?: string
  title: string
  description: string
  icon: string
}

const howItWorks: InfoCard[] = [
  {
    number: '01',
    title: 'Tell us how you feel',
    description: "Just tell us what's going on and we'll guide you with a few simple questions.",
    icon: 'chat_bubble',
  },
  {
    number: '02',
    title: 'AI reviews your symptoms',
    description: 'MoiDoctar reviews your responses using medical knowledge and symptom patterns.',
    icon: 'search',
  },
  {
    number: '03',
    title: 'Get guidance and next steps',
    description: "You'll receive possible explanations and clear next steps on what to do next.",
    icon: 'tips_and_updates',
  },
]

const features: InfoCard[] = [
  {
    title: 'Interactive\nBody Map',
    description: 'Pinpoint where symptoms are happening and give the triage flow better context.',
    icon: 'accessibility_new',
  },
  {
    title: '24/7\nAvailability',
    description: "Start a triage session whenever you need clarity, even outside clinic hours.",
    icon: 'schedule',
  },
  {
    title: 'Nearby Care\nIntegration',
    description: 'Use your results to understand when and where to seek the right level of care.',
    icon: 'local_hospital',
  },
]

const trustItems = [
  {
    title: 'Not a replacement for doctors',
    description:
      'We provide guidance, not medical diagnosis. For serious or urgent concerns, always consult a qualified healthcare professional.',
  },
  {
    title: 'Your data stays private',
    description: 'Your information is securely protected and never shared without your consent.',
  },
  {
    title: 'Backed by medical knowledge',
    description: 'MoiDoctar uses trusted medical patterns to provide practical guidance.',
  },
]

const ctaClass =
  'inline-flex items-center justify-center rounded-full bg-[#2450f5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#173fd1] hover:scale-[1.02] active:scale-[0.98] lg:px-8 lg:py-4 lg:text-base'

function LandingNavbar({ appTarget }: { appTarget: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <a href="#hero" className="flex items-center">
          <img src={Logo} className="h-auto w-32 sm:w-40" alt="MoiDoctar" />
        </a>

        <nav
          className={`flex items-center gap-6 text-sm font-semibold transition-all max-sm:fixed max-sm:bottom-0 max-sm:top-0 max-sm:bg-[#2450f5] max-sm:pt-20 max-sm:text-white ${
            sidebarOpen
              ? 'max-sm:right-0 max-sm:w-64 max-sm:flex-col max-sm:items-start max-sm:px-8'
              : 'max-sm:-right-72 max-sm:w-64 max-sm:flex-col max-sm:items-start max-sm:px-8'
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute right-5 top-5 hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 sm:hidden"
            aria-label="Close navigation"
          >
            <img src={CloseIcon} alt="" className="h-4 w-4" />
          </button>

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="text-slate-700 transition hover:text-[#2450f5] max-sm:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 sm:hidden"
            aria-label="Open navigation"
          >
            <img src={MenuIcon} alt="" className="h-5 w-5" />
          </button>

          <Link
            to="/sign-in"
            className="hidden rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 min-[780px]:inline-flex"
          >
            Login
          </Link>

          <Link to={appTarget} className={`${ctaClass} hidden py-2.5 lg:py-2.5 min-[860px]:inline-flex`}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

function HeroSection({ appTarget }: { appTarget: string }) {
  return (
    <section id="hero" className="bg-white px-5 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex rounded-full bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#2450f5]">
            Clinical grade protocol
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Describe how you feel. Get clarity in minutes.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Get clinical grade insight and clear next steps for your symptoms, powered by advanced medical protocols.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link to={appTarget} className={`${ctaClass} w-full sm:w-auto`}>
              Start your free Triage
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-[0.98] sm:w-auto lg:px-8 lg:py-4 lg:text-base"
            >
              How it works
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 lg:items-start">
            <img src={UsersImage} alt="MoiDoctar users" className="w-28 sm:w-32" />
            <p className="text-sm text-slate-500 sm:text-base">Join 500+ users on our website</p>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={HeroImage}
            alt="MoiDoctar health guidance preview"
            className="aspect-[4/3] w-full max-w-xl rounded-[28px] object-cover shadow-2xl shadow-blue-950/10"
          />
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#f5f7fb] px-5 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <span className="inline-flex rounded-full bg-[#dfe7ff] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#2450f5]">
            Learn more
          </span>
          <h2 className="mt-6 text-4xl font-bold text-slate-950 md:text-5xl">How it Works</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {howItWorks.map((card) => (
            <article
              key={card.number}
              className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[28px] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2954ff] to-[#1d43d8] opacity-0 transition duration-300 group-hover:opacity-100" />
              <p className="relative z-10 self-end text-7xl font-light text-slate-200 transition group-hover:text-white/30">
                {card.number}
              </p>

              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-[#2450f5] transition group-hover:bg-white/10 group-hover:text-white">
                  <Icon icon={card.icon} />
                </div>
                <h3 className="max-w-xs text-3xl font-semibold leading-tight text-slate-950 transition group-hover:text-white">
                  {card.title}
                </h3>
                <p className="mt-5 max-w-xs text-base leading-7 text-slate-500 transition group-hover:text-white/80">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="trust" className="bg-[#f5f7fb] px-5 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#2450f5] px-6 py-10 shadow-2xl shadow-blue-900/10 md:px-10 lg:px-14 lg:py-16">
        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <img
            src={TrustImage}
            alt=""
            className="pointer-events-none absolute -bottom-20 -left-20 w-72 opacity-20 md:w-96"
          />

          <div className="relative z-10 max-w-md">
            <span className="inline-flex rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#2450f5]">
              Trust section
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              Why People
              <br />
              Trust Us
            </h2>
          </div>

          <div className="relative z-10 space-y-5">
            {trustItems.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <article key={item.title} className="overflow-hidden rounded-[24px] bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <div>
                      <h3 className="max-w-lg text-2xl font-semibold leading-snug text-slate-950 md:text-3xl">
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-2xl transition ${
                        isActive ? 'border-[#2450f5] bg-[#2450f5] text-white' : 'border-blue-200 text-[#2450f5]'
                      }`}
                    >
                      <Icon icon={isActive ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
                    </span>
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [activeCard, setActiveCard] = useState(1)

  return (
    <section id="features" className="bg-[#f5f7fb] px-5 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <span className="inline-flex rounded-full bg-[#dfe7ff] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#2450f5]">
            Features
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
            Intelligent
            <br />
            Features
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const isActive = activeCard === index

            return (
              <article
                key={feature.title}
                onMouseEnter={() => setActiveCard(index)}
                className={`relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[28px] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  isActive ? 'bg-[#2450f5]' : 'bg-white'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#2f5eff] to-[#1b44d6] transition ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="relative z-10 flex justify-end">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl transition ${
                      isActive ? 'bg-white/10 text-white' : 'bg-blue-50 text-[#2450f5]'
                    }`}
                  >
                    <Icon icon={feature.icon} />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3
                    className={`whitespace-pre-line text-3xl font-semibold leading-tight transition ${
                      isActive ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={`mt-5 max-w-xs text-base leading-7 transition ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                    {feature.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="bg-[#f5f7fb] px-5 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-3 gap-4 text-center md:gap-10">
          {[
            ['2M+', 'Trusted Users Worldwide'],
            ['99.2%', 'Clinical Accuracy Alignment'],
            ['ISO', '13485 Certified'],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">{value}</h2>
              <p className="mt-3 text-[11px] text-slate-500 sm:text-sm md:text-base">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-[28px] bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10">
            <h2 className="mb-8 text-2xl font-bold text-slate-950 md:text-3xl">Send Us a Message</h2>

            <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
              {[
                ['Full Name', 'Your Name', 'text'],
                ['Phone Number', 'Your Phone Number', 'tel'],
                ['Email Address', 'Your Email Address', 'email'],
              ].map(([label, placeholder, type]) => (
                <label key={label} className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-950">{label}</span>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-transparent bg-[#f5f7fb] px-5 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2450f5]"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-950">About</span>
                <textarea
                  rows={5}
                  placeholder="Writing..."
                  className="w-full resize-none rounded-xl border border-transparent bg-[#f5f7fb] px-5 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2450f5]"
                />
              </label>

              <button type="submit" className={`${ctaClass} w-full`}>
                Submit
              </button>
            </form>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center">
            <h2 className="absolute top-0 z-10 text-center text-4xl font-bold text-slate-950 md:text-5xl">Contact Us</h2>
            <img src={TrustImage} alt="MoiDoctar contact illustration" className="mt-20 w-full max-w-lg object-contain opacity-60" />
            <div className="absolute bottom-10 h-64 w-64 rounded-full bg-[#2450f5]/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterSection({ appTarget }: { appTarget: string }) {
  return (
    <footer className="bg-[#f5f7fb]">
      <div className="rounded-b-[32px] bg-[#2450f5] px-5 py-20 text-center lg:px-10">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
          Your Health, Empowered
          <br />
          by Intelligence
        </h2>
        <p className="mt-5 text-lg text-white/75">Health guidance built for faster, clearer decisions.</p>
        <Link to={appTarget} className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-base font-bold text-[#2450f5] shadow-xl transition hover:scale-[1.03] active:scale-[0.98] md:text-lg">
          Start your free Triage
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div>
          <span className="inline-flex rounded-full bg-[#dfe7ff] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#2450f5]">
            Clinical grade protocol
          </span>
          <h2 className="mt-7 max-w-xl text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Describe how you feel.
            <br />
            Get clarity in minutes.
          </h2>
          <p className="mt-12 text-sm font-bold uppercase tracking-wide text-[#2450f5]">
            © 2026 MOI DOCTAR. All rights reserved
          </p>
        </div>

        <div>
          <form className="flex rounded-full bg-white p-2 shadow-md" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email Address"
              className="min-w-0 flex-1 bg-transparent px-5 text-slate-950 outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="rounded-full bg-[#2450f5] px-5 py-3 text-sm font-bold text-white md:px-8">
              Subscribe
            </button>
          </form>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ['Home', '#hero'],
              ['How it works', '#how-it-works'],
              ['Trust', '#trust'],
              ['Features', '#features'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={label} href={href} className="text-xl font-semibold text-slate-950 transition hover:text-[#2450f5]">
                {label}
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <a href="#" className="text-sm font-bold uppercase tracking-wide text-[#2450f5] hover:opacity-70">
              Privacy
            </a>
            <a href="#" className="text-sm font-bold uppercase tracking-wide text-[#2450f5] hover:opacity-70">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Landing() {
  const { isAuthenticated } = useAuth()
  const appTarget = isAuthenticated ? '/app/new-triage' : '/sign-up'

  return (
    <main className="min-h-screen bg-white font-headline-md text-slate-950">
      <LandingNavbar appTarget={appTarget} />
      <HeroSection appTarget={appTarget} />
      <HowItWorksSection />
      <TrustSection />
      <FeaturesSection />
      <ContactSection />
      <FooterSection appTarget={appTarget} />
    </main>
  )
}
