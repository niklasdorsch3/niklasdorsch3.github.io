#!/usr/bin/env python3
"""
Simple HTTP server for local development of the portfolio website.
This resolves CORS issues when testing the component system locally.

Usage:
    python3 serve-locally.py
    
Then open: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎨 Niklas Dorsch Portfolio - Local Development Server")
        print(f"📁 Serving from: {os.getcwd()}")
        print(f"🌐 Open in browser: http://localhost:{PORT}")
        print(f"⚡ Components and JSON will load correctly")
        print(f"🛑 Press Ctrl+C to stop")
        print()
        
        # Automatically open browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()