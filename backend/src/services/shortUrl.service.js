import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    if (!shortUrl) throw new Error("Short Url is not Generated"); 
    await saveShortUrl( shortUrl, url )
    return shortUrl;
}

export const createShortUrlWithUser = async (url,userId) => {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl( url, shortUrl, userId)
    return shortUrl;
}