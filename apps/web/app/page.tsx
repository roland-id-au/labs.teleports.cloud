"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SUPPORTED_FORMATS = [
  { name: "SmartWare II", ext: ".ws", era: "1980s-1990s", icon: "💾" },
];

const FloppyDiskGraphic = () => (
  <svg viewBox="0 0 200 240" className="w-48 h-auto mx-auto mb-6" fill="none" stroke="black" strokeWidth="2">
    {/* Floppy disk body */}
    <rect x="40" y="80" width="120" height="140" fill="white" stroke="black" strokeWidth="2"/>
    {/* Top notch */}
    <rect x="40" y="80" width="120" height="30" fill="black"/>
    {/* Label area */}
    <rect x="55" y="130" width="90" height="50" fill="white" stroke="black" strokeWidth="1.5"/>
    {/* Metal shutter */}
    <rect x="60" y="195" width="80" height="15" fill="black"/>
    {/* Lines on label */}
    <line x1="65" y1="145" x2="135" y2="145" stroke="black" strokeWidth="1" opacity="0.3"/>
    <line x1="65" y1="155" x2="135" y2="155" stroke="black" strokeWidth="1" opacity="0.3"/>
    <line x1="65" y1="165" x2="120" y2="165" stroke="black" strokeWidth="1" opacity="0.3"/>
    {/* Quote above - hand-drawn style */}
    <text x="100" y="40" fontSize="16" fontFamily="serif" fontStyle="italic" textAnchor="middle" fill="black">
      "It belongs in a museum!"
    </text>
    {/* Underline */}
    <path d="M 30 50 Q 100 55 170 50" stroke="black" strokeWidth="1" fill="none"/>
  </svg>
);

export default function LandingPage() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center">
          {/* Indiana Jones style graphic */}
          <FloppyDiskGraphic />

          {/* Logo/Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Labs
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-6 opacity-60">
            Digital Archaeology
          </p>

          {/* Description */}
          <p className="text-base md:text-lg mb-12 opacity-50 max-w-2xl mx-auto leading-relaxed">
            Recover and convert data from legacy file formats into modern, accessible formats.
            Upload historic database, spreadsheet, and word processing files from the 1970s-2000s
            for automatic conversion and data extraction.
          </p>

          {/* Terminal button */}
          <Link
            href="https://labs-teleports-cloud.onrender.com"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Open Terminal
            <span className="inline-block w-3 h-5 bg-white" style={{ opacity: showCursor ? 1 : 0 }}></span>
          </Link>
        </div>
      </div>

      {/* Supported Formats Footer */}
      <div className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4 text-center">
            Currently Supported Formats
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {SUPPORTED_FORMATS.map((format, idx) => (
              <div key={idx} className="text-center flex flex-col items-center gap-2">
                <div className="text-4xl">{format.icon}</div>
                <div className="font-semibold text-sm">{format.name}</div>
                <div className="text-xs opacity-50">{format.ext} • {format.era}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
