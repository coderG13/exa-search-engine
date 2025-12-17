"""
Custom Search Engine - Command Line Interface
Tutorial implementation for searching TikTok coffee content using Exa API
"""

from exa_py import Exa
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Exa with API key
api_key = os.getenv('EXA_API_KEY')
if not api_key:
    print("Error: EXA_API_KEY not found in environment variables.")
    print("Please create a .env file with your API key or set it directly in the code.")
    print("Get your API key from https://exa.ai")
    exit(1)

exa = Exa(api_key)

# Get search query from user
query = input('Search here: ')

# Search TikTok for coffee-related content
response = exa.search(
    query,
    num_results=5,
    type='keyword',
    include_domains=['https://www.tiktok.com'],
)

# Display formatted results
print("\n" + "="*60)
print(f"Search Results for: {query}")
print("="*60 + "\n")

for i, result in enumerate(response.results, 1):
    print(f"{i}. Title: {result.title}")
    print(f"   URL: {result.url}")
    print()

print("="*60)
print(f"Total results: {len(response.results)}")
print("="*60)
