const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        api_key: API_KEY,
    },
});

async function getTrendingMoviesPreview() {
    const { data, status } = await api('trending/movie/day');
    console.log('TrendingMoviesPreview:', status);

    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';

    movies.forEach((movie) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        );

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });

    // console.log({ data, movies });
}

async function getCategoriesPreview() {
    const { data, status } = await api('genre/movie/list');
    console.log('CategoriesPreview: ', status);

    const categories = data.genres;

    categoriesPreviewList.innerHTML = '';

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
        categoriesPreviewList.appendChild(categoryContainer);
    });

    // console.log({ data, categories });
}

async function getMoviesByCategory(id) {
    const { data, status } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    console.log('getMoviesByCategory:', status);

    const movies = data.results;

    genericSection.innerHTML = '';

    movies.forEach((movie) => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        );

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });

    // console.log({ data, movies });
}
