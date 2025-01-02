import express from "express";

// controller
import { signin } from "../controller/signinController.js";
import { login } from "../controller/loginController.js";

// validator/ middleware
import { loginValidator } from "../middleware/loginValidator.js";
import { signinValidator } from "../middleware/signinValidator.js";


// route initialize
const authroute = express.Router();

// path initialize
authroute.route("/signin").post(signinValidator,signin)
authroute.route("/login").post(loginValidator, login)

export default authroute;