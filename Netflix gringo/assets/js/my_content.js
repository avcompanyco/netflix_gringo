// Mock Data
const currentUser = {
    id: 'user123',
    name: 'Jhon Doe',
    profilePicture: 'assets/img/Jhon.webp',
    bannerImage: 'assets/img/carrusel1_pc.jpeg'
};

const userMovies = [
    { id: 'mov1', title: 'Super Cars 3 - The Change Is Now', category: 'Fantasy', thumbnailUrl: 'assets/img/cartelera1.png', views: 10500, uploadDate: '2024-05-01' },
    { id: 'mov2', title: 'Mystery of the Lost City', category: 'Adventure', thumbnailUrl: 'assets/img/cartelera3.jpg', views: 12000, uploadDate: '2024-04-22' },
];

const userSeries = [
    {
        id: 'ser1',
        title: 'Pablo Escobar',
        category: 'Action',
        thumbnailUrl: 'assets/img/cartelera2.png',
        totalViews: 150200,
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    { id: 'ep1', title: 'Meeting Pablo', thumbnailUrl: 'assets/img/cartelera2.png', views: 25000, uploadDate: '2024-04-15' },
                    { id: 'ep2', title: 'The Rise', thumbnailUrl: 'assets/img/cartelera2.png', views: 22000, uploadDate: '2024-04-22' }
                ]
            },
            {
                seasonNumber: 2,
                episodes: [
                    { id: 'ep3', title: 'New Alliances', thumbnailUrl: 'assets/img/cartelera2.png', views: 20000, uploadDate: '2024-04-29' }
                ]
            }
        ]
    },
];

const userStreams = [
    { id: 'str1', title: 'My Awesome Live Stream', status: 'Live', thumbnailUrl: 'assets/img/carrusel3_pc.png', viewers: 120 },
    { id: 'str2', title: 'Past Stream Q&A', status: 'Ended', recordingUrl: '#', thumbnailUrl: 'assets/img/carrusel2_pc.jpg', views: 5000, date: '2024-05-10' }
];

// Rendering Functions
function renderUserProfile(user) {
    const headerBanner = document.getElementById('header-banner');
    const profilePic = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');

    if (headerBanner) headerBanner.style.backgroundImage = `url(${user.bannerImage})`;
    if (profilePic) profilePic.src = user.profilePicture;
    if (userName) userName.textContent = user.name;
}

function renderMovies(movies) {
    const container = document.getElementById('movies-container');
    if (!container) return;
    container.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const card = `
            <div class="movie-card">
                <img src="${movie.thumbnailUrl}" alt="${movie.title}" class="movie-thumbnail">
                <h3>${movie.title}</h3>
                <p>Category: ${movie.category}</p>
                <p>Views: ${movie.views}</p>
                <p>Uploaded: ${new Date(movie.uploadDate).toLocaleDateString()}</p>
                <button class="edit-btn" onclick="alert('Edit movie: ${movie.id}')">Edit</button>
                <button class="delete-btn" onclick="alert('Delete movie: ${movie.id}')">Delete</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderSeries(series) {
    const container = document.getElementById('series-container');
    if (!container) return;
    container.innerHTML = ''; // Clear existing content

    series.forEach(serie => {
        // Basic series card for now. Episode listing can be complex.
        const card = `
            <div class="series-card">
                <img src="${serie.thumbnailUrl}" alt="${serie.title}" class="series-thumbnail">
                <h3>${serie.title}</h3>
                <p>Category: ${serie.category}</p>
                <p>Total Views: ${serie.totalViews}</p>
                <p>Seasons: ${serie.seasons.length}</p>
                <button class="edit-btn" onclick="alert('Edit series: ${serie.id}')">Edit Series</button>
                <button class="delete-btn" onclick="alert('Delete series: ${serie.id}')">Delete Series</button>
                <button class="action-btn" onclick="alert('Add episode to series: ${serie.id}')">Add Episode</button>
                <!-- Expand episodes functionality can be added here -->
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderStreams(streams) {
    const container = document.getElementById('streams-container');
    if (!container) return;
    container.innerHTML = ''; // Clear existing content

    streams.forEach(stream => {
        const liveBadge = stream.status === 'Live' ? '<span class="live-badge">LIVE</span>' : '';
        const viewersOrViews = stream.status === 'Live' ? `<p>Viewers: ${stream.viewers}</p>` : `<p>Views: ${stream.views}</p>`;
        const streamDate = stream.date ? `<p>Date: ${new Date(stream.date).toLocaleDateString()}</p>` : '';
        const buttonText = stream.status === 'Live' ? 'Manage Stream' : 'Delete Recording';

        const card = `
            <div class="stream-card">
                <img src="${stream.thumbnailUrl}" alt="${stream.title}" class="stream-thumbnail">
                <h3>${stream.title} ${liveBadge}</h3>
                ${viewersOrViews}
                ${streamDate}
                <button class="action-btn" onclick="alert('${buttonText} for stream: ${stream.id}')">${buttonText}</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

function initMyContentPage() {
    renderUserProfile(currentUser);
    renderMovies(userMovies);
    renderSeries(userSeries);
    renderStreams(userStreams);
    // Initialize in owner's view
    toggleViewMode(false);
}

// View Mode Toggle Functionality
function toggleViewMode(isPublicView) {
    const managementButtons = document.querySelectorAll('.edit-btn, .delete-btn, .action-btn');
    const subscribeButton = document.getElementById('subscribe-btn-header'); // Assuming an ID for the new subscribe button
    const editProfileButton = document.getElementById('edit-profile-btn'); // Assuming an ID for edit profile

    managementButtons.forEach(btn => {
        btn.style.display = isPublicView ? 'none' : 'inline-block';
    });

    if (subscribeButton) {
        subscribeButton.style.display = isPublicView ? 'inline-block' : 'none';
    }
    if (editProfileButton) {
        // Assuming edit profile button is only for owner
        editProfileButton.style.display = isPublicView ? 'none' : 'inline-block';
    }
}

// Call init function when the DOM is ready
document.addEventListener('DOMContentLoaded', initMyContentPage);
