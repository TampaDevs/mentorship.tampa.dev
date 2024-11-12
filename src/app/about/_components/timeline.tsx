import { Card, CardContent } from "~/ui/primitives/card";

const timeline = [
  {
    name: "Platform Conceptualization",
    description:
      "The idea for a mentorship platform was conceived to connect tech community members for skill-based mentorships.",
    date: "Jan 2021",
    dateTime: "2021-01",
  },
  {
    name: "Initial Development",
    description:
      "Development of the platform began, focusing on core features like user profiles and mentorship matching.",
    date: "Mar 2021",
    dateTime: "2021-03",
  },
  {
    name: "Beta Launch",
    description:
      "The platform was launched in beta, allowing early users to test and provide feedback on mentorship features.",
    date: "Sep 2021",
    dateTime: "2021-09",
  },
  {
    name: "Official Launch",
    description:
      "The mentorship platform officially launched, offering a full suite of features for mentors and mentees.",
    date: "Jan 2022",
    dateTime: "2022-01",
  },
];

export function Timeline() {
  return (
    <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
        {timeline.map((item) => (
          <Card key={item.name}>
            <CardContent className="pt-6">
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm font-semibold text-primary"
              >
                <svg
                  viewBox="0 0 4 4"
                  className="mr-4 h-1 w-1 flex-none"
                  aria-hidden="true"
                >
                  <circle cx={2} cy={2} r={2} fill="currentColor" />
                </svg>
                {item.date}
              </time>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 text-base text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
