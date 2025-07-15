import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserUrls } from "../apis/user.api";

const UserUrl = () => {
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  });
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl mt-8 shadow-2xl overflow-hidden border border-emerald-200 max-w-6xl mx-auto">
      <div className="overflow-x-auto h-64">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Short URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-emerald-50 transition">
                <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-800">
                  {url.full_url}
                </td>
                <td className="px-6 py-4 text-sm text-emerald-600">
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-emerald-800"
                  >
                    {`localhost:3000/${url.short_url}`}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                    {url.click} {url.click === 1 ? "click" : "clicks"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() =>
                      handleCopy(
                        `http://localhost:3000/${url.short_url}`,
                        url._id
                      )
                    }
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors shadow-sm ${
                      copiedId === url._id
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                    } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-400`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          />
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;
