import { BentoFeatures } from "~/app/_components/bento-features";
import { CallToAction } from "~/app/_components/call-to-action";
import { Faq } from "~/app/_components/faq";
import { Footer } from "~/app/_components/footer";
import { Hero } from "~/app/_components/hero";
import { api, HydrateClient } from "~/trpc/server";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";

export default async function Home() {
  const skills = await api.skill.getSkills();

  return (
    <HydrateClient>
      <Hero />
      <BentoFeatures />
      <div className="px-4 py-5 md:px-8">
        <h1 className="text-2xl font-black">Skills</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {skills ? (
            skills.map((skill, idx) => {
              return (
                <Card key={idx} className="py-3">
                  <CardHeader>
                    <CardTitle>{skill.name}</CardTitle>
                    <CardDescription>Slug: {skill.slug}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })
          ) : (
            <p>No users</p>
          )}
        </div>
      </div>
      <Faq />
      <CallToAction />
      <Footer />
    </HydrateClient>
  );
}
