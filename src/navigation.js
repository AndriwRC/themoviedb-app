let previous = 0;
searchFormBtn.addEventListener(
    'click',
    () => (location.hash = `#search=${searchFormInput.value}`)
);

trendingBtn.addEventListener('click', () => (location.hash = '#trends'));
arrowBtn.addEventListener('click', () => {
    previous -= 2;
    if (previous > 0) {
        window.history.back();
    } else {
        location.hash = '#home';
    }
});

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    previous++;
    console.log(previous);
}

function homePage() {
    console.log('HOME');

    // Header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    // Sections
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}
function trendsPage() {
    console.log('TRENDS');
    // Header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    searchForm.classList.add('inactive');

    // Sections
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();
}
function searchPage() {
    console.log('SEARCH');

    // Header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    // Sections
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    // console.log('query', decodeURI(query));

    getMoviesBySearch(decodeURI(query));
}
function movieDetailsPage() {
    console.log('MOVIE');

    // Header
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    // Sections
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
    getSimilarMovies(movieId);
}
function categoriesPage() {
    console.log('CATEGORIES');

    // Header
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    // Sections
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    // console.log('categoryId:', categoryId);
    // console.log('Name:', categoryName);

    headerCategoryTitle.innerHTML = categoryName.replace('%20', ' ');

    getMoviesByCategory(categoryId);
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
