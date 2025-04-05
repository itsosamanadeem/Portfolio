const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('8008', 10);

  // Create the default user
  const user = await prisma.user.create({
    data: {
      username: 'osamanadeem20@gmail.com',
      password: hashedPassword,
    },
  });

  console.log('User created: ', user);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
