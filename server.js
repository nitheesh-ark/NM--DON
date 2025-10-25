import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import methodOverride from "method-override";
import path from "path";

import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import { Item } from "./models/item.js";

dotenv.config();
const app = express();

// Middlewares — MUST come before routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Serve static files (images, CSS)
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/api/items", itemRoutes);

// Connect to MongoDB
connectDB();

// Routes


// Pages

// Homepage — list all products
app.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render("index", { items });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add product page
app.get("/add", (req, res) => {
  res.render("add");
});

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
