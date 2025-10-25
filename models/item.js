import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "default-product.png" } // default if no image
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
