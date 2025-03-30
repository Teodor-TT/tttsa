const apiKey = '127f032704f3e9000e01260dca812684'; // Replace with your updated Last.fm API key

// Fetch top tracks for the selected genre
async function fetchTopTracks(genre) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genre}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.tracks?.track?.length) {
            renderTracks(data.tracks.track.slice(0, 5), 'tracks-output');
        } else {
            document.getElementById('tracks-output').innerHTML = '<p>Няма налични песни за избрания жанр.</p>';
        }
    } catch (error) {
        console.error('Error fetching top tracks:', error);
    }
}

// Fetch top albums for the selected genre
async function fetchTopAlbums(genre) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${genre}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.albums?.album?.length) {
            renderAlbums(data.albums.album.slice(0, 5), 'albums-output');
        } else {
            document.getElementById('albums-output').innerHTML = '<p>Няма налични албуми за избрания жанр.</p>';
        }
    } catch (error) {
        console.error('Error fetching top albums:', error);
    }
}

// Fetch newest tracks
async function fetchNewestTracks() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.tracks?.track?.length) {
            renderTracks(data.tracks.track.slice(0, 5), 'new-tracks-output');
        } else {
            document.getElementById('new-tracks-output').innerHTML = '<p>Няма налични песни в класацията.</p>';
        }
    } catch (error) {
        console.error('Error fetching newest tracks:', error);
    }
}

// Fetch newest albums
async function fetchNewestAlbums() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopalbums&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.albums?.album?.length) {
            renderAlbums(data.albums.album.slice(0, 5), 'new-albums-output');
        } else {
            document.getElementById('new-albums-output').innerHTML = '<p>Няма налични албуми в класацията.</p>';
        }
    } catch (error) {
        console.error('Error fetching newest albums:', error);
    }
}

// Render tracks in the DOM
function renderTracks(tracks, outputId) {
    const output = document.getElementById(outputId);
    output.innerHTML = ''; // Clear existing content
    tracks.forEach((track) => {
        const trackHTML = `
            <p>
                • <span class="song-name">${track.name}</span> | 
                <span class="song-time">${track.artist.name}</span>
            </p>
        `;
        output.innerHTML += trackHTML; // Add track details with a dot before each name
    });
}

// Render albums in the DOM
function renderAlbums(albums, outputId) {
    const output = document.getElementById(outputId);
    output.innerHTML = ''; // Clear existing content
    albums.forEach((album) => {
        const albumHTML = `
            <p>
                • <span class="song-name">${album.name}</span> | 
                <span class="song-time">${album.artist.name}</span>
            </p>
        `;
        output.innerHTML += albumHTML; // Add album details with a dot before each name
    });
}

// Update data when the genre is changed
document.getElementById('genre').addEventListener('change', (e) => {
    const genre = e.target.value;
    fetchTopTracks(genre);
    fetchTopAlbums(genre);
    fetchNewestTracks();
    fetchNewestAlbums();
});

// Fetch data for the default genre on load
fetchTopTracks('pop');
fetchTopAlbums('pop');
fetchNewestTracks();
fetchNewestAlbums();
