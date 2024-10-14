
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const img = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

const menuItem = [
	{ menuName: "steak", categoryId: 1, price: 200, description: "pizza1 description pizza1 description", image: img },
	{ menuName: "salad", categoryId: 2, price: 150, description: "pizza1 description pizza1 description", image: img },
	{ menuName: "sandwich", categoryId: 3, price: 400, description: "pizza1 description pizza1 description", image: img },
	{ menuName: "snack", categoryId: 4, price: 89, description: "pizza1 description pizza1 description", image: img },
	{ menuName: "beverage", categoryId: 5, price: 25, description: "pizza1 description", image: img },

]
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
	await prisma.menu_items.createMany({ data: menuItem })
}

run()
