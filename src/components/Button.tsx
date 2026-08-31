import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'ghost' | 'ghostLight' | 'text'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  to?: string
  external?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button({
  children,
  variant = 'primary',
  href,
  to,
  external,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const cls = `${styles[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
