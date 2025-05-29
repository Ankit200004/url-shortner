import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url, customSlug = null) => {
    const shortCode = customSlug || generateNanoId(7);
    if (!shortCode) throw new Error("Short URL not generated");


    await saveShortUrl(shortCode, url);
    return shortCode;
};

export const createShortUrlWithUser = async (url, userId, customSlug = null) => {
    const shortCode = customSlug || generateNanoId(7);
    if (!shortCode) throw new Error("Short URL not generated");


    await saveShortUrl(shortCode, url, userId);
    return shortCode;
};
