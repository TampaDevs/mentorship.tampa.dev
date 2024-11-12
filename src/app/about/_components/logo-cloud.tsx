import { Card, CardContent, CardHeader, CardTitle } from '~/ui/primitives/card';

export function LogoCloud() {
  return (
    <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
      <Card className="relative isolate overflow-hidden bg-primary-foreground px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <CardHeader>
          <CardTitle className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-background text-black sm:text-4xl">
            Our mentors make a difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-background/80 text-black">
            Our mentorship program connects you with industry leaders who are passionate about helping you grow. Join us
            to gain insights, skills, and the confidence to excel in your career.
          </p>
          <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
            {['Transistor', 'Reform', 'Tuple', 'SavvyCal', 'Statamic'].map((company) => (
              <img
                key={company}
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src={`https://tailwindui.com/plus/img/logos/158x48/${company.toLowerCase()}-logo-white.svg`}
                alt={company}
                width={158}
                height={48}
              />
            ))}
          </div>
        </CardContent>
        <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
      </Card>
    </div>
  );
}
