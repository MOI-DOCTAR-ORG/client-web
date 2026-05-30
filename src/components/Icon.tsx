type IconProps = {
  icon: string
  className?: string
}

export default function Icon({ icon, className = '' }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      data-icon={icon}
      style={{
        fontVariationSettings: "'FILL' 1",
        fontSize: 'inherit',
        fontWeight: 'inherit',
      }}
    >
      {icon}
    </span>
  )
}
