import mongoose from "mongoose"

const userAuthModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email should be unique"],
        lowercase: true,
        trim: true,
    },
    passkey: {
        type: String,
        required: [true, "PassKey is required"],
        trim: true,
        minlength: [4, "Minimum length should be 4"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Minimum length should be 8"]
    }
})

export default mongoose.model("authUser", userAuthModel)