import { Card, CardContent } from "~/ui/primitives/card";

export function Stats() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Empowering the Tech Community through Mentorship
        </h2>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Our platform connects tech enthusiasts for skill-based mentorships,
          fostering growth and community building.
        </p>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
        <Card className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
          <CardContent className="flex-auto">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              10,000+
            </p>
            <h3 className="text-base font-semibold leading-7 text-foreground">
              Active Mentorships
            </h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              Facilitating meaningful connections across various tech domains.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
          <CardContent className="flex-auto">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              5,000+
            </p>
            <h3 className="text-base font-semibold leading-7 text-foreground">
              Mentors Available
            </h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              Experienced professionals ready to share their knowledge.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
          <CardContent className="flex-auto">
            <p className="text-3xl font-bold tracking-tight text-foreground">
              20+
            </p>
            <h3 className="text-base font-semibold leading-7 text-foreground">
              Tech Domains Covered
            </h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              From Frontend Development to AI/ML and beyond.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
