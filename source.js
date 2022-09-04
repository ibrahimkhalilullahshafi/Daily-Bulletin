const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}



const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList.add('flex-fill');
        categoryBtn.innerHTML = `<button class="fw-bolder text-secondary mx-2 border border-0" onclick="loadNews('${category.category_id}')">${category.category_name}</button>`;
        categoryContainer.appendChild(categoryBtn);
    }


}



const loadNews = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => loadDetailsNews(data.data))

    } catch (error) {
        console.log(error)
    }
    // --------------------------start spinner-----------------------
    toggleSpinner(true);
}



const loadDetailsNews = (news) => {
    const getMessage = document.getElementById('message')
    getMessage.innerText = `${news.length} news found in this category`
    const newsDetails = document.getElementById('news-detail');
    newsDetails.textContent = '';
    // ---------------------------sorting by top viewed post---------------------
    const sortedNews = news.sort(function (a, b) {
        if (a.total_view > b.total_view) {
            return -1;
        }
        if (a.total_view < b.total_view) {
            return 1;
        }
        return 0;
    });
    sortedNews.forEach(oneNews => {
        const multipleNews = document.createElement('div');
        newsDetails.appendChild(multipleNews);
        multipleNews.innerHTML = `<div class="container my-5">
        <div class="card h-50 d-flex flex-column flex-md-row">
            <img src="${oneNews.thumbnail_url}" class="card-img-top w-25 img-fluid" alt="...">
            <div class="card-body w-100">
                <h5 class="card-title">${oneNews.title}</h5>
                <p class="card-text">${oneNews.details.slice(0, 500)}...</p>
                <div class="container d-flex pt-5">
                    <div class="container d-flex align-items-start justify-content-start">
                        <div class="w-25 m-0">
                            <img src="${oneNews.author.img}" class="d-block w-50 img-thumbnail">
                        </div>
                        <div class="w-25 me-5">
                            <h6 class="m-0">${(oneNews.author.name !== null && oneNews.author.name !== "" ? oneNews.author.name : 'No data found')}</h6>
                            <p>${(oneNews.author.published_date !== null && oneNews.author.published_date !== "" ? oneNews.author.published_date : 'No data found')}</p>
                        </div>
                        <div>
                            <p class="fw-semibold">views: ${(oneNews.total_view !== null && oneNews.total_view !== "" ? oneNews.total_view : 'No data found')}</p>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary"  onclick="loadMoreNews('${oneNews._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">more</button>
                    </div>
                </div>
            </div>
        </div>
        </div>`
    });
    //-------------------stop spinner-----------------------
    toggleSpinner(false);
}



const loadMoreNews = (more) => {
    const url = ` https://openapi.programming-hero.com/api/news/${more}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadMoreDetailsNews(data.data))
}



const loadMoreDetailsNews = (news) => {
    news.forEach(oneNews => {
        const fullNewsTitle = document.getElementById('staticBackdropLabel');
        const fullNews = document.getElementById('full-news');
        fullNewsTitle.innerText = oneNews.title;
        fullNews.innerHTML = `<img src="${oneNews.image_url}">
    <p>${oneNews.details}</p>`;
    });

}



//---------------------spinner function----------------------
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('load-spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else { spinnerSection.classList.add('d-none'); }
}



loadCategories();
loadNews('01')
