# 🔍 Exa Search Engine

A beautiful, modern semantic search engine powered by the [Exa API](https://exa.ai) and large language models (LLMs). Unlike traditional keyword-based search engines, this application understands both your queries and web content semantically, delivering highly relevant results.

![Search Engine Preview](https://img.shields.io/badge/Python-3.7+-blue.svg) ![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg) ![License](https://img.shields.io/badge/license-MIT-orange.svg)

## ✨ Features

- 🎯 **Semantic Search**: Powered by Exa's LLM technology for intelligent, context-aware search
- 🎨 **Premium UI**: Modern glassmorphism design with smooth animations and gradients
- 🚀 **Multiple Search Presets**: Quick search across TikTok, Twitter, Wikipedia, Academic Papers, News, and GitHub
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- ⚡ **Fast & Efficient**: Built with Flask for quick response times
- 🔒 **Secure**: Environment-based API key management
- 💻 **Dual Interface**: Both CLI and web-based interfaces included

## 🎯 Search Presets

- **TikTok** 📱 - Search TikTok videos and content
- **Twitter** 🐦 - Find tweets and discussions
- **Wikipedia** 📚 - Search Wikipedia articles
- **Academic Papers** 📄 - Discover research papers
- **News** 📰 - Find news articles
- **GitHub** 💻 - Search GitHub repositories

## 🚀 Getting Started

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)
- An Exa API key (get 1000 free requests at [exa.ai](https://exa.ai))

### Installation

1. **Clone or download this project**

2. **Navigate to the project directory**
   ```bash
   cd exa-search-engine
   ```

3. **Install dependencies**
   ```bash
   pip3 install -r requirements.txt
   ```

4. **Set up your API key**
   
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Exa API key:
   ```
   EXA_API_KEY=your_actual_api_key_here
   ```
   
   > **Getting your API key**: 
   > 1. Sign up at [exa.ai](https://exa.ai)
   > 2. Navigate to "Overview" in your dashboard
   > 3. Copy your API key
   > 4. Paste it in the `.env` file

## 💻 Usage

### Web Interface (Recommended)

1. **Start the Flask server**
   ```bash
   python3 app.py
   ```

2. **Open your browser**
   
   Navigate to: `http://localhost:5001`

3. **Start searching!**
   - Enter your query in the search box
   - Select a search preset (optional)
   - Click "Search" or press Enter
   - View beautifully formatted results

**Keyboard Shortcut**: Press `Ctrl/Cmd + K` to quickly focus the search input.

### Command Line Interface

For a simple CLI experience following the tutorial:

```bash
python3 main.py
```

This will search TikTok for coffee-related content based on your query.

## 🎨 Customization

### Modify Search Presets

Edit `app.py` to customize search presets:

```python
SEARCH_PRESETS = {
    'custom': {
        'domains': ['https://example.com'],
        'type': 'neural',
        'num_results': 10,
        'description': 'Custom search preset'
    }
}
```

### Adjust Number of Results

In `app.py`, modify the `num_results` parameter:

```python
search_params = {
    'query': query,
    'num_results': 20,  # Change this value
    'use_autoprompt': True
}
```

### Customize Styling

Edit `static/style.css` to change colors, fonts, or animations:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #your-color 0%, #your-color 100%);
    /* Modify other CSS variables */
}
```

## 📚 Exa API Features

The Exa API supports many powerful search filters:

- `num_results`: Number of results to return (default: 10)
- `type`: Search type - `'neural'` (semantic) or `'keyword'` (exact match)
- `include_domains`: List of domains to search within
- `exclude_domains`: List of domains to exclude
- `category`: Focus on specific content types (tweet, news, papers, github, etc.)
- `start_published_date`: Filter by publication date
- `use_autoprompt`: Automatically optimize your query

**Example**: Search Twitter for pizza recommendations since May 2023:

```python
response = exa.search(
    'best pizza in Brooklyn',
    num_results=10,
    start_published_date='2023-05-01',
    category='tweet',
    use_autoprompt=True
)
```

## 🛠️ Project Structure

```
exa-search-engine/
├── app.py                 # Flask web application
├── main.py                # CLI search tool
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variable template
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── templates/
│   └── index.html        # Web interface HTML
└── static/
    ├── style.css         # Styling and animations
    └── script.js         # Frontend JavaScript
```

## 🔒 Security Notes

- **Never commit your `.env` file** - It contains your API key
- **Keep your API key private** - Don't share it publicly
- The `.gitignore` file is configured to exclude `.env` automatically

## 🐛 Troubleshooting

### "EXA_API_KEY not found" error

Make sure you've created a `.env` file with your API key:
```
EXA_API_KEY=your_api_key_here
```

### Module not found errors

Install all dependencies:
```bash
pip3 install -r requirements.txt
```

### Port 5000 already in use

Change the port in `app.py`:
```python
app.run(debug=True, port=5001)  # Use a different port
```

## 📖 Resources

- [Exa API Documentation](https://docs.exa.ai)
- [Exa API Cheat Sheet](https://docs.exa.ai/reference/cheat-sheet)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Google for Developers: Intro to LLMs](https://developers.google.com/machine-learning/resources/intro-llms)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! Some ideas:

- Add more search presets
- Implement search history
- Add result filtering and sorting
- Create a dark/light mode toggle
- Add export functionality for results

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built following the [Codédex Exa API Tutorial](https://www.codedex.io)
- Powered by [Exa API](https://exa.ai)
- UI inspired by modern web design trends

---

**Happy Searching!** 🚀✨

If you find this useful, consider sharing it with others learning about LLMs and semantic search!
