// ========== DEFAULT ANIME DATA ==========
const defaultAnime = [
    {
        id: '1',
        title: 'Attack on Titan',
        japaneseTitle: '進撃の巨人',
        alternativeTitle: 'Shingeki no Kyojin',
        synopsis: 'Humans are on the brink of extinction, living within walled cities for protection against the monstrous Titans.',
        genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
        status: 'Completed',
        releaseYear: 2013,
        episodes: 89,
        duration: '24 min',
        studio: 'Wit Studio, MAPPA',
        rating: 9.1,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTk5NDUwMTg4NV5BMl5BanBnXkFtZTgwMjI3NjY1NjM@._V1_.jpg',
        languages: 'Japanese, English, Hindi',
        type: 'TV',
        views: 15243,
        createdAt: '2024-01-15T10:30:00Z',
        watchLinks: [
            { label: '▶️ Watch 720p', url: 'https://t.me/example/1' },
            { label: '🇯🇵 Japanese', url: 'https://t.me/example/2' },
            { label: '🇬🇧 English Dub', url: 'https://t.me/example/3' },
            { label: '🇮🇳 Hindi Dub', url: 'https://t.me/example/4' }
        ]
    },
    {
        id: '2',
        title: 'Demon Slayer',
        japaneseTitle: '鬼滅の刃',
        alternativeTitle: 'Kimetsu no Yaiba',
        synopsis: 'Tanjiro Kamado\'s family is slaughtered by demons, and his sister Nezuko is turned into a demon.',
        genres: ['Action', 'Adventure', 'Fantasy', 'Supernatural'],
        status: 'Ongoing',
        releaseYear: 2019,
        episodes: 55,
        duration: '24 min',
        studio: 'Ufotable',
        rating: 8.7,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTgwNzA0MDk3NzM@._V1_.jpg',
        languages: 'Japanese, English, Hindi',
        type: 'TV',
        views: 12387,
        createdAt: '2024-01-20T14:45:00Z',
        watchLinks: [
            { label: '▶️ Watch 1080p', url: 'https://t.me/example/5' },
            { label: '🇬🇧 English Dub', url: 'https://t.me/example/6' }
        ]
    },
    {
        id: '3',
        title: 'Jujutsu Kaisen',
        japaneseTitle: '呪術廻戦',
        alternativeTitle: 'Jujutsu Kaisen',
        synopsis: 'Yuji Itadori swallows a cursed finger to save his friends, becoming the vessel for the powerful curse Ryomen Sukuna.',
        genres: ['Action', 'Supernatural', 'Fantasy', 'Horror'],
        status: 'Ongoing',
        releaseYear: 2020,
        episodes: 47,
        duration: '23 min',
        studio: 'MAPPA',
        rating: 8.6,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY5MTU5NDU5M15BMl5BanBnXkFtZTgwMjM5NTU5NjM@._V1_.jpg',
        languages: 'Japanese, English, Hindi',
        type: 'TV',
        views: 9876,
        createdAt: '2024-01-25T09:15:00Z',
        watchLinks: [
            { label: '▶️ Watch 720p', url: 'https://t.me/example/7' },
            { label: '🇯🇵 Japanese', url: 'https://t.me/example/8' }
        ]
    },
    {
        id: '4',
        title: 'Death Note',
        japaneseTitle: 'デスノート',
        alternativeTitle: 'Death Note',
        synopsis: 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name in it.',
        genres: ['Mystery', 'Psychological', 'Supernatural', 'Thriller'],
        status: 'Completed',
        releaseYear: 2006,
        episodes: 37,
        duration: '23 min',
        studio: 'Madhouse',
        rating: 8.9,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY3NTU5MjY4MV5BMl5BanBnXkFtZTgwMjM5NTU5NjM@._V1_.jpg',
        languages: 'Japanese, English, Hindi',
        type: 'TV',
        views: 8765,
        createdAt: '2024-02-01T16:20:00Z',
        watchLinks: [
            { label: '▶️ Watch 1080p', url: 'https://t.me/example/9' },
            { label: '🇬🇧 English Dub', url: 'https://t.me/example/10' }
        ]
    },
    {
        id: '5',
        title: 'One Piece',
        japaneseTitle: 'ワンピース',
        alternativeTitle: 'One Piece',
        synopsis: 'Monkey D. Luffy sets out on a journey to become the King of the Pirates.',
        genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
        status: 'Ongoing',
        releaseYear: 1999,
        episodes: 1100,
        duration: '24 min',
        studio: 'Toei Animation',
        rating: 9.0,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY4NTY0Mjg5NV5BMl5BanBnXkFtZTgwMjM5NTU5NjM@._V1_.jpg',
        languages: 'Japanese, English, Hindi',
        type: 'TV',
        views: 7654,
        createdAt: '2024-02-05T11:00:00Z',
        watchLinks: [
            { label: '▶️ Watch 720p', url: 'https://t.me/example/11' },
            { label: '🇯🇵 Japanese', url: 'https://t.me/example/12' }
        ]
    }
];

