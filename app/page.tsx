import Hero from "@/components/Hero";
// import Hero from "@/components/CaludeHero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Hero /> */}
    </div>
  );
}
