const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        api_key: API_KEY,
    },
});

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

// Utils
function renderMovies(container, movies, lazyLoad = false) {
    container.innerHTML = '';

    movies.forEach((movie) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        );
        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });

    // console.log({ data, movies });
}

function createCategories(container, categories) {
    container.innerHTML = '';

    categories.forEach((category) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });

        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);

        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// API request
async function getTrendingMoviesPreview() {
    const { data, status } = await api('trending/movie/day');
    console.log('TrendingMoviesPreview:', status);

    renderMovies(trendingMoviesPreviewList, data.results, true);
}
async function getTrendingMovies() {
    const { data, status } = await api('trending/movie/day');
    console.log('TrendingMoviesPreview:', status);

    renderMovies(genericSection, data.results);
}

async function getCategoriesPreview() {
    const { data, status } = await api('genre/movie/list');
    console.log('CategoriesPreview: ', status);

    createCategories(categoriesPreviewList, data.genres);

    // console.log({ data, categories });
}

async function getMoviesByCategory(id) {
    const { data, status } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    console.log('getMoviesByCategory:', status);

    renderMovies(genericSection, data.results);
}

async function getMoviesBySearch(query) {
    const { data, status } = await api('search/movie', {
        params: {
            query,
        },
    });
    console.log('getMoviesBySearch:', status, data);

    renderMovies(genericSection, data.results);
}

async function getMovieById(id) {
    const { data: movie, status } = await api(`movie/${id}`);
    console.log('getMovieById:', status);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    headerSection.style.backgroundImage = `linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

    createCategories(movieDetailCategoriesList, movie.genres);
}

async function getSimilarMovies(id) {
    const { data, status } = await api(`movie/${id}/similar`);
    console.log('getSimilarMovies:', status);

    renderMovies(relatedMoviesContainer, data.results);
    relatedMoviesContainer.scrollTo(0, 0);
}
