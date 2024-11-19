import { Footer } from '~/app/_components/footer';
import { LandingLayout } from '~/app/_components/landing-layout';
import { AboutHero } from '~/app/about/_components/about-hero';
import { JobOpenings } from '~/app/about/_components/job-openings';
import { LogoCloud } from '~/app/about/_components/logo-cloud';
import { OurPeople } from '~/app/about/_components/our-people';
import { Stats } from '~/app/about/_components/stats';
import { Timeline } from '~/app/about/_components/timeline';

export default async function AboutPage() {
  return (
    <LandingLayout>
      <AboutHero />
      <Timeline />
      <LogoCloud />
      <OurPeople />
      <Stats />
      <JobOpenings />
      <Footer />
    </LandingLayout>
  );
}
