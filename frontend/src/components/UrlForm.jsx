import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../apis/ShortUrl.api";

const UrlForm = () => {
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async () => {
    setCopied(false);
    setError("");
    setShortUrl("");

    if (!value.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const res = await createShortUrl(value);

      if (typeof res.data === "string") {
        setShortUrl(res.data);
      } else if (res.data.shortUrl) {
        setShortUrl(res.data.shortUrl);
      } else {
        setError("Unexpected response from server");
        console.log("Response:", res.data);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Error connecting to server");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 rounded-3xl shadow-xl border border-blue-100 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 text-center">
        🔗 URL Shortener
      </h1>

      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Paste your long URL
        </label>
        <input
          type="url"
          id="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
        />
      </div>

      <button
        type="button"
        onClick={submitHandler}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        ✂️ Shorten URL
      </button>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm shadow-sm">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-slate-700">
            🎉 Your shortened URL:
          </h2>
          <div className="flex items-center rounded-lg overflow-hidden border border-slate-300 shadow-sm">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 text-sm bg-slate-50 text-slate-700"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-sm font-medium ${
                copied
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-800"
              } transition`}
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
