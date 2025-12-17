# Exa Search Engine

A semantic search engine leveraging LLM technology through the Exa API to deliver intelligent, context-aware search results across multiple platforms.

![Python](https://img.shields.io/badge/Python-3.7+-blue.svg) ![Flask](https://img.shields.io/badge/Flask-3.1+-green.svg)

## Overview

This project implements a full-stack web application that provides semantic search capabilities across various content platforms. Unlike traditional keyword-based search, it uses natural language processing to understand query intent and content context.

**Key Technologies:**
- Backend: Python, Flask
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- API Integration: Exa API for semantic search
- Design: Glassmorphism UI with responsive layout

## Features

- **Semantic Search Engine**: Neural network-based search understanding query context
- **Multi-Platform Support**: Integrated search across TikTok, Twitter, Wikipedia, Academic Papers, News, and GitHub
- **Modern Web Interface**: Responsive design with glassmorphism effects and smooth animations
- **RESTful API**: Clean backend architecture with JSON responses
- **Secure Configuration**: Environment-based API key management
- **Dual Interface**: Web application and command-line tool

## Technical Implementation

### Backend Architecture
- Flask web server with modular route handling
- Dynamic search parameter configuration based on platform presets
- Error handling and validation middleware
- Environment variable management for secure API key storage

### Frontend Design
- CSS custom properties for maintainable theming
- Async JavaScript for non-blocking API calls
- Dynamic DOM manipulation for result rendering
- Keyboard shortcuts and accessibility features
- Mobile-first responsive design

### Search Presets
Configured search parameters optimized for different content types:
- Social media (TikTok, Twitter)
- Knowledge bases (Wikipedia)
- Academic content (Research papers)
- Developer resources (GitHub)
- News aggregation

## Installation

```bash
# Clone repository
git clone https://github.com/coderG13/exa-search-engine.git
cd exa-search-engine

# Install dependencies
pip3 install -r requirements.txt

# Configure API key
cp .env.example .env
# Edit .env and add your Exa API key
```

## Usage

### Web Application
```bash
python3 app.py
```
Navigate to `http://localhost:5001`

### CLI Tool
```bash
python3 main.py
```

## Project Structure

```
├── app.py              # Flask application and API routes
├── main.py             # Command-line interface
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html     # Main web interface
├── static/
│   ├── style.css      # Styling and animations
│   └── script.js      # Frontend logic
└── .env.example       # Environment configuration template
```

## API Configuration

The application uses the Exa API for semantic search capabilities. Key parameters:

- `type`: Search algorithm (`neural` for semantic, `keyword` for exact match)
- `num_results`: Result count (default: 10)
- `category`: Content type filtering
- `include_domains`: Platform-specific searches

## Development Notes

**Security**: API keys are managed through environment variables and excluded from version control via `.gitignore`.

**Scalability**: Modular preset configuration allows easy addition of new search platforms.

**Performance**: Async frontend operations ensure responsive UI during API calls.

## Requirements

- Python 3.7+
- Flask 3.1+
- Exa API key ([exa.ai](https://exa.ai))

## License

MIT License
