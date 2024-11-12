import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";

const features = [
  {
    title: "Skill Development",
    subtitle: "Enhance your tech skills",
    description:
      "Connect with experienced mentors to develop skills in Frontend Dev, Backend Dev, DevOps, and more.",
    image:
      "https://tailwindui.com/plus/img/component-images/bento-01-performance.png",
    imagePosition: "object-left",
    gridClass: "lg:col-span-3 lg:row-span-2",
    roundedClass: "lg:rounded-tl-[2rem]",
  },
  {
    title: "Mentorship Opportunities",
    subtitle: "Find the right mentor",
    description:
      "Explore mentorship opportunities tailored to your career goals and interests.",
    image:
      "https://tailwindui.com/plus/img/component-images/bento-01-releases.png",
    imagePosition: "lg:object-right",
    gridClass: "lg:col-span-3 lg:row-span-2",
    roundedClass: "lg:rounded-tr-[2rem]",
  },
  {
    title: "Community Building",
    subtitle: "Join a supportive network",
    description:
      "Be part of a community that fosters growth and knowledge exchange.",
    image:
      "https://tailwindui.com/plus/img/component-images/bento-01-speed.png",
    imagePosition: "object-left",
    gridClass: "lg:col-span-2",
    roundedClass: "lg:rounded-bl-[2rem]",
  },
  {
    title: "Real-Time Communication",
    subtitle: "Stay connected",
    description:
      "Utilize in-app messaging and notifications to communicate with your mentors and mentees.",
    image:
      "https://tailwindui.com/plus/img/component-images/bento-01-integrations.png",
    imagePosition: "object-center",
    gridClass: "lg:col-span-2",
    roundedClass: "",
  },
  {
    title: "Progress Tracking",
    subtitle: "Achieve your goals",
    description:
      "Set and track your mentorship goals to ensure continuous progress.",
    image:
      "https://tailwindui.com/plus/img/component-images/bento-01-network.png",
    imagePosition: "object-center",
    gridClass: "lg:col-span-2",
    roundedClass: "lg:rounded-br-[2rem]",
  },
];

export function BentoFeatures() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold text-primary">
          Connections with Purpose
        </h2>
        <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Mentorship for the modern developer
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${feature.gridClass} ${feature.roundedClass}`}
            >
              <CardContent className="p-0">
                <img
                  alt=""
                  src={feature.image}
                  className={`h-80 w-full object-cover ${feature.imagePosition}`}
                />
                <div className="p-6">
                  <CardHeader className="p-0">
                    <h3 className="text-sm font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <CardTitle className="mt-2 text-lg font-medium tracking-tight">
                      {feature.subtitle}
                    </CardTitle>
                  </CardHeader>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
