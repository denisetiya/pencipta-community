import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const demoSeeker = await prisma.user.upsert({
    where: { email: "seeker@demo.sage" },
    update: {},
    create: {
      name: "Aya",
      email: "seeker@demo.sage",
      handle: "aya",
      headline: "Exploring a career shift into tech",
      bio: "Demo account — used for the onboarding + explore flow.",
    },
  });

  const demoMentor = await prisma.user.upsert({
    where: { email: "mentor@demo.sage" },
    update: {},
    create: {
      name: "Gökçe",
      email: "mentor@demo.sage",
      handle: "gokce",
      headline: "Startup founder · raised 2 rounds",
      bio: "Demo account — used for the connect/inbox flow.",
      sageProfile: {
        create: {
          summary:
            "Serial founder who led seed and Series A raises for a B2B SaaS, and now mentors early-stage teams.",
          skills: ["fundraising", "pitching", "b2b saas", "go-to-market"],
          interests: ["ai product design", "remote teams"],
          keywords: ["fundraising", "startup", "pitch", "investor", "saas"],
          experienceYears: 8,
        },
      },
    },
  });

  const demoMentorProfile = await prisma.sageProfile.findUnique({
    where: { userId: demoMentor.id },
  });
  if (demoMentorProfile) {
    await prisma.post.upsert({
      where: { id: "demo-post-1" },
      update: {},
      create: {
        id: "demo-post-1",
        authorId: demoMentor.id,
        content:
          "Raising your first round? Start with 20 conversations, not a deck. #fundraising #startups",
      },
    });
  }

  console.log("Seed done:");
  console.log(`  seeker demo: ${demoSeeker.handle}`);
  console.log(`  mentor demo: ${demoMentor.handle}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
