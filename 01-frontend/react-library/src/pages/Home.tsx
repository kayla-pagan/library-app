import ActionPrompt from "../components/HomePage/ActionPrompt";
import AssistancePrompt from "../components/HomePage/AssistancePrompt";
import Carousel from "../components/HomePage/Carousel";
import Hero from "../components/HomePage/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <ActionPrompt />
      <AssistancePrompt />
    </>
  );
}
