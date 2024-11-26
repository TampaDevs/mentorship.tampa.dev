import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSeniorityLevels() {
  const seniorityLevels = [
    { name: 'Still in school/bootcamp or just graduated', slug: 'still-in-school-bootcamp-or-just-graduated' },
    { name: 'Less than 3 years experience', slug: 'less-than-3-years-experience' },
    { name: '3-7 years experience', slug: '3-7-years-experience' },
    { name: '7+ years of experience', slug: '7-plus-years-of-experience' },
    {
      name: 'Just here to help with resumes and finding jobs',
      slug: 'just-here-to-help-with-resumes-and-finding-jobs',
    },
  ];

  await prisma.seniorityLevel.createMany({ data: seniorityLevels });
}
