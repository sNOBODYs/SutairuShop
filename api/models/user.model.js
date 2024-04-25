import mongoose from "mongoose";

// Simple encryption function using btoa()
const encryptFieldName = (fieldName) => {
    // Perform encryption logic here
    return btoa(fieldName);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    resetToken: {
        type: String,
        default:"",
    },
    resetTokenExparation: {
        type: Date,
        default:null,
    },
    [encryptFieldName("privilege")]: {
        type: Number,
        default: 0, // Admin privilege
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;