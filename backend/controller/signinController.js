import userAuthModel from "../models/userAuthModel.js";
import bcrypt from "bcryptjs";

export const signin = async (req, res) => {
    try {
        const userData = new userAuthModel(req.body);
        const { name, email, passkey, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res
                .status(400)
                .json({ success: true, message: "Password not match" })
        }

        const userExist = await userAuthModel.findOne({ email })
        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "user is already exists" })
        }

        const salt_round = 10;
        const hashPassword = await bcrypt.hash(password, salt_round,);
        userData.password = hashPassword;

        const hashKey = await bcrypt.hash(passkey, salt_round);
        userData.passkey = hashKey;

        await userData.save();
        return res
        .status(201)
        .json({ success: true, message: "user register successful "})

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" })
    }
}