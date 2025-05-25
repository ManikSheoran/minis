"use client";

import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!url) {
      alert("Please enter a URL to shorten.");
      return;
    }

    fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.shortenedUrl) {
          setShortenedUrl(data.shortenedUrl);
        } else {
          alert("Error shortening URL. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while shortening the URL.");
      });
    setUrl("");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-2">Mini-it</h1>
      <p className="text-lg text-gray-700 mb-4">A minimal URL shortener</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
        <input
          type="text"
          placeholder="Enter URL to shorten"
          className="border border-foreground rounded p-2 mb-4 w-80"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-foreground text-white rounded p-2 hover:bg-foreground/80 transition-colors duration-200 flex items-center justify-center w-80"
        >
          Shorten URL
        </button>
      </form>
      {shortenedUrl && (
        <div>
          <p className="mt-4 text-lg text-gray-700">
            Shortened URL:{" "}
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              <span className="text-blue-500 hover:underline">
                {shortenedUrl}
              </span>
            </a>
          </p>
        </div>
      )}
      <footer className="mt-8 text-sm text-gray-500">
        &copy; 2025 Mini-it. All rights reserved.
      </footer>
    </main>
  );
}
