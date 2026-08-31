import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './ScrollReveal.module.css'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
    >
      {children}
    </div>
  )
}
