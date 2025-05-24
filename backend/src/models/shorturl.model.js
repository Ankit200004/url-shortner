import mongoose from "mongoose";

const shorturlSchema = mongoose.Schema({
    full_url:{
        type: String,
        require: true,
    },
    short_url:{
        type: String,
        unique: true,
        require: true,
    },
    click:{
        type: Number,
        require: true,
        default:0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const shortUrl = mongoose.model("shorturl", shorturlSchema);

export default shortUrl;
