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
import socket

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def find_free_port(start_port=8000):
    """Find a free port starting from start_port"""
    for port in range(start_port, start_port + 10):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Find a free port
    free_port = find_free_port(PORT)
    if not free_port:
        print("❌ No free ports available in range 8000-8009")
        return
    
    with socketserver.TCPServer(("", free_port), MyHTTPRequestHandler) as httpd:
        print(f"🎨 Niklas Dorsch Portfolio - Local Development Server")
        print(f"📁 Serving from: {os.getcwd()}")
        print(f"🌐 Open in browser: http://localhost:{free_port}")
        print(f"⚡ Components and JSON will load correctly")
        print(f"🛑 Press Ctrl+C to stop")
        print()
        
        # Automatically open browser
        webbrowser.open(f'http://localhost:{free_port}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()