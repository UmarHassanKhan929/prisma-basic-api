const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

router.get("/", async (req, res, next) => {
  res.send({
    message: "Hello API, it worko",
  })
})

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({})
    res.send(categories)
  } catch (err) {
    next(err)
  }
})

router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    })
    res.send(products)
  } catch (err) {
    next(err)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, categoryId } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
      },
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.put("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, price, categoryId } = req.body
    const product = await prisma.product.update({
      include: {
        category: true,
      },
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price,
        categoryId,
      },
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
