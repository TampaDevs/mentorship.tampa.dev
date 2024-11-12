import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '~/ui/primitives/card';

// Example dynamic content fetching function
// const jobOpenings = fetchJobOpeningsFromProductMd();

const jobOpenings = [
  {
    id: 1,
    role: 'Full-time designer',
    href: '#',
    description: 'Description from PRODUCT.md',
    salary: 'Salary from PRODUCT.md',
    location: 'Location from PRODUCT.md',
  },
  {
    id: 2,
    role: 'Part-time developer',
    href: '#',
    description: 'Description from PRODUCT.md',
    salary: 'Salary from PRODUCT.md',
    location: 'Location from PRODUCT.md',
  },
  {
    id: 3,
    role: 'Marketing Specialist',
    href: '#',
    description: 'Description from PRODUCT.md',
    salary: 'Salary from PRODUCT.md',
    location: 'Location from PRODUCT.md',
  },
  {
    id: 4,
    role: 'Product Manager',
    href: '#',
    description: 'Description from PRODUCT.md',
    salary: 'Salary from PRODUCT.md',
    location: 'Location from PRODUCT.md',
  },
];

export function JobOpenings() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
        <div className="w-full lg:max-w-lg lg:flex-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Become a Mentor and Inspire the Next Generation
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            Join our community of mentors and help guide aspiring professionals. Share your knowledge, gain new
            perspectives, and make a lasting impact.
          </p>
          <img
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
            alt="Mentorship Program"
            className="lg:aspect-auto mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:h-[34.5rem]"
          />
        </div>
        <div className="w-full lg:max-w-xl lg:flex-auto">
          <h3 className="sr-only">Mentorship Opportunities</h3>
          <ul className="-my-8 divide-y divide-border">
            {jobOpenings.map((opening) => (
              <li key={opening.id} className="py-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold leading-6 text-foreground">
                      <Link href={opening.href}>{opening.role}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-2 text-sm text-muted-foreground">{opening.description}</p>
                    <div className="mt-4 flex items-center gap-x-4">
                      <p className="text-sm font-semibold leading-6 text-foreground">{opening.salary}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{opening.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex border-t border-border pt-8">
            <Link href="#" className="text-sm font-semibold leading-6 text-primary hover:text-primary/80">
              View all mentorship opportunities <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
