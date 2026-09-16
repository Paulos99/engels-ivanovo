import {
  images,
  photoBriefs,
  showImagePlaceholders,
  type ImageSlot,
} from "../data/images";
import styles from "./PlaceholderImage.module.css";

interface PlaceholderImageProps {
  slot: ImageSlot;
  className?: string;
  hoverable?: boolean;
  priority?: boolean;
}

export function PlaceholderImage({
  slot,
  className = "",
  hoverable = false,
  priority = false,
}: PlaceholderImageProps) {
  const config = images[slot];
  const src = showImagePlaceholders ? undefined : config.src;

  return (
    <div
      role={src ? undefined : "img"}
      aria-label={src ? undefined : `Фото: ${photoBriefs[slot]}`}
      data-photo-slot={slot}
      className={`${styles.placeholder} ${hoverable ? styles.hoverable : ""} ${className}`}
      style={{ aspectRatio: config.aspectRatio }}
    >
      {src ? (
        <img
          src={src}
          alt={config.alt}
          className={styles.image}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <span className={styles.label} aria-hidden="true">
          {photoBriefs[slot]}
        </span>
      )}
    </div>
  );
}
