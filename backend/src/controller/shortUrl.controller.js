import { getShortUrl } from "../dao/shortUrl.js";
import {
  createShortUrlWithUser,
  createShortUrlWithoutUser,
} from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  let shortUrl;

  console.log("[createShortUrl] Received:", { url, slug, user: req.user });

  if (req.user) {
    shortUrl = await createShortUrlWithUser(url, req.user._id, slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(url, slug);
  }

  console.log("[createShortUrl] Created:", shortUrl);
  res.status(200).json({
    shortUrl: process.env.APP_URL + shortUrl,
  });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;

  console.log("[redirectFromShortUrl] Resolving slug:", id);
  const url = await getShortUrl(id);
  if (!url) {
    console.error("[redirectFromShortUrl] Short URL not found for slug:", id);
    throw new Error("Short URL not found");
  }

  console.log("[redirectFromShortUrl] Redirecting to:", url.full_url);
  res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  console.log("[createCustomShortUrl] Custom slug request:", slug);
  const shortUrl = await createShortUrlWithoutUser(url, slug);
  res.status(200).json({
    shortUrl: process.env.APP_URL + shortUrl,
  });
});
