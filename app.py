"""
Custom Search Engine - Web Application
Flask backend for the Exa-powered search engine with multiple search presets
"""

from flask import Flask, render_template, request, jsonify
from exa_py import Exa
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Exa with API key
api_key = os.getenv('EXA_API_KEY')
if not api_key:
    print("Error: EXA_API_KEY not found in environment variables.")
    print("Please create a .env file with your API key.")
    print("Get your API key from https://exa.ai")
    exit(1)

exa = Exa(api_key)

# Search presets configuration
SEARCH_PRESETS = {
    'tiktok': {
        'domains': ['https://www.tiktok.com'],
        'type': 'keyword',
        'num_results': 10,
        'description': 'Search TikTok videos'
    },
    'twitter': {
        'category': 'tweet',
        'type': 'neural',
        'num_results': 10,
        'description': 'Search Twitter/X posts'
    },
    'wikipedia': {
        'domains': ['https://wikipedia.org'],
        'type': 'neural',
        'num_results': 10,
        'description': 'Search Wikipedia articles'
    },
    'papers': {
        'category': 'papers',
        'type': 'neural',
        'num_results': 10,
        'description': 'Search academic papers'
    },
    'news': {
        'category': 'news',
        'type': 'neural',
        'num_results': 10,
        'description': 'Search news articles'
    },
    'github': {
        'category': 'github',
        'type': 'neural',
        'num_results': 10,
        'description': 'Search GitHub repositories'
    }
}

@app.route('/')
def index():
    """Render the main search interface"""
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    """Handle search requests from the frontend"""
    try:
        data = request.get_json()
        query = data.get('query', '').strip()
        preset = data.get('preset', 'general')
        
        if not query:
            return jsonify({'error': 'Please enter a search query'}), 400
        
        # Build search parameters based on preset
        search_params = {
            'query': query,
            'num_results': 10
        }
        
        if preset in SEARCH_PRESETS:
            preset_config = SEARCH_PRESETS[preset]
            if 'domains' in preset_config:
                search_params['include_domains'] = preset_config['domains']
            if 'category' in preset_config:
                search_params['category'] = preset_config['category']
            if 'type' in preset_config:
                search_params['type'] = preset_config['type']
        
        # Perform search
        response = exa.search(**search_params)
        
        # Format results
        results = []
        for result in response.results:
            results.append({
                'title': result.title,
                'url': result.url,
                'score': getattr(result, 'score', None),
                'published_date': getattr(result, 'published_date', None),
                'author': getattr(result, 'author', None)
            })
        
        return jsonify({
            'success': True,
            'query': query,
            'preset': preset,
            'results': results,
            'total': len(results)
        })
    
    except Exception as e:
        return jsonify({
            'error': f'Search failed: {str(e)}'
        }), 500

@app.route('/presets', methods=['GET'])
def get_presets():
    """Return available search presets"""
    return jsonify(SEARCH_PRESETS)

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 Exa Search Engine Starting...")
    print("="*60)
    print("📍 Open your browser and navigate to: http://localhost:5001")
    print("="*60 + "\n")
    app.run(debug=True, port=5001)
