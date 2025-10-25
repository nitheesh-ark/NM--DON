import express from "express";
import multer from "multer";
import path from "path";
import { Item } from "../models/item.js"; // relative path

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const itemData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? req.file.filename : "default-product.png"
    };
    const newItem = new Item(itemData);
    await newItem.save();
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
