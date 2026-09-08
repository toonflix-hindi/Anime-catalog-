// ========== STATE ==========
let allAnime = [];
let isEditing = false;
let editingId = null;
let watchLinks = [];

// ========== DOM ELEMENTS ==========
const adminTableBody = document.getElementById('adminTableBody');
const totalAnimeEl = document.getElementById('totalAnime');
const totalGenresEl = document.getElementById('totalGenres');
const modal = document.getElementById('animeModal');

// ========== RENDER ADMIN TABLE ==========
function renderAdminTable(animeList) {
    if (!adminTableBody) return;
    
    if (animeList.length === 0) {
        adminTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 2rem; display: block; margin-bottom: 12px;"></i>
                    No anime found. Add your first anime!
                </td>
            </tr>
        `;
        return;
    }
    
    adminTableBody.innerHTML = animeList.map(anime => `
        <tr>
            <td>
                <img src="${anime.poster || 'assets/images/placeholder.jpg'}" 
                     alt="${anime.title}" 
                     style="width: 50px; height: 70px; object-fit: cover; border-radius: 8px;"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2270%22%3E%3Crect fill=%22%2314141f%22 width=%2250%22 height=%2270%22/%3E%3Ctext x=%2210%22 y=%2235%22 font-size=%2220%22 fill=%22%23666%22%3E🎬%3C/text%3E%3C/svg%3E'">
            </td>
            <td><strong>${anime.title}</strong></td>
            <td>${anime.genres?.join(', ') || 'N/A'}</td>
            <td>${anime.releaseYear || 'N/A'}</td>
            <td>⭐ ${anime.rating || 'N/A'}</td>
            <td>
                <button onclick="editAnime('${anime.id}')" class="btn-sm btn-edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteAnimeItem('${anime.id}')" class="btn-sm btn-delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    if (totalAnimeEl) totalAnimeEl.textContent = animeList.length;
}

// ========== ADD NEW ANIME ==========
window.addNewAnime = function() {
    isEditing = false;
    editingId = null;
    watchLinks = [];
    document.getElementById('modalTitle').textContent = 'Add New Anime';
    document.getElementById('animeForm').reset();
    document.getElementById('editId').value = '';
    document.getElementById('watchLinksContainer').innerHTML = '';
    modal.style.display = 'flex';
};

// ========== EDIT ANIME ==========
window.editAnime = function(id) {
    isEditing = true;
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Anime';
    
    const anime = window.animeDB.getAnimeById(id);
    if (!anime) {
        alert('Anime not found!');
        return;
    }
    
    document.getElementById('editId').value = id;
    document.getElementById('title').value = anime.title || '';
    document.getElementById('japaneseTitle').value = anime.japaneseTitle || '';
    document.getElementById('altTitle').value = anime.alternativeTitle || '';
    document.getElementById('synopsis').value = anime.synopsis || '';
    document.getElementById('genres').value = anime.genres?.join(', ') || '';
    document.getElementById('status').value = anime.status || 'Ongoing';
    document.getElementById('year').value = anime.releaseYear || '';
    document.getElementById('episodes').value = anime.episodes || '';
    document.getElementById('duration').value = anime.duration || '';
    document.getElementById('studio').value = anime.studio || '';
    document.getElementById('rating').value = anime.rating || '';
    document.getElementById('poster').value = anime.poster || '';
    document.getElementById('languages').value = anime.languages || '';
    
    watchLinks = anime.watchLinks || [];
    renderWatchLinks();
    
    modal.style.display = 'flex';
};

// ========== DELETE ANIME ==========
window.deleteAnimeItem = function(id) {
    if (!confirm('Are you sure you want to delete this anime?')) return;
    
    try {
        window.animeDB.deleteAnime(id);
        loadAdminData();
        alert('Anime deleted successfully!');
    } catch (error) {
        alert('Error deleting anime: ' + error.message);
    }
};

// ========== WATCH LINKS ==========
window.addWatchLink = function() {
    watchLinks.push({ label: 'Watch', url: '' });
    renderWatchLinks();
};

function renderWatchLinks() {
    const container = document.getElementById('watchLinksContainer');
    if (!container) return;
    
    container.innerHTML = watchLinks.map((link, index) => `
        <div class="watch-link-group">
            <input type="text" placeholder="Button Label" 
                   value="${link.label}" 
                   onchange="updateWatchLink(${index}, 'label', this.value)">
            <input type="url" placeholder="URL" 
                   value="${link.url}" 
                   onchange="updateWatchLink(${index}, 'url', this.value)">
            <button type="button" onclick="removeWatchLink(${index})" class="btn-danger btn-sm">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

window.updateWatchLink = function(index, field, value) {
    watchLinks[index][field] = value;
};

window.removeWatchLink = function(index) {
    watchLinks.splice(index, 1);
    renderWatchLinks();
};

// ========== SAVE ANIME ==========
window.saveAnime = function(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('title').value.trim(),
        japaneseTitle: document.getElementById('japaneseTitle').value.trim(),
        alternativeTitle: document.getElementById('altTitle').value.trim(),
        synopsis: document.getElementById('synopsis').value.trim(),
        genres: document.getElementById('genres').value.split(',').map(g => g.trim()).filter(g => g),
        status: document.getElementById('status').value,
        releaseYear: parseInt(document.getElementById('year').value) || 0,
        episodes: parseInt(document.getElementById('episodes').value) || 0,
        duration: document.getElementById('duration').value.trim(),
        studio: document.getElementById('studio').value.trim(),
        rating: parseFloat(document.getElementById('rating').value) || 0,
        poster: document.getElementById('poster').value.trim(),
        languages: document.getElementById('languages').value.trim(),
        watchLinks: watchLinks.filter(l => l.label && l.url),
        type: 'TV'
    };
    
    try {
        if (isEditing && editingId) {
            window.animeDB.updateAnime(editingId, formData);
            alert('Anime updated successfully!');
        } else {
            window.animeDB.addAnime(formData);
            alert('Anime added successfully!');
        }
        
        closeModal();
        loadAdminData();
    } catch (error) {
        alert('Error saving anime: ' + error.message);
    }
};

// ========== MODAL CONTROLS ==========
window.closeModal = function() {
    modal.style.display = 'none';
};

window.filterAdminTable = function() {
    const searchTerm = document.getElementById('adminSearch').value.toLowerCase();
    const filtered = allAnime.filter(anime => 
        anime.title?.toLowerCase().includes(searchTerm) ||
        anime.alternativeTitle?.toLowerCase().includes(searchTerm) ||
        anime.japaneseTitle?.toLowerCase().includes(searchTerm)
    );
    renderAdminTable(filtered);
};

// ========== LOAD ADMIN DATA ==========
function loadAdminData() {
    try {
        allAnime = window.animeDB.getAllAnime();
        renderAdminTable(allAnime);
        
        const genres = window.animeDB.getAllGenres();
        if (totalGenresEl) totalGenresEl.textContent = genres.length;
    } catch (error) {
        console.error('Error loading admin data:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadAdminData);

modal?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
