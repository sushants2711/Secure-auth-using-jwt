import joi from "joi";

export const loginValidator = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(100).required().trim(),
    });
    const { error } = schema.validate(req.body);
    if( error ) {
        return res
        .status(400)
        .json({ message: "Bad request", error})
    }
    next()
}