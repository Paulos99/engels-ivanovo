export interface Review {
  id: string
  text: string
  author: string
  source: 'Yandex'
  date?: string
}

/** Цитаты гостей с Яндекс Карт. Рейтинг: 5/5, 186 оценок. */
export const reviewsData = {
  rating: 5,
  count: 186,
  sourceUrl: 'https://yandex.ru/maps/org/engels/103039663228/reviews/',
  quotes: [
    {
      id: 'review-1',
      text:
        'Гостеприимный персонал, завтраки целый день, чисто, светлый интерьер, вкусная каша, сырники и ароматный кофе.',
      author: 'Ксения М.',
      source: 'Yandex' as const,
    },
    {
      id: 'review-2',
      text:
        'Хорошая кофейня. Уютный светлый интерьер с панорамными окнами. Вкусный кофе, красивая подача. Удачное место, чтобы провести время с любимым человеком.',
      author: 'Гость',
      source: 'Yandex' as const,
    },
    {
      id: 'review-3',
      text:
        'Интерьер минималистичный, приятный, тёплый. Кофе вкусный, есть завтраки. Однозначно буду посещать это место, мне всё понравилось.',
      author: 'Гость',
      source: 'Yandex' as const,
    },
    {
      id: 'review-4',
      text: 'Очень вкусный горячий бамбл на апельсиновом фреше с корицей.',
      author: 'Гость',
      source: 'Yandex' as const,
    },
  ] satisfies Review[],
}
