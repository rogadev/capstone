const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { log } = console

async function main() {
  log('Seeding database...')
  await prisma.preference.create({
    data: {
      colorMode: 'dark',
    },
  })
  log('Preference seeding complete.')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
