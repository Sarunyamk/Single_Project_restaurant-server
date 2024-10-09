
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const img = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"

const menuItem = [
	{ menuName: "main", categoryId: 1, price: 10, description: "pizza1 description", image: img },
	{ menuName: "salad", categoryId: 2, price: 10, description: "pizza1 description", image: img },
	{ menuName: "sandwich", categoryId: 3, price: 10, description: "pizza1 description", image: img },
	{ menuName: "snack", categoryId: 4, price: 10, description: "pizza1 description", image: img },
	{ menuName: "beverage", categoryId: 5, price: 10, description: "pizza1 description", image: img },
	// {menuName : "burger1", categoryId : 1, price : 10, description : "burger description" , image : img},
	// {menuName : "burger2", categoryId : 1, price : 10, description : "burger description" , image : img},
	// {menuName : "burger3", categoryId : 1, price : 10, description : "burger description" , image : img},
	// {menuName : "burger4", categoryId : 1, price : 10, description : "burger description" , image : img},
	// {menuName : "burger5", categoryId : 1, price : 10, description : "burger description" , image : img},
	// {menuName : "steak2", categoryId : 3, price : 10, description : "steak description" , image : img},
	// {menuName : "steak3", categoryId : 3, price : 10, description : "steak description" , image : img},
	// {menuName : "steak1", categoryId : 3, price : 10, description : "steak description" , image : img},
	// {menuName : "steak4", categoryId : 3, price : 10, description : "steak description" , image : img},
	// {menuName : "steak5", categoryId : 3, price : 10, description : "steak description" , image : img},
	// {menuName : "salad1", categoryId : 4, price : 10, description : "salad description" , image : img},
	// {menuName : "salad2", categoryId : 4, price : 10, description : "salad description" , image : img},
	// {menuName : "salad3", categoryId : 4, price : 10, description : "salad description", image : img},
	// {menuName : "salad4", categoryId : 4, price : 10, description : "salad description", image : img},
	// {menuName : "salad5", categoryId : 4, price : 10, description : "salad description", image : img},
	// {menuName : "sandwich1", categoryId : 5, price : 10, description : "sandwich1 description", image : img},
	// {menuName : "sandwich2", categoryId : 5, price : 10, description : "sandwich1 description", image : img},
	// {menuName : "sandwich3", categoryId : 5, price : 10, description : "sandwich1 description", image : img},
	// {menuName : "sandwich4", categoryId : 5, price : 10, description : "sandwich1 description", image : img},
	// {menuName : "sandwich5", categoryId : 5, price : 10, description : "sandwich1 description", image : img},
	// {menuName : "snack1", categoryId : 6, price : 10, description : "snack description", image : img},
	// {menuName : "snack2", categoryId : 6, price : 10, description : "snack description", image : img},
	// {menuName : "snack3", categoryId : 6, price : 10, description : "snack description", image : img},
	// {menuName : "snack4", categoryId : 6, price : 10, description : "snack description", image : img},
	// {menuName : "snack5", categoryId : 6, price : 10, description : "snack description", image : img},
	// {menuName : "main1", categoryId : 7, price : 10, description : "main description", image : img},
	// {menuName : "main2", categoryId : 7, price : 10, description : "main description", image : img},
	// {menuName : "main3", categoryId : 7, price : 10, description : "main description", image : img},
	// {menuName : "bev1", categoryId : 8, price : 10, description : "bev description", image : img},
	// {menuName : "bev2", categoryId : 8, price : 10, description : "bev description", image : img},
	// {menuName : "bev3", categoryId : 8, price : 10, description : "bev description", image : img},
	// {menuName : "bev4", categoryId : 8, price : 10, description : "bev description", image : img},
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
