import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSoftSkills() {
  const softSkills = [
    { name: 'Entrepreneurship', slug: 'entrepreneurship' },
    { name: 'Innovating', slug: 'innovating' },
    { name: 'Effective communication', slug: 'effective-communication' },
    { name: 'Leadership', slug: 'leadership' },
    { name: 'Problem solving', slug: 'problem-solving' },
    { name: 'Meeting facilitation', slug: 'meeting-facilitation' },
    { name: 'Effective Delegation', slug: 'effective-delegation' },
    { name: 'Job Searching/Interview Prep', slug: 'job-searching-interview-prep' },
    { name: 'Writing a resume', slug: 'writing-a-resume' },
    { name: 'Hiring skills', slug: 'hiring-skills' },
    { name: 'Adaptability', slug: 'adaptability' },
    { name: 'Time management', slug: 'time-management' },
    { name: 'Active listening', slug: 'active-listening' },
    { name: 'Conflict resolution', slug: 'conflict-resolution' },
    { name: 'Collaboration', slug: 'collaboration' },
    { name: 'Networking', slug: 'networking' },
    { name: 'Presentation skills', slug: 'presentation-skills' },
  ];

  await prisma.softSkill.createMany({ data: softSkills });
}
