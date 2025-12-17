/**
 * Exa Search Engine - Frontend JavaScript
 * Handles search interactions, API calls, and dynamic result rendering
 */

// State management
let currentPreset = 'general';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const presetButtons = document.querySelectorAll('.preset-btn');

// Event Listeners
searchForm.addEventListener('submit', handleSearch);

presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const preset = btn.dataset.preset;
        setActivePreset(preset);
    });
});

/**
 * Set active preset and update UI
 */
function setActivePreset(preset) {
    currentPreset = preset;
    
    // Update button states
    presetButtons.forEach(btn => {
        if (btn.dataset.preset === preset) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Handle search form submission
 */
async function handleSearch(e) {
    e.preventDefault();
    
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a search query');
        return;
    }
    
    // Show loading state
    showLoading();
    hideError();
    hideResults();
    
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                preset: currentPreset
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Search failed');
        }
        
        if (data.success) {
            displayResults(data);
        } else {
            throw new Error('Invalid response from server');
        }
        
    } catch (error) {
        console.error('Search error:', error);
        showError(error.message || 'An error occurred while searching');
    } finally {
        hideLoading();
    }
}

/**
 * Display search results
 */
function displayResults(data) {
    const { query, results, total, preset } = data;
    
    // Update results header
    resultsTitle.textContent = `Results for "${query}"`;
    resultsCount.textContent = `${total} result${total !== 1 ? 's' : ''}`;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="result-card">
                <p style="color: var(--text-secondary); text-align: center;">
                    No results found. Try a different query or search preset.
                </p>
            </div>
        `;
    } else {
        // Render each result
        results.forEach((result, index) => {
            const resultCard = createResultCard(result, index + 1);
            resultsContainer.appendChild(resultCard);
        });
    }
    
    // Show results section
    showResults();
}

/**
 * Create a result card element
 */
function createResultCard(result, number) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    // Build metadata HTML
    let metaHTML = '';
    if (result.author || result.published_date || result.score) {
        metaHTML = '<div class="result-meta">';
        
        if (result.author) {
            metaHTML += `<span class="meta-item">👤 ${escapeHtml(result.author)}</span>`;
        }
        
        if (result.published_date) {
            const date = new Date(result.published_date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            metaHTML += `<span class="meta-item">📅 ${formattedDate}</span>`;
        }
        
        if (result.score) {
            const scorePercent = (result.score * 100).toFixed(1);
            metaHTML += `<span class="meta-item">⭐ ${scorePercent}% relevance</span>`;
        }
        
        metaHTML += '</div>';
    }
    
    card.innerHTML = `
        <span class="result-number">#${number}</span>
        <h3 class="result-title">
            <a href="${escapeHtml(result.url)}" target="_blank" rel="noopener noreferrer" class="result-link">
                ${escapeHtml(result.title)}
            </a>
        </h3>
        <p class="result-url">${escapeHtml(result.url)}</p>
        ${metaHTML}
    `;
    
    return card;
}

/**
 * Show loading state
 */
function showLoading() {
    loadingState.classList.remove('hidden');
    searchButton.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingState.classList.add('hidden');
    searchButton.disabled = false;
}

/**
 * Show results section
 */
function showResults() {
    resultsSection.classList.remove('hidden');
}

/**
 * Hide results section
 */
function hideResults() {
    resultsSection.classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Initialize the app
 */
function init() {
    console.log('🚀 Exa Search Engine initialized');
    
    // Focus search input on load
    searchInput.focus();
    
    // Add keyboard shortcut (Ctrl/Cmd + K to focus search)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
