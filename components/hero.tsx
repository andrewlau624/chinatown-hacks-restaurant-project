import Link from "next/link";
import { MorphingText } from "./magicui/morphing-text"
import { NumberTicker } from "./magicui/number-ticker";
import { Particles } from "./magicui/particles"
import { Button } from "./ui/button";

const Hero = () => {
    const heroText = [
      "Chowtown",
      "A Culinary Haven",
      "For Food Lovers",
      "For Chefs",
      "Powered by AI"
    ];
  
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background bg-[url(https://as2.ftcdn.net/v2/jpg/04/59/10/19/1000_F_459101946_KkjgxmH1IG5pMTDiKOzImaMxzapEI83n.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0"></div>
  
        <MorphingText texts={heroText} className="pointer-events-none z-10 whitespace-pre-wrap text-center sm:text-8xl text-6xl font-semibold leading-none text-white" />
  
        <p className="text-white text-xl sm:mt-4 mt-20 z-10 max-w-xl text-center mx-3">
          Empowering over{" "}
          <NumberTicker
            value={700}
            className="whitespace-pre-wrap font-semibold tracking-tight text-white"
          />{" "}
          local businesses and sharing the rich flavors of Chinese cuisine with the world.
        </p>
        <Link href="/about" className="z-10">
          <Button className="mt-5 border border-slate-300">Learn More</Button>
        </Link>
        <Particles
          className="absolute inset-0 z-0"
          quantity={60}
          ease={80}
          size={1.5}
          color={"#ffffff"}
          refresh
        />
      </div>
    );
  };
  
  export default Hero;
  