import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());

const prisma = new PrismaClient()

const querySample = async() => {
    const samples = await prisma.sample.findMany()
    console.log(samples)
}

const createSample = async() => {
    await prisma.sample.create({
        data: {
            name: 'sample1'
        }
    })
    const samples = await prisma.sample.findMany()
    console.log(samples)
}

const updateSample = async() => {
    const sample = await prisma.sample.update({
        where: {id: 1},
        data: {name: "SampleUpdated"}
    })
    console.log(sample)
}

createSample().catch(err => console.log(err)).finally(() => prisma.$disconnect())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})