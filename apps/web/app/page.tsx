"use client";

import Link from "next/link";
import Image from "next/image";

const SUPPORTED_FORMATS = [
  { name: "SmartWare II", ext: ".ws", era: "1980s-1990s" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full text-center">
          {/* Hero graphic */}
          <div className="mb-6">
            <Image
              src="/hero.svg"
              alt="Vintage computer with Indiana Jones hat and whip"
              width={450}
              height={180}
              className="mx-auto"
              priority
            />
          </div>

          {/* Indiana Jones quote */}
          <p className="text-xl md:text-2xl font-serif italic text-gray-800 mb-2">
            "It belongs in a museum!"
          </p>

          {/* Attribution */}
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-12">
            Digital archaeology by teleports.cloud labs
          </p>

          {/* Logo/Title */}
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-black mb-8">
            Labs
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Rescue data trapped in obsolete file formats.
            <br className="hidden md:block" />
            Convert legacy files from the 1970s–2000s into modern formats.
          </p>

          {/* Terminal button */}
          <Link
            href="/terminal"
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-black text-white text-xl font-medium hover:bg-gray-800 transition-all rounded-lg shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Launch Converter
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>

      {/* Supported Formats Footer */}
      <div className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2">
            Supported Formats
          </p>
          <p className="text-sm font-mono text-gray-600">
            {SUPPORTED_FORMATS.map((format, idx) => (
              <span key={idx}>
                {format.name} ({format.ext}) · {format.era}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
