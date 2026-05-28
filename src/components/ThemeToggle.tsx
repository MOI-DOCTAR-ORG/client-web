import Icon from './Icon'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-full flex items-center gap-3 md:gap-stack-md pl-5 py-2.5 md:py-3 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm md:text-base text-left"
    >
      <Icon icon={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-xl md:text-2xl" />
      <span className="font-label-md text-label-md">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  )
}
