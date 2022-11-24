import express from "express";
import dotenv from "dotenv";

import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";

import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import categoryRouter from "./Routes/CategoryRouter.js";
import brandRouter from "./Routes/BrandRouter.js";

import compression from "compression";


dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// spedet for web server
app.use(compression());


// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/brands", brandRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
