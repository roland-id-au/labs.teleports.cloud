#!/usr/bin/env python3
"""
Combined HTTP + Textual WebSocket server for Render deployment
"""

import os
import asyncio
from pathlib import Path
from aiohttp import web
from textual.app import App
from textual_serve.server import Server

from viewer import HistoricFormatViewer


async def health_check(request):
    """Health check endpoint for Render"""
    return web.Response(text="OK", status=200)


async def run_textual_server(port: int):
    """Run the Textual web server"""
    # Create the app
    app = HistoricFormatViewer([])

    # Create Textual server
    server = Server(app, port=port)
    await server.serve()


async def run_http_server(port: int):
    """Run HTTP server for health checks and static serving"""
    app_web = web.Application()

    # Health check endpoint
    app_web.router.add_get('/', health_check)
    app_web.router.add_get('/health', health_check)

    # Run the server
    runner = web.AppRunner(app_web)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', port)
    await site.start()

    print(f"HTTP health check server running on port {port}")

    # Keep running
    while True:
        await asyncio.sleep(3600)


async def main():
    """Main entry point - run both servers"""
    port = int(os.environ.get('PORT', 10000))

    # For now, just run textual server
    # The HTTP health checks should work with textual serve
    print(f"Starting Textual web server on port {port}")

    app = HistoricFormatViewer([])
    server = Server(app, host='0.0.0.0', port=port)

    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
