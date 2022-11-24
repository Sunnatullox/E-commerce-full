import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Brand from "../Models/BrandModule.js";
import mongoose from "mongoose";
// const { ObjectId } = mongoose.Types;

const brandRouter = express.Router();

// Admin GET all Brands
brandRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const brand = await Brand.find().sort({ _id: -1 });
      res.json(brand);
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

// Admin GET ONE BRAND
brandRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Brand.findById({ _id: id });

      return res.json(category);
    } catch (error) {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

//  create Brand 
brandRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      title,
      brandImage,
      isActive,
    } = req.body;

    try {
  
        const getBrand = await Brand.findOne({ title: title });
        if (getBrand) {
          res.status(400).json("kechirasiz bunday category avvaldan mavjud");
          return;
        }

        const newBrand = new Brand({
          title,
          brandImage,
          isActive,
        });
        await newBrand.save();

        return res.status(201).json(newBrand);
     
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

// UPDATE Brand isActive
brandRouter.put(
  "/:id/isActive",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { isActive } = req.body;
    const { id } = req.params;
    
    try {
      const brand = await Brand.findById(id);
      if (brand) {
        brand.isActive = isActive;
        const updatedCategor = await brand.save();
        res.json(updatedCategor);
      } else{
        res.status(404);
        throw new Error("brand not Found");
      }
    } catch (error) {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// DELETE BRAND
brandRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const brand = await Brand.findById(id);
      if (brand) {
        await brand.remove();
        res.json({ message: "Brand deleted" });
      }else{
        res.status(404);
        throw new Error("brand not Found");
      }
    } catch (error) {
      res.status(404);
      throw new Error("Brand not Found");
    }
  })
);

// UPDATE PRODUCT
brandRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, brandImage, isActive } = req.body;
    const { id } = req.params;
    const brand = await Brand.findById(id);
    try {
      if (brand) {
        brand.title = title || brand.title;
        brand.brandImage = brandImage || brand.brandImage;
        brand.isActive = isActive;
        
        const updatedCategory = await brand.save();
        res.json(updatedCategory);
      } else{
        res.status(404);
        throw new Error("brand not Found");
      }
    } catch (err) {
      res.status(500);
      throw new Error("server error");
    }
  })
);

export default brandRouter;
