import React, { useState } from "react";
import { useSelector } from "react-redux";
import { queryClient } from "../main";
import { createShortUrl } from "../apis/ShortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 p-6 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl max-w-xl mx-auto">
      {/* URL Input */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white placeholder-gray-400 transition"
        />
      </div>

      {/* Custom Slug (Authenticated Users) */}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="your-custom-alias"
            className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white placeholder-gray-400 transition"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Shorten URL
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">
          {error}
        </div>
      )}

      {/* Shortened URL Display */}
      {shortUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">
            Your shortened URL:
          </h2>
          <div className="flex items-center overflow-hidden rounded-xl border border-emerald-300 bg-gray-50">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-4 py-2 bg-transparent text-sm outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
