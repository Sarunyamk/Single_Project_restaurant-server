require('dotenv').config()
const prisma = require('../config/prisma')


async function run() {
	await prisma.$executeRawUnsafe('DROP DATABASE project-restaurant')
	await prisma.$executeRawUnsafe('CREATE DATABASE project-restaurant')
}

console.log('Reset DB...')
run()
