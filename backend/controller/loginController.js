import userAuthModel from "../models/userAuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const userData = new userAuthModel(req.body);
        const { email, password } = req.body;

        const userExist = await userAuthModel.findOne({ email })
        if (!userExist) {
            return res
                .status(403)
                .json({ success: false, message: "Auth failed email is not exist" })
        }
        const passwordIsEqual = await bcrypt.compare(password, userExist.password);
        if (!passwordIsEqual) {
            return res
                .status(403)
                .json({ success: false, message: "Wrong password" })
        }

        const jwtToken = jwt.sign(
            {
                email: userExist.email,
                _id: userExist._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        )

        return res
        .status(200)
        .json({
            message: "Login Successfull",
            success: true,
            jwtToken,
            email,
            name: userExist.name
        })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" })
    }
}