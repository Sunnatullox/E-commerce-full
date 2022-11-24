import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brandImage: {
      type:String,
      required:true
    },
    productsId:[{
      type: ObjectId,
      ref:"Product"
    }],
    isActive: {
      type:Boolean,
      default:true,
      required:true
    },
  },
  {
    timestamps: true,
  }
);
const Brand = model("Brand", brandSchema);
export default Brand;
