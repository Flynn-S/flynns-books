import express from "express";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data");
const commentsPath = join(dataFolder, "comments.json");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "strive",
  },
});

const uploader = multer({ storage: cloudinaryStorage });

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/:bookasin", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    console.log("Comments: ", comments);
    const bookReqId = req.params.bookasin;
    const filteredComments = comments.filter(
      (comment) => comment.bookID === bookReqId
    );
    if (filteredComments) {
      res.send(filteredComments);
    } else {
      res.send({ message: "No comments" });
    }
  } catch (error) {
    console.log(error);
  }
});
//   try {
//     const comments = await fs.readJSON(commentsPath);

//     const comment = comments.find(
//       (comment) => comment.bookID === req.params.bookasin
//     );
//     if (comment) {
//       res.send(comment);
//     } else {
//       const err = new Error("comment not found");
//       err.httpStatusCode = 404;
//       next(err);
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

router.post("/", uploader.single("cover"), async (req, res, next) => {
  try {
    res.send({ cloudinaryURL: req.file.path });
  } catch (error) {
    next(error);
  }
});

router.put("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