const defaultGenres = [
    'Action', 'Adventure', 'Fantasy', 'Isekai', 'Mystery',
    'Comedy', 'Romance', 'Sci-Fi', 'Horror', 'Supernatural',
    'Sports', 'Drama', 'Slice of Life', 'Mecha', 'Psychological'
];

// ========== INITIALIZE ==========
function initializeData() {
    if (!localStorage.getItem('animeData')) {
        localStorage.setItem('animeData', JSON.stringify(defaultAnime));
    }
    if (!localStorage.getItem('genresData')) {
        localStorage.setItem('genresData', JSON.stringify(defaultGenres));
    }
}

// ========== CRUD OPERATIONS ==========
function getAllAnime() {
    initializeData();
    return JSON.parse(localStorage.getItem('animeData') || '[]');
}

function saveAllAnime(animeList) {
    localStorage.setItem('animeData', JSON.stringify(animeList));
}

function getAnimeById(id) {
    const all = getAllAnime();
    return all.find(a => a.id === id) || null;
}

function getTrendingAnime(limit = 8) {
    const all = getAllAnime();
    return all.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}

function getPopularAnime(limit = 8) {
    const all = getAllAnime();
    return all.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit);
}

function getRecentAnime(limit = 8) {
    const all = getAllAnime();
    return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
}

function getLatestReleases(limit = 8) {
    const all = getAllAnime();
    return all.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0)).slice(0, limit);
}

function getAllGenres() {
    initializeData();
    return JSON.parse(localStorage.getItem('genresData') || '[]');
}

function searchAnime(query) {
    const all = getAllAnime();
    const term = query.toLowerCase().trim();
    return all.filter(anime =>
        anime.title?.toLowerCase().includes(term) ||
        anime.alternativeTitle?.toLowerCase().includes(term) ||
        anime.japaneseTitle?.toLowerCase().includes(term)
    );
}

function getAnimeByGenre(genre) {
    const all = getAllAnime();
    return all.filter(anime => anime.genres?.includes(genre));
}

function addAnime(animeData) {
    const all = getAllAnime();
    const newAnime = {
        ...animeData,
        id: Date.now().toString(),
        views: 0,
        createdAt: new Date().toISOString()
    };
    all.push(newAnime);
    saveAllAnime(all);
    return newAnime;
}

function updateAnime(id, animeData) {
    const all = getAllAnime();
    const index = all.findIndex(a => a.id === id);
    if (index === -1) return null;
    all[index] = { ...all[index], ...animeData };
    saveAllAnime(all);
    return all[index];
}

function deleteAnime(id) {
    let all = getAllAnime();
    all = all.filter(a => a.id !== id);
    saveAllAnime(all);
    return true;
}

function incrementViews(id) {
    const all = getAllAnime();
    const anime = all.find(a => a.id === id);
    if (anime) {
        anime.views = (anime.views || 0) + 1;
        saveAllAnime(all);
    }
}

// ========== EXPOSE GLOBALLY ==========
window.animeDB = {
    getAllAnime,
    getAnimeById,
    getTrendingAnime,
    getPopularAnime,
    getRecentAnime,
    getLatestReleases,
    getAllGenres,
    searchAnime,
    getAnimeByGenre,
    addAnime,
    updateAnime,
    deleteAnime,
    incrementViews,
    initializeData
};

// Auto-initialize
initializeData();