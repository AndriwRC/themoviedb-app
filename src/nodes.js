const getNode = (selector) => document.querySelector(selector);

// Sections
const headerSection = getNode('#header');
const trendingPreviewSection = getNode('#trendingPreview');
const categoriesPreviewSection = getNode('#categoriesPreview');
const genericSection = getNode('#genericList');
const movieDetailSection = getNode('#movieDetail');

// Lists & Containers
const searchForm = getNode('#searchForm');
const trendingMoviesPreviewList = getNode('.trendingPreview-movieList');
const categoriesPreviewList = getNode('.categoriesPreview-list');
const movieDetailCategoriesList = getNode('#movieDetail .categories-list');
const relatedMoviesContainer = getNode('.relatedMovies-scrollContainer');

// Elements
const headerTitle = getNode('.header-title');
const arrowBtn = getNode('.header-arrow');
const headerCategoryTitle = getNode('.header-title--categoryView');

const searchFormInput = getNode('#searchForm input');
const searchFormBtn = getNode('#searchBtn');

const trendingBtn = getNode('.trendingPreview-btn');

const movieDetailTitle = getNode('.movieDetail-title');
const movieDetailDescription = getNode('.movieDetail-description');
const movieDetailScore = getNode('.movieDetail-score');
