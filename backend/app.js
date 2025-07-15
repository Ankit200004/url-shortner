import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv"
const app = express();
dotenv.config("./.env")
import connectToDB from "./src/config/mongo.db.js"
import urlmaking from "./src/routes/ShortUrl.route.js"
import authRoutes from "./src/routes/auth.route.js"
import userRoutes from "./src/routes/user.route.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

app.use(express.json());
app.use(express.urlencoded({extented: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(attachUser)


app.use("/api/user",userRoutes)
app.use("/api/create",urlmaking)
app.use("/api/auth",authRoutes)

app.use(errorHandler)

app.get("/:id", redirectFromShortUrl)

app.listen(3000,()=>{
    connectToDB();
    console.log("Backend is running on http://localhost:3000");
})