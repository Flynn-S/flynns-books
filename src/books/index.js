import express from "express"
import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 } from "cloudinary"

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data")
const booksPath = join(dataFolder, "books.json")

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "strive",
  },
})

const uploader = multer({ storage: cloudinaryStorage })

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const books = await fs.readJSON(booksPath)
    res.send(books)
  } catch (error) {
    next(error)
  }
})

router.get("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

router.post("/", uploader.single("cover"), async (req, res, next) => {
  try {
    res.send({ cloudinaryURL: req.file.path })
  } catch (error) {
    next(error)
  }
})

router.put("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

router.delete("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

export default router
