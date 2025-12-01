#!/usr/bin/env python3
"""
Web server that provides HTTP health checks and Textual WebSocket
"""

import os
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()


@app.get("/")
async def root():
    """Health check and info page"""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Historic File Format Viewer - TUI</title>
        <style>
            body {
                font-family: monospace;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
            }
            h1 { border-bottom: 2px solid #000; }
            .status { color: green; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>Historic File Format Viewer</h1>
        <p class="status">✓ Service is running</p>
        <p>This service hosts a Terminal User Interface (TUI) for historic file format conversion.</p>
        <h2>Access Methods:</h2>
        <ul>
            <li><strong>Terminal:</strong> <code>ssh tui@labs-teleports-cloud.onrender.com</code></li>
            <li><strong>Web TUI:</strong> Connect via WebSocket (coming soon)</li>
        </ul>
        <p><small>Render.com deployment</small></p>
    </body>
    </html>
    """
    return HTMLResponse(content=html)


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok", "service": "historic-format-viewer"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    print(f"Starting web server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
