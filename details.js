function getAnimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderAnimeDetails(anime) {
    const wrapper = document.getElementById('animeDetails');
    if (!wrapper) return;
    
    if (!anime) {
        wrapper.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Anime Not Found</h2>
                <p>Sorry, we couldn't find the anime you're looking for.</p>
                <a href="index.html" class="btn-primary">Go Back Home</a>
            </div>
        `;
        return;
    }
    
    const genreTags = anime.genres?.map(g => `<span class="genre-tag">${g}</span>`).join('') || '';
    
    const watchButtons = anime.watchLinks?.map(link => `
        <a href="${link.url}" target="_blank" class="watch-btn primary">
            <i class="fas fa-play"></i> ${link.label}
        </a>
    `).join('') || '';
    
    wrapper.innerHTML = `
        <div class="details-layout">
            <div class="details-poster">
                <img src="${anime.poster || 'assets/images/placeholder.jpg'}" 
                     alt="${anime.title}"
                     onerror="this.src='assets/images/placeholder.jpg'">
            </div>
            <div class="details-info">
                <h1>${anime.title}</h1>
                <div class="details-subtitle">
                    ${anime.japaneseTitle ? `🇯🇵 ${anime.japaneseTitle}` : ''}
                    ${anime.alternativeTitle ? ` • ${anime.alternativeTitle}` : ''}
                </div>
                
                <div class="details-genres">${genreTags}</div>
                
                <div class="details-synopsis">
                    ${anime.synopsis || 'No synopsis available.'}
                </div>
                
                <div class="details-meta-grid">
                    <div class="meta-item">
                        <span class="label">Status</span>
                        <span class="value">${anime.status || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Release Year</span>
                        <span class="value">${anime.releaseYear || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Episodes</span>
                        <span class="value">${anime.episodes || '?'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Duration</span>
                        <span class="value">${anime.duration || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Studio</span>
                        <span class="value">${anime.studio || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Rating</span>
                        <span class="value">⭐ ${anime.rating || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Languages</span>
                        <span class="value">${anime.languages || 'N/A'}</span>
                    </div>
                    <div class="meta-item">
                        <span class="label">Type</span>
                        <span class="value">${anime.type || 'TV'}</span>
                    </div>
                </div>
                
                ${watchButtons ? `
                    <div class="watch-section">
                        <h3>▶️ Watch Now</h3>
                        <div class="watch-buttons">
                            ${watchButtons}
                        </div>
                    </div>
                ` : `
                    <div class="watch-section">
                        <h3>▶️ Watch Now</h3>
                        <p style="color: var(--text-secondary);">No watch links available for this anime.</p>
                    </div>
                `}
            </div>
        </div>
    `;
}

function loadAnimeDetails() {
    const id = getAnimeIdFromURL();
    if (!id) {
        renderAnimeDetails(null);
        return;
    }
    
    try {
        const anime = window.animeDB.getAnimeById(id);
        renderAnimeDetails(anime);
        if (anime) window.animeDB.incrementViews(id);
    } catch (error) {
        console.error('Error loading anime details:', error);
        renderAnimeDetails(null);
    }
}

window.performSearch = function() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const term = input.value.trim();
    if (term.length < 2) return;
    window.location.href = `index.html?search=${encodeURIComponent(term)}`;
};

window.toggleMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('open');
};

document.addEventListener('DOMContentLoaded', loadAnimeDetails);