import { HomeHero } from '@/components/home-hero';
import { getHomepage, sanityImageUrl } from '@/lib/sanity';

export default async function HomePage() {
  const homepage = await getHomepage();
  const imageUrl = homepage?.mainImage ? sanityImageUrl(homepage.mainImage, 700) : undefined;

  return <HomeHero imageUrl={imageUrl} />;
}
