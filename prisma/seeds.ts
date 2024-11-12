import { seedAccounts } from './seeds/accounts';
import { seedMentorships } from './seeds/mentorships';
import { seedMessages } from './seeds/messages';
import { seedSessions } from './seeds/sessions';
import { seedSkills } from './seeds/skills';
import { seedSuggestions } from './seeds/suggestions';
import { seedUsers } from './seeds/users';

function logStep(message: string, emoji: string) {
  console.log(`\n${emoji}  ${message}\n`);
}

async function main() {
  let currentStep = '';

  try {
    logStep('Starting seeding...', '🌱');
    
    currentStep = 'skills';
    logStep('Seeding skills...', '🌟');
    await seedSkills();
    
    currentStep = 'users';
    logStep('Seeding users...', '👥');
    await seedUsers();
    
    currentStep = 'accounts';
    logStep('Seeding accounts...', '💼');
    await seedAccounts();
    
    currentStep = 'sessions';
    logStep('Seeding sessions...', '🕒');
    await seedSessions();
    
    currentStep = 'mentorships';
    logStep('Seeding mentorships...', '🤝');
    await seedMentorships();
    
    currentStep = 'messages';
    logStep('Seeding messages...', '📬');
    await seedMessages();
    
    currentStep = 'suggestions';
    logStep('Seeding suggestions...', '💡');
    await seedSuggestions();
    
    logStep('Seeding completed.', '✅');
  } catch (error) {
    console.error(`🪦  The ${currentStep} step failed during seeding:`, error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌  Seeding failed:', error);
  process.exit(1);
});
