import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const subcatigorySchema = new Schema(
  {
    subcatigoryTitle: {
      type: String,
    },
    subcatigoryCatigoryImage: {
      type: String,
    },
    subcatigoryDescription: {
      type: String,
    },
    subcatigoryKeywords: [
      {
        type: String,
      },
    ],
    productsId:[{
      type: ObjectId,
      ref:"Product"
    }],
    subcatigoryIsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    catigoryImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: [
      {
        type: String,
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    subcatigory: [subcatigorySchema],
  },
  {
    timestamps: true,
  }
);
const Category = model("Category", categorySchema);
export default Category;
