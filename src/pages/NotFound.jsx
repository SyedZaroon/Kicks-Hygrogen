import React, { useState } from "react";
import { Link } from "react-router-dom";


const TOKENS = {
  paper: "#FFFFFF",
  ink: "#1F1F1D",
  muted: "#6B6A66",
  line: "#E7E5E0",
  blue: "#4D6EE0",
  blueDark: "#3B57C4",
};


export default function NotFound({ onNavigate, cartCount = 0 }) {



  return (
    <div>
      <main className="flex-1 flex items-center justify-center px-5 sm:px-10 py-14 sm:py-20">
        <div className="w-full max-w-lg text-center">
          <div
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(4.5rem, 16vw, 7rem)",
              lineHeight: 0.9,
              color: TOKENS.ink,
              letterSpacing: "-0.03em",
            }}
          >
            404
          </div>

          <h1
            className="mt-4 mb-3"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: TOKENS.ink,
            }}
          >
            WRONG PAGE.
            <br />
            STILL THE <span style={{ color: TOKENS.blue }}>RIGHT</span> SHOP.
          </h1>

          <p
            className="mb-8 text-sm sm:text-base max-w-sm mx-auto"
            style={{ color: TOKENS.muted }}
          >
            The page you were looking for doesn't exist. Let's get you back in
            step with something we've actually got in stock.
          </p>

          <Link
            to="/collection/all-products"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: TOKENS.ink, color: "#fff" }}
          >
            Back to shop
          </Link>
        </div>
      </main>
    </div>
  );
}
