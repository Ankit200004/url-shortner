import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv"
const app = express();
dotenv.config("./.env")
import connectToDB from "./src/config/mongo.db.js"
import urlmaking from "./src/routes/ShortUrl.route.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"

app.use(express.json());
app.use(express.urlencoded({extented: true}))
app.use(cors())

app.use("/api/create",urlmaking)

app.use(errorHandler)

app.get("/:id", redirectFromShortUrl)

app.listen(3000,()=>{
    connectToDB();
    console.log("Backend is running on http://localhost:3000");
})