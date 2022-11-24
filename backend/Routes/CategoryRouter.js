import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Catigory from "../Models/CatigoryModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const categoryRouter = express.Router();

// GET ALL CATEGORY
categoryRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const categorys = await Catigory.find({}).sort({ _id: -1 });
      res.json(categorys);
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

// GET SINGLE Catigory
categoryRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Catigory.findById({ _id: id });

      const subCategory = await Catigory.findOne({ "subcatigory._id": id });

      if (category) {
        return res.json(category);
      } else if (!category) {
        const findSubCategory = subCategory.subcatigory.find(
          (value) => value._id.toString() === id.toString()
        );

        return res.json(findSubCategory);
      }
    } catch (error) {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

//  create Categories and subCategories
categoryRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      catigoryImage,
      keywords,
      isActive,
      categoryId,
    } = req.body;

    try {
      if (!categoryId) {
        const getCatigory = await Catigory.findOne({ title: title });
        if (getCatigory) {
          res.status(400).json("kechirasiz bunday category avvaldan mavjud");
          return;
        }

        const newCategory = new Catigory({
          title,
          catigoryImage,
          isActive,
          description,
          keywords,
        });
        await newCategory.save();

        return res.status(201).json(newCategory);
      } else {
        const getCatigory = await Catigory.findById({
          _id: categoryId,
        });

        // add new category if categoryId not found
        if (!getCatigory) {
          const newCategory = new Catigory({
            title,
            catigoryImage,
            description,
            keywords,
          });
          await newCategory.save();
          return res.status(201).json(newCategory);
        }
        // Check whether there is a subCategory
        const CheckSubCategory = getCatigory.subcatigory.find(
          (item) => item.title.toString() === title.toString()
        );
        if (CheckSubCategory) {
          res.status(400);
          throw new Error("kechirasiz bunday sub category avvaldan mavjud");
        }

        const subCategory = {
          subcatigoryTitle: title,
          subcatigoryCatigoryImage: catigoryImage,
          subcatigoryDescription: description,
          subcatigoryKeywords: keywords,
          subcatigoryIsActive: isActive,
        };
        getCatigory.subcatigory.push(subCategory);
        const newSubCategory = await getCatigory.save();

        return res.status(201).json(newSubCategory);
      }
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  })
);

// UPDATE Ctegory isActive
categoryRouter.put(
  "/:id/isActive",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { isActive } = req.body;
    const { id } = req.params;
    const categor = await Catigory.findById(id);
    const subCategory = await Catigory.findOne({ "subcatigory._id": id });

    try {
      if (categor) {
        categor.isActive = isActive;
        const updatedCategor = await categor.save();
        res.json(updatedCategor);
      } else if (!categor) {
        const findSubCategory = subCategory.subcatigory.find(
          (value) => value._id.toString() === id.toString()
        );
        const isActiveSubCategory = {
          "subcatigory.$.subcatigoryIsActive":
            isActive !== null ? isActive : findSubCategory.subcatigoryIsActive,
        };

        await Catigory.updateOne(
          { "subcatigory._id": id },
          {
            $set: isActiveSubCategory,
          },
          { new: true }
        );
        return res.json(subCategory);
      }
    } catch (error) {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// DELETE Catigory
categoryRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Catigory.findById(id);
    const subCategory = await Catigory.findOne({ "subcatigory._id": id });
    try {
      if (category) {
        await category.remove();
        res.json({ message: "Category deleted" });
      } else if(!category) {
        const findSubCategory = subCategory.subcatigory.find(
          (value) => value._id.toString() === id.toString()
        );
        if (findSubCategory) {
          subCategory.subcatigory.pull({_id:id})
          await subCategory.save()
          res.json({message:"Category deleted"})
      }
    }
    } catch (error) {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);

// UPDATE PRODUCT
categoryRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, description, catigoryImage, keywords, isActive } = req.body;
    const { id } = req.params;
    const category = await Catigory.findById(req.params.id);
    const subCategory = await Catigory.findOne({ "subcatigory._id": id });
    try {
      if (category) {
        category.title = title || category.title;
        category.description = description || category.description;
        category.catigoryImage = catigoryImage || category.catigoryImage;
        category.keywords = keywords || category.keywords;
        category.isActive = isActive !== null ? isActive : category.isActive;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
      } else if (!category) {
        const findSubCategory = subCategory.subcatigory.find(
          (value) => value._id.toString() === id.toString()
        );

        const newSubCategory = {
          "subcatigory.$.subcatigoryTitle":
            title !== "" ? title : findSubCategory.subcatigoryTitle,
          "subcatigory.$.subcatigoryCatigoryImage":
            catigoryImage || findSubCategory.subcatigoryCatigoryImage,
          "subcatigory.$.subcatigoryDescription":
            description || findSubCategory.subcatigoryDescription,
          "subcatigory.$.subCatigoryKeywords":
            keywords || findSubCategory.subcatigoryCatigoryImage,
          "subcatigory.$.subcatigoryIsActive":
            isActive !== null ? isActive : findSubCategory.subcatigoryIsActive,
        };

        await Catigory.updateOne(
          { "subcatigory._id": id },
          {
            $set: newSubCategory,
          },
          { new: true }
        );

        const updatedSubCategory = await Catigory.findOne({
          "subcatigory._id": id,
        });

        return res.status(201).json(updatedSubCategory);
      } else {
        res.status(409);
        throw new Error("subCategory not Updated");
      }
    } catch (err) {
      res.status(404);
      throw new Error("server error");
    }
  })
);

export default categoryRouter;
