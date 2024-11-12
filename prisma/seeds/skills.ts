import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSkills() {
  const skills = [
    { name: 'Frontend Development', slug: 'frontend-development' },
    { name: 'Backend Development', slug: 'backend-development' },
    { name: 'DevOps', slug: 'devops' },
    { name: 'Security', slug: 'security' },
    { name: 'AI/ML', slug: 'ai-ml' },
    { name: 'Databases', slug: 'databases' },
    { name: 'Data Science', slug: 'data-science' },
    { name: 'UI/UX Design', slug: 'ui-ux-design' },
    { name: 'Mobile Development', slug: 'mobile-development' },
    { name: 'Cloud Architecture', slug: 'cloud-architecture' },
  ];

  await prisma.skill.createMany({ data: skills });
}
