#!/bin/bash

# Exa Search Engine - Quick Setup Script
# This script sets up the virtual environment and installs dependencies

echo "🚀 Setting up Exa Search Engine..."
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.7 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

echo ""

# Activate virtual environment and install dependencies
echo "📥 Installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  WARNING: .env file not found!"
    echo ""
    echo "Please create a .env file with your Exa API key:"
    echo "  1. Copy .env.example to .env"
    echo "  2. Add your API key from https://exa.ai"
    echo ""
    echo "Run: cp .env.example .env"
    echo "Then edit .env and add your API key"
    echo ""
else
    echo "✅ .env file found"
    echo ""
fi

echo "🎉 Ready to go!"
echo ""
echo "To start the web server:"
echo "  source venv/bin/activate"
echo "  python3 app.py"
echo ""
echo "To use the CLI:"
echo "  source venv/bin/activate"
echo "  python3 main.py"
echo ""
