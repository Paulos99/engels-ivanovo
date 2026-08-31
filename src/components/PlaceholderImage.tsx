import { images, type ImageSlot } from '../data/images'
import styles from './PlaceholderImage.module.css'

interface PlaceholderImageProps {
  slot: ImageSlot
  className?: string
  hoverable?: boolean
  priority?: boolean
}

export function PlaceholderImage({
  slot,
  className = '',
  hoverable = false,
  priority = false,
}: PlaceholderImageProps) {
  const config = images[slot]
  const src = config.src

  return (
    <div
      className={`${styles.placeholder} ${hoverable ? styles.hoverable : ''} ${className}`}
      style={{ aspectRatio: config.aspectRatio }}
    >
      {src ? (
        <img
          src={src}
          alt={config.alt}
          className={styles.image}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <span className={styles.label} aria-hidden="true">
          {config.folder} / {slot}
        </span>
      )}
    </div>
  )
}
