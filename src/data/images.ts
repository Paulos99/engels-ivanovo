import { publicUrl } from '../utils/publicUrl'

export type ImageSlot =
  | 'hero'
  | 'coffee-hero'
  | 'food-1'
  | 'food-2'
  | 'food-3'
  | 'interior-main'
  | 'interior-detail'
  | 'space-wide'

export interface ImageConfig {
  slot: ImageSlot
  src?: string
  alt: string
  folder: 'interior' | 'coffee' | 'food' | 'details'
  aspectRatio: string
}

/** Фото из официального Telegram-канала @GCsEng3lzz */
export const images: Record<ImageSlot, ImageConfig> = {
  hero: {
    slot: 'hero',
    src: publicUrl('images/interior/hero.jpg'),
    alt: 'Интерьер гастрокофейни Энгельс — дерево, свет, посадочные места',
    folder: 'interior',
    aspectRatio: '16 / 10',
  },
  'coffee-hero': {
    slot: 'coffee-hero',
    src: publicUrl('images/coffee/espresso-bar.jpg'),
    alt: 'Эспрессо-машина за барной стойкой, вид через ветви бонсая',
    folder: 'coffee',
    aspectRatio: '4 / 3',
  },
  'food-1': {
    slot: 'food-1',
    src: publicUrl('images/food/breakfast-porridge.jpg'),
    alt: 'Каша с ягодами, миндалём и семенами',
    folder: 'food',
    aspectRatio: '3 / 4',
  },
  'food-2': {
    slot: 'food-2',
    src: publicUrl('images/food/croissant.jpg'),
    alt: 'Круассаны с белым шоколадом и орехами',
    folder: 'food',
    aspectRatio: '3 / 4',
  },
  'food-3': {
    slot: 'food-3',
    src: publicUrl('images/food/pastry-display.jpg'),
    alt: 'Витрина с десертами и выпечкой',
    folder: 'food',
    aspectRatio: '3 / 4',
  },
  'interior-main': {
    slot: 'interior-main',
    src: publicUrl('images/interior/bonsai-seating.jpg'),
    alt: 'Дерево в эстетике бонсай у барной стойки и посадочные места',
    folder: 'interior',
    aspectRatio: '16 / 10',
  },
  'interior-detail': {
    slot: 'interior-detail',
    src: publicUrl('images/details/coffee-beans-wall.jpg'),
    alt: 'Декоративная инсталляция из зерна на стене',
    folder: 'details',
    aspectRatio: '1 / 1',
  },
  'space-wide': {
    slot: 'space-wide',
    src: publicUrl('images/interior/space-wide.jpg'),
    alt: 'Пространство кофейни — дерево, окна, барная зона',
    folder: 'interior',
    aspectRatio: '21 / 9',
  },
}

export function getImagePath(config: ImageConfig): string | undefined {
  if (config.src) return config.src
  return undefined
}
