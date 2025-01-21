import Footer from "@/components/footer";
import Hero from "@/components/hero"
import { PricingSection } from "@/components/pricingSection"
import { SnakeGame } from "@/components/snakeGame"
import { HeroWrapper } from "@/components/heroWrapper"

export default function Home() {
  return (
    <div>
      <HeroWrapper>
        <Hero/>
        <SnakeGame/>
        <PricingSection/>
        <Footer/>
      </HeroWrapper>
    </div>
  );
}