import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ユーザーは provider 非依存の upsert で冪等化
  const users = [
    { email: 'alice@example.com', name: 'Alice' },
    { email: 'bob@example.com',   name: 'Bob'   },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name },
      create: u,
    });
  }

  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  if (alice) {
    // 投稿も upsert（id を固定して二重作成を防止）
    await prisma.post.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        userId: alice.id,
        title: 'Hello Next.js',
        body: 'Getting started with Next.js 15',
        publishedAt: new Date(),
      },
    });
  }
}

main()
  .then(() => console.log('Seed completed'))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => prisma.$disconnect());
