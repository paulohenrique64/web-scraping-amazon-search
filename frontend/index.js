const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const searcResultDiv = document.querySelector('.s-result');
const loadingDiv = document.querySelector('.loading-animation');

searchButton.addEventListener('click', () => {
    const keyword = searchInput.value;
    console.log(keyword);
    if (keyword.trim().length) {
        cleanProducts();
        showLoadingAnimation();
        getProducts(keyword);
    }
});

function getProducts(keyword) {
    fetch(`http://localhost:8080/api/scrape/${keyword}`)
        .then(response => {
            removeLoadingAnimation();
            response.json()
                .then(responseJson => {
                    if (responseJson.products)
                        showProducts(responseJson.products);
                    else
                        alert('an error ocurred, try again');
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            removeLoadingAnimation();
            alert('the amazon-web-scraping API is offline');
            console.log(error);
        });
}

function cleanProducts() {
    searcResultDiv.innerHTML = '';
}

function showLoadingAnimation() {
    loadingDiv.innerHTML = '<div class="loader"></div>';
}

function removeLoadingAnimation() {
    loadingDiv.innerHTML = '';
}

function showProducts(products) {
    products.forEach(product => {
        let cardHTML = `
            <div class="product-card">               
                <a href="${product.imgUrl}" target="_blank" class="main-link">
                    <div class="image">
                        <img src="${product.imgUrl}" alt="Small succulent with long, spikey leaves in a mug-like planter.">
                    </div>
                </a>           
                <p class="description" title="${product.title}">${product.title}</p>
            `;

        if (product.rating && product.reviews) {
            cardHTML += `
                <div class="rating" title="${product.rating} out of 5 stars">${generateRatingStars(product.rating)}</div>
                <a class="reviews-link">${product.reviews} reviews</a>  
            `;
        } 
            
        cardHTML += '</div>';
        searcResultDiv.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function generateRatingStars(rating) {
    let starsHTML = `<span class="sr-only">Rating: ${rating} out of 5 stars</span>`;
    let fullStars = Math.floor(rating);
    let remainingStars = 5 - fullStars;

    // full stars
    for (let i = 0; i < fullStars; i++) 
        starsHTML += '<span class="fa fa-star" aria-hidden="true"></span>';

    // half stars
    if (rating % 1 !== 0) {
        starsHTML += '<span class="fa fa-star-half-o" aria-hidden="true"></span>';
        remainingStars--; 
    }

    // empy stars
    for (let i = 0; i < remainingStars; i++) 
        starsHTML += '<span class="fa fa-star-o" aria-hidden="true"></span>';

    return starsHTML;
}





