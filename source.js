const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
const displayCategories = categories => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryBtn = document.createElement('div');
        categoryBtn.classList.add('category');
        categoryBtn.innerHTML = `<button onclick="loadNews('${category.category_id}')">${category.category_name}</button>`;
        categoryContainer.appendChild(categoryBtn);
    }
}
const loadNews = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`
    fetch(url)
        .then(res => res.json())
        .then(data => loadDetailsNews(data.data))
}
const loadDetailsNews = newz => {
    console.log(newz);
    const newzDetails = document.getElementById('news-detail');
    newzDetails.textContent = '';
    for (const oneNews of newz) {
        const multipleNewz = document.createElement('div');
        multipleNewz.innerHTML = `<img src="${oneNews.thumbnail_url}">
    <h2>${oneNews.title}</h2>
    <p>${oneNews.details}</p>`
        newzDetails.appendChild(multipleNewz);


    }


}
loadCategories();
