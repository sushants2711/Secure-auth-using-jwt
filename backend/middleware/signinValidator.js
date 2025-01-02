import joi from "joi";

export const signinValidator = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).max(40).required().trim(),
        email: joi.string().email().required().trim(),
        passkey: joi.string().min(4).max(30).required().trim(),
        password: joi.string().min(8).max(100).required().trim(),
        confirmpassword: joi.string().min(8).max(100).required().trim()
    });
    const { error } = schema.validate(req.body);
    if( error ) {
        return res
        .status(400)
        .json({ message: "Bad request", error})
    }
    next()
}