import express from "express";
import { productController } from "../controller/productController.js";
import { ensureAuthentication } from "../middleware/userAuthenticated.js";

const productroute = express.Router();

productroute.route("/product").get(ensureAuthentication, productController)

export default productroute