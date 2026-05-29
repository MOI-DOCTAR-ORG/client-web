import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="rounded-2xl bg-surface-container-highest border border-outline-variant/30 p-3">
      <button
        type="button"
        onClick={toggleTheme}
        className="w-full flex items-center gap-3 md:gap-stack-md pl-2.5 py-2.5 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors text-sm md:text-base text-left"
      >
        <Icon icon={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-xl md:text-2xl" />
        <span className="font-label-md text-label-md">
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </span>
      </button>
      <p className="mt-2 text-xs text-secondary leading-5">
        {theme === 'light'
          ? 'Light mode is active with crisp surfaces, calm accents, and sharper typography for a professional workspace.'
          : 'Dark mode is active. Switch to light mode anytime for a brighter, cleaner interface.'}
      </p>
    </div>
  )
}
