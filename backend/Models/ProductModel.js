import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type:Boolean,
      default:true,
      required:true
    },
    category: {
      type: Object,
      categoryTitle:{
        type: String,
        required:true
      },
      categoryId:{
        type: ObjectId,
        ref:"Category",
        required:true
      }
    },
    brand:{
      type: Object,
      brandTitle:{
        type: String,
        required:true
      },
      brandId:{
        type: ObjectId,
        ref:"Brand",
        required:true
      }
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
