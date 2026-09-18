const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CareerPilot AI database...');

  // 1. Create or upsert Alex Sharma
  const user = await prisma.user.upsert({
    where: { email: 'alex.sharma@stanford.edu' },
    update: {},
    create: {
      id: 'user-alex-sharma',
      email: 'alex.sharma@stanford.edu',
      name: 'Alex Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      profile: {
        create: {
          targetRole: 'Software Engineer',
          experienceLevel: 'Intermediate',
          careerGoal: 'Internship',
          preferredLocation: 'Remote / India / US',
          readinessScore: 82,
          resumeScore: 87,
          skillMatchScore: 76,
          totalApplications: 18,
          bio: 'Final year CS student passionate about distributed systems, resilient backend APIs, and modern web architectures. Actively preparing for Software Engineering internships.',
          githubUrl: 'https://github.com/alexsharma-dev',
          linkedinUrl: 'https://linkedin.com/in/alexsharma-swe',
          portfolioUrl: 'https://alexsharma.dev'
        }
      }
    }
  });

  console.log(`Created user: ${user.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
