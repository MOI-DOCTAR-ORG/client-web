import type { CSSProperties, HTMLAttributes } from 'react'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  icon: string
  className?: string
  size?: IconSize
}

export default function Icon({ icon, className = '', size = 'md', style, ...props }: IconProps) {
  const iconStyle: CSSProperties = {
    ...style,
    fontVariationSettings: "'FILL' 1",
    fontSize: `var(--icon-${size})`,
    fontWeight: 'inherit',
  }

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      data-icon={icon}
      style={iconStyle}
      {...props}
    >
      {icon}
    </span>
  )
}
