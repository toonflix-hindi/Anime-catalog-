// ========== DOM ELEMENTS ==========
const trendingGrid = document.getElementById('trendingGrid');
const popularGrid = document.getElementById('popularGrid');
const recentGrid = document.getElementById('recentGrid');
const releaseGrid = document.getElementById('releaseGrid');
const catalogueGrid = document.getElementById('catalogueGrid');
const genreGrid = document.getElementById('genreGrid');

let allAnime = [];
let currentPage = 0;
const itemsPerPage = 24;
let currentSort = 'az';
let currentGenre = 'all';

// ========== RENDER ANIME CARDS ==========
function renderAnimeCards(animeList, container, limit = 8) {
    if (!container) return;
    
    const items = animeList.slice(0, limit);
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-film"></i>
                <p>No anime found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(anime => `
        <div class="anime-card" onclick="window.location.href='anime-details.html?id=${anime.id}'">
            <div class="anime-card-poster">
                <img src="${anime.poster || 'assets/images/placeholder.jpg'}" 
                     alt="${anime.title}" 
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22300%22%3E%3Crect fill=%22%2314141f%22 width=%22200%22 height=%22300%22/%3E%3Ctext x=%2250%22 y=%22150%22 font-size=%2230%22 fill=%22%23666%22%3E🎬%3C/text%3E%3C/svg%3E'">
                <span class="anime-card-badge">${anime.status || 'Ongoing'}</span>
                <span class="anime-card-rating">
                    <i class="fas fa-star"></i> ${anime.rating || 'N/A'}
                </span>
            </div>
            <div class="anime-card-info">
                <div class="anime-card-title">${anime.title}</div>
                <div class="anime-card-meta">
                    <span>${anime.releaseYear || 'N/A'}</span>
                    <span>•</span>
                    <span>${anime.type || 'TV'}</span>
                    <span>•</span>
                    <span>${anime.episodes || '?'} eps</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== RENDER GENRES ==========
function renderGenres() {
    if (!genreGrid) return;
    
    const genres = window.animeDB.getAllGenres();
    const genreIcons = {
        'Action': '⚔️', 'Adventure': '🗺️', 'Fantasy': '✨', 'Isekai': '🌍',
        'Mystery': '🔍', 'Comedy': '😂', 'Romance': '❤️', 'Sci-Fi': '🚀',
        'Horror': '👻', 'Supernatural': '🌀', 'Sports': '🏆', 'Drama': '🎭',
        'Slice of Life': '🌸', 'Mecha': '🤖', 'Psychological': '🧠'
    };

    let html = `<button class="genre-chip active" data-genre="all">🎯 All</button>`;
    
    genres.forEach(genre => {
        const icon = genreIcons[genre] || '📺';
        html += `
            <button class="genre-chip" data-genre="${genre}">
                ${icon} ${genre}
            </button>
        `;
    });

    genreGrid.innerHTML = html;

    genreGrid.querySelectorAll('.genre-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            genreGrid.querySelectorAll('.genre-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentGenre = this.dataset.genre;
            currentPage = 0;
            filterAndRenderCatalogue();
        });
    });
}

// ========== RENDER CATALOGUE ==========
function renderCatalogue(animeList) {
    if (!catalogueGrid) return;
    
    const sorted = sortAnime(animeList, currentSort);
    const paginated = sorted.slice(0, (currentPage + 1) * itemsPerPage);
    
    renderAnimeCards(paginated, catalogueGrid, paginated.length);
    
    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        if (sorted.length <= paginated.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
}

// ========== SORT ANIME ==========
function sortAnime(animeList, sortType) {
    const sorted = [...animeList];
    switch(sortType) {
        case 'az': return sorted.sort((a, b) => a.title?.localeCompare(b.title));
        case 'latest': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'popular': return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
        case 'rating': return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'year': return sorted.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
        default: return sorted;
    }
}

// ========== FILTER AND RENDER ==========
function filterAndRenderCatalogue() {
    let filtered = [...allAnime];
    if (currentGenre !== 'all') {
        filtered = filtered.filter(anime => anime.genres?.includes(currentGenre));
    }
    renderCatalogue(filtered);
}

// ========== GLOBAL FUNCTIONS ==========
window.loadMore = function() {
    currentPage++;
    filterAndRenderCatalogue();
};

window.filterCatalogue = function() {
    currentSort = document.getElementById('sortBy')?.value || 'az';
    currentPage = 0;
    filterAndRenderCatalogue();
};

window.performSearch = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const term = input.value.trim();
    if (term.length < 2) {
        filterAndRenderCatalogue();
        return;
    }
    
    const results = window.animeDB.searchAnime(term);
    renderCatalogue(results);
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' });
};

window.toggleMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('open');
};

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
    }
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
            filterAndRenderCatalogue();
        }
    }
});

// ========== INITIALIZE ==========
function init() {
    allAnime = window.animeDB.getAllAnime();
    
    renderAnimeCards(window.animeDB.getTrendingAnime(8), trendingGrid);
    renderAnimeCards(window.animeDB.getPopularAnime(8), popularGrid);
    renderAnimeCards(window.animeDB.getRecentAnime(8), recentGrid);
    renderAnimeCards(window.animeDB.getLatestReleases(8), releaseGrid);
    
    renderGenres();
    renderCatalogue(allAnime);
    
    const genreFilter = document.getElementById('genreFilter');
    if (genreFilter) {
        const genres = window.animeDB.getAllGenres();
        genreFilter.innerHTML = '<option value="all">All Genres</option>';
        genres.forEach(genre => {
            genreFilter.innerHTML += `<option value="${genre}">${genre}</option>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
