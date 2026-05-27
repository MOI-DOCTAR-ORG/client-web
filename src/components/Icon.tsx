type IconProps = {
  icon: string
  className?: string
}

export default function Icon({ icon, className = '' }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} data-icon={icon}>
      {icon}
    </span>
  )
}
