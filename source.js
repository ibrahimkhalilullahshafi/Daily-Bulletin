const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        // categoryBtn.classList.add('category');
        categoryBtn.innerHTML = `<button class="bg-info mx-3 w-12.5%" onclick="loadNews('${category.category_id}')">${category.category_name}</button>`;
        categoryContainer.appendChild(categoryBtn);
    }
    // spinner-start---------------

}
const loadNews = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadDetailsNews(data.data))
    toggleSpinner(true);
}
const loadDetailsNews = news => {
    console.log(news);
    const newsDetails = document.getElementById('news-detail');
    // const fullNewsTitle = document.getElementById('staticBackdropLabel');
    // const fullNews = document.getElementById('full-news');
    // fullNewsTitle.innerText = oneNews.title;
    // fullNews.innerHTML = `<img src="${oneNews.image_url} class="img-fluid"">
    //     <p>${oneNews.details}</p>`
    newsDetails.textContent = '';
    for (const oneNews of news) {
        const multipleNews = document.createElement('div');
        multipleNews.innerHTML = `<div class="container">
        <div class="card h-50 d-flex flex-column flex-sm-row">
            <img src="${oneNews.thumbnail_url}" class="card-img-top w-25" alt="...">
            <div class="card-body w-100">
                <h5 class="card-title">${oneNews.title}</h5>
                <p class="card-text">${oneNews.details.slice(0, 500)}</p>
                <div class="d-flex">
                <div><img src="${oneNews.author.img}" class="d-block w-25 img-fluid" alt="...">
                </div>
                <footer class="mx-2">
                <h6 class="m-0">${oneNews.author.name}</h6>
                <p>${oneNews.author.published_date}</p>
                </footer>
                </div>
            </div>
        </div>
    </div>`
        //     multipleNewz.innerHTML = `<img src="${oneNews.thumbnail_url}">
        // <h2>${oneNews.title}</h2>
        // <p>${oneNews.details}</p>
        // <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Full news</button>`
        newsDetails.appendChild(multipleNews);

    }
    // stop spinner-----------------------
    toggleSpinner(false);
}
// spinner function----------------------
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('load-spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else { spinnerSection.classList.add('d-none'); }
}



loadCategories();
