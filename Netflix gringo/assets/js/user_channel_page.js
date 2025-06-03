// Mock Data
const channelOwnerUser = {
    id: 'user789',
    name: 'Streamer Pro',
    profilePicture: 'assets/img/Tomas.avif', // Different image
    bannerImage: 'assets/img/carrusel2_pc.jpg' // Different image
};

const channelMovies = [
    { id: 'chmov1', title: 'Galaxy Quest - The Movie', category: 'Sci-Fi Comedy', thumbnailUrl: 'assets/img/cartelera4.jpeg', views: 25000, uploadDate: '2024-03-10' },
    { id: 'chmov2', title: 'Ocean Depths', category: 'Documentary', thumbnailUrl: 'assets/img/cartelera5.jpg', views: 18000, uploadDate: '2024-02-15' },
];

const channelSeries = [
    {
        id: 'chser1',
        title: 'The Coding Chronicles',
        category: 'Educational',
        thumbnailUrl: 'assets/img/cartelera6.jpg',
        totalViews: 95000,
        seasons: [
            {
                seasonNumber: 1,
                episodes: [
                    { id: 'chep1', title: 'Hello World', thumbnailUrl: 'assets/img/cartelera6.jpg', views: 15000, uploadDate: '2024-01-20' },
                    { id: 'chep2', title: 'Loops & Conditions', thumbnailUrl: 'assets/img/cartelera6.jpg', views: 12000, uploadDate: '2024-01-27' }
                ]
            }
        ]
    },
];

const channelStreams = [
    { id: 'chstr1', title: 'Live Coding Session - Building a Site', status: 'Live', thumbnailUrl: 'assets/img/carrusel1.jpg', viewers: 350 }, // Different image
    { id: 'chstr2', title: 'Retrospective: Game Dev Journey', status: 'Ended', recordingUrl: '#', thumbnailUrl: 'assets/img/carrusel3_pc.png', views: 7500, date: '2024-04-05' }
];

let isSubscribed = false; // Initial subscription state

// DOM Elements (will be assigned in initChannelPage)
let subscribeBtn;

// Rendering Functions
function renderChannelOwnerProfile(user) {
    const headerBanner = document.getElementById('channel-header-banner');
    const profilePic = document.getElementById('channel-profile-picture');
    const userName = document.getElementById('channel-user-name');

    if (headerBanner) headerBanner.style.backgroundImage = `url(${user.bannerImage})`;
    if (profilePic) profilePic.src = user.profilePicture;
    if (userName) userName.textContent = user.name;
}

function renderChannelMovies(movies) {
    const container = document.getElementById('channel-movies-container');
    if (!container) return;
    container.innerHTML = '';

    movies.forEach(movie => {
        const card = `
            <a href="movie_detail.html?id=${movie.id}" class="content-card-link">
                <div class="channel-content-card movie-card">
                    <img src="${movie.thumbnailUrl}" alt="${movie.title}" class="thumbnail">
                    <h3>${movie.title}</h3>
                <p>Category: ${movie.category}</p>
                <p>Views: ${movie.views}</p>
                <p>Uploaded: ${new Date(movie.uploadDate).toLocaleDateString()}</p>
                <!-- No management buttons -->
                </div>
            </a>
        `;
        container.innerHTML += card;
    });
}

function renderChannelSeries(series) {
    const container = document.getElementById('channel-series-container');
    if (!container) return;
    container.innerHTML = '';

    series.forEach(serie => {
        const card = `
            <a href="series_detail.html?id=${serie.id}" class="content-card-link">
                <div class="channel-content-card series-card">
                    <img src="${serie.thumbnailUrl}" alt="${serie.title}" class="thumbnail">
                    <h3>${serie.title}</h3>
                <p>Category: ${serie.category}</p>
                <p>Total Views: ${serie.totalViews}</p>
                <p>Seasons: ${serie.seasons.length}</p>
                <!-- No management buttons -->
                </div>
            </a>
        `;
        container.innerHTML += card;
    });
}

function renderChannelStreams(streams) {
    const container = document.getElementById('channel-streams-container');
    if (!container) return;
    container.innerHTML = '';

    streams.forEach(stream => {
        const liveBadge = stream.status === 'Live' ? '<span class="live-badge">LIVE</span>' : '';
        const viewersOrViews = stream.status === 'Live' ? `<p>Viewers: ${stream.viewers}</p>` : `<p>Views: ${stream.views}</p>`;
        const streamDate = stream.date ? `<p>Date: ${new Date(stream.date).toLocaleDateString()}</p>` : '';

        let cardHtml = '';
        const isClickable = stream.status === 'Ended'; // Only past streams are clickable
        const cardContent = `
            <img src="${stream.thumbnailUrl}" alt="${stream.title}" class="thumbnail">
            <h3>${stream.title} ${liveBadge}</h3>
            ${viewersOrViews}
            ${streamDate}
            <!-- No management buttons -->
        `;

        if (isClickable) {
            cardHtml = `
                <a href="movie_detail.html?id=${stream.id}" class="content-card-link">
                    <div class="channel-content-card stream-card">
                        ${cardContent}
                    </div>
                </a>
            `;
        } else {
            cardHtml = `
                <div class="channel-content-card stream-card">
                    ${cardContent}
                </div>
            `;
        }
        container.innerHTML += cardHtml;
    });
}

function updateSubscribeButton() {
    if (!subscribeBtn) return;
    if (isSubscribed) {
        subscribeBtn.textContent = 'Subscribed';
        subscribeBtn.classList.remove('btn-primary');
        subscribeBtn.classList.add('btn-secondary', 'subscribed'); // Or btn-outline-primary, etc.
    } else {
        subscribeBtn.textContent = 'Subscribe';
        subscribeBtn.classList.remove('btn-secondary', 'subscribed');
        subscribeBtn.classList.add('btn-primary');
    }
}

function toggleSubscription() {
    isSubscribed = !isSubscribed;
    updateSubscribeButton();
    alert(isSubscribed ? 'Successfully subscribed to ' + channelOwnerUser.name + '!' : 'Successfully unsubscribed from ' + channelOwnerUser.name + '!');
}

function initChannelPage() {
    // Assign DOM elements
    subscribeBtn = document.getElementById('subscribeBtn');

    // Attach event listeners
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', toggleSubscription);
    }

    // Initial renders
    renderChannelOwnerProfile(channelOwnerUser);
    renderChannelMovies(channelMovies);
    renderChannelSeries(channelSeries);
    renderChannelStreams(channelStreams);
    updateSubscribeButton();
}

// Call init function when the DOM is ready
document.addEventListener('DOMContentLoaded', initChannelPage);
