import Hero from "@/components/Hero";
import {
  Facilities,
  Follow,
  Footer,
  Gallery,
  Journal,
  Newsletter,
  Rooms,
  ScrollExtras,
  Services,
  Story,
  Testimonials,
  VideoTour,
} from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <ScrollExtras />
      <Hero />
      <Rooms />
      <Services />
      <Story />
      <VideoTour />
      <Facilities />
      <Testimonials />
      <Gallery />
      <Journal />
      <Follow />
      <Newsletter />
      <Footer />
    </main>
  );
}
