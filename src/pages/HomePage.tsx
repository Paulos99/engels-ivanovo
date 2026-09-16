import { HeroSection } from "../sections/HeroSection";
import { FoodSection } from "../sections/FoodSection";
import { CoffeeSection } from "../sections/CoffeeSection";
import { SpaceSection } from "../sections/SpaceSection";
import { TelegramSection } from "../sections/TelegramSection";
import { ContactsSection } from "../sections/ContactsSection";
export function HomePage() {
  return (
    <>
      <HeroSection />
      <FoodSection />
      <CoffeeSection />
      <SpaceSection />
      <TelegramSection />
      <ContactsSection />
    </>
  );
}
