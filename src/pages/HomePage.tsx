import { HeroSection } from '../sections/HeroSection'
import { IntroSection } from '../sections/IntroSection'
import { CoffeeSection } from '../sections/CoffeeSection'
import { FoodSection } from '../sections/FoodSection'
import { SpaceSection } from '../sections/SpaceSection'
import { PhilosophySection } from '../sections/PhilosophySection'
import { SeasonalSection } from '../sections/SeasonalSection'
import { TelegramSection } from '../sections/TelegramSection'
import { ReviewsSection } from '../sections/ReviewsSection'
import { ContactsSection } from '../sections/ContactsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <CoffeeSection />
      <FoodSection />
      <SpaceSection />
      <PhilosophySection />
      <SeasonalSection />
      <TelegramSection />
      <ReviewsSection />
      <ContactsSection />
    </>
  )
}
