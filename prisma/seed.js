
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const category = [
	{ categoryName: "mains" },
	{ categoryName: "salads" },
	{ categoryName: "sandwichs" },
	{ categoryName: "snacks" },
	{ categoryName: "beverages" },
]

console.log('DB seed...')

async function run() {
	await prisma.category_items.createMany({ data: category })
}

run()
