import Footer from "@/components/footer";
import Hero from "@/components/hero"
import { PricingSection } from "@/components/pricingSection"
import { SnakeGame } from "@/components/snakeGame"

export default function Home() {
  return (
    <div>
                <Hero/>
          <SnakeGame/>
          <PricingSection/>
          <Footer/>
    </div>
  );
}
