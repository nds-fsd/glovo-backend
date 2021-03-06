const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

schema.index({ name: "text" });

const RestaurantCategory = mongoose.model("RestaurantCategory", schema);

module.exports = RestaurantCategory;
