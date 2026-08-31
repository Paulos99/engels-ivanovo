import { Button } from './Button'
import styles from './FloatingMenuButton.module.css'

export function FloatingMenuButton() {
  return (
    <div className={styles.floating}>
      <Button to="/menu" variant="primary">
        Меню
      </Button>
    </div>
  )
}
