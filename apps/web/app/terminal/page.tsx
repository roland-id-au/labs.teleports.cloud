"use client";

import { useEffect, useState } from "react";

interface FileItem {
  name: string;
  size: number;
  path: string;
}

export default function TerminalPage() {
  const [inputFiles, setInputFiles] = useState<FileItem[]>([]);
  const [outputFiles, setOutputFiles] = useState<FileItem[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Create session on mount
    createSession();
  }, []);

  async function createSession() {
    try {
      const response = await fetch("https://labs-teleports-cloud.onrender.com/api/session/create", {
        method: "POST",
      });
      const data = await response.json();
      setSessionId(data.session_id);
      document.cookie = `session_id=${data.session_id}; path=/`;
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  }

  async function refreshFiles() {
    if (!sessionId) return;
    try {
      const response = await fetch(
        `https://labs-teleports-cloud.onrender.com/api/session/${sessionId}/files`
      );
      const data = await response.json();
      // TODO: Separate input vs output files
      setInputFiles(data.files || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* File Browser Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-mono text-sm font-bold">Files</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Input Files Section */}
          <div className="p-3">
            <h3 className="text-gray-400 font-mono text-xs uppercase mb-2">Input</h3>
            {inputFiles.length === 0 ? (
              <p className="text-gray-500 font-mono text-xs">No files yet</p>
            ) : (
              <div className="space-y-1">
                {inputFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="text-white font-mono text-xs p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="truncate">{file.name}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Output Files Section */}
          <div className="p-3 border-t border-gray-800">
            <h3 className="text-gray-400 font-mono text-xs uppercase mb-2">Output</h3>
            {outputFiles.length === 0 ? (
              <p className="text-gray-500 font-mono text-xs">No output files</p>
            ) : (
              <div className="space-y-1">
                {outputFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="text-white font-mono text-xs p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="truncate">{file.name}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TUI Main Pane */}
      <div className="flex-1">
        <iframe
          src="https://labs-teleports-cloud.onrender.com"
          className="w-full h-full border-0"
          title="Historic Format Viewer TUI"
        />
      </div>
    </div>
  );
}
