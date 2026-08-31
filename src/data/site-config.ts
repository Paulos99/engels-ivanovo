export interface SiteConfig {
  name: string
  tagline: string
  address: {
    street: string
    city: string
    full: string
  }
  phone: string
  phoneHref: string
  hours: {
    weekdays: { label: string; time: string }
    weekend: { label: string; time: string }
  }
  links: {
    telegram: string
    instagram: string
    vk: string
    yandexMaps: string
    yandexReviews: string
    route: string
  }
  features: {
    dogFriendly: boolean
  }
  seo: {
    title: string
    description: string
    url: string
  }
  copy: {
    baristaHelp: string
    philosophy: string[]
    intro: string
    coffee: string
    food: string
    space: string
    spaceQuote: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'ЭНГЕЛЬС',
  tagline: 'Спешелти-кофейня · гастрономия · Иваново',
  address: {
    street: 'Шереметевский проспект, 52',
    city: 'Иваново',
    full: 'Шереметевский проспект, 52, Иваново',
  },
  phone: '+7 (901) 039-79-99',
  phoneHref: 'tel:+79010397999',
  hours: {
    weekdays: { label: 'Пн–Пт', time: '08:00–21:00' },
    weekend: { label: 'Сб–Вс', time: '09:00–22:00' },
  },
  links: {
    telegram: 'https://t.me/GCsEng3lzz',
    instagram: 'https://www.instagram.com/engels.coffee_ivanovo/',
    vk: 'https://vk.ru/engels_coffee',
    yandexMaps: 'https://yandex.ru/profile/103039663228?lang=ru',
    yandexReviews: 'https://yandex.ru/maps/org/engels/103039663228/reviews/',
    route:
      'https://yandex.ru/maps/?rtext=~56.978611,40.981389&rtt=auto',
  },
  features: {
    dogFriendly: true,
  },
  seo: {
    title: 'Энгельс — спешелти-кофейня и гастрономия в Иваново',
    description:
      'Спешелти-кофейня «Энгельс» на Шереметевском проспекте, 52. Авторская кухня, фильтр-кофе, спокойное пространство с живым деревом у барной стойки.',
    url: 'https://engels-ivanovo.ru',
  },
  copy: {
    baristaHelp:
      'Если сомневаетесь с выбором, бариста помогут подобрать напиток под ваш вкус.',
    philosophy: [
      'Спешелти-зерно, авторские рецепты и свет в зале — три части одного опыта.',
      'Кофе заваривают внимательно, кухня работает с продуктом, а не с заготовками.',
      'Интерьер собран так, чтобы в нём было спокойно: дерево, окна, детали, к которым хочется возвращаться.',
      'Каждый слой — от помола до подачи — влияет на то, что окажется в вашей чашке и на тарелке.',
    ],
    intro:
      'Спешелти-кофе, авторская кухня и пространство, собранное с вниманием к деталям. Здесь всё связано одной идеей — от зерна до подачи, от рецепта до света в зале.',
    coffee:
      'Работаем со спешелти-зерном. Эспрессо, фильтр, альтернативные способы и авторские напитки — каждый метод раскрывает зерно по-своему.',
    food:
      'Авторская кухня: завтраки, основные блюда, сэндвичи, десерты. Сезонные позиции появляются, когда созревает повод.',
    space:
      'Свет, дерево, натуральные материалы. У барной стойки — живое дерево в эстетике бонсай: точка, в которую естественно возвращается взгляд.',
    spaceQuote: 'Пространство, в котором хочется задержаться.',
  },
}
