import { seedAccounts } from './seeds/accounts';
import { seedMentorships } from './seeds/mentorships';
import { seedMessages } from './seeds/messages';
import { seedSessions } from './seeds/sessions';
import { seedSkills } from './seeds/skills';
import { seedSuggestions } from './seeds/suggestions';
import { seedUsers } from './seeds/users';

async function main() {
  console.log('🌱 Starting seeding...');
  
  console.log('Seeding skills...');
  await seedSkills();
  
  console.log('Seeding users...');
  await seedUsers();
  
  console.log('Seeding accounts...');
  await seedAccounts();
  
  console.log('Seeding sessions...');
  await seedSessions();
  
  console.log('Seeding mentorships...');
  await seedMentorships();
  
  console.log('Seeding messages...');
  await seedMessages();
  
  console.log('Seeding suggestions...');
  await seedSuggestions();
  
  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
