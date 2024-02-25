const axios = require('axios');
const cheerio = require('cheerio');

const amazonSearchScrape = (req, res) => {
    const keyword = req.params.keyword;
    let products = [];

    axios.get('https://www.amazon.com.br/s', {
            params: {
                k: keyword
            },
            headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1"    
            }
        })
        .then(res => {
            // Carregando o conteúdo HTML da página usando Cheerio
            const $ = cheerio.load(res.data);
            
            $('.s-card-container').each((index, element) => {
                // product title
                const productTitle = $(element).find('.a-spacing-base > .a-spacing-small > .s-title-instructions-style > .s-line-clamp-4').prop('innerText');

                // product rating
                let productRating = $(element).find('.a-spacing-base > .a-spacing-small > .a-spacing-none > .a-size-small > span > .a-declarative').prop('innerText');
                
                // arrumar (deixar clean)
                if (productRating) {
                    productRating = productRating.split(' ');
                    productRating = productRating[0];
                }

                // product review
                const productReviews = $(element).find('.a-spacing-base > .a-spacing-small > .a-spacing-none > .a-size-small > span > .a-link-normal').prop('innerText');

                // product img
                const productImg = $(element).find('.a-spacing-base > .s-product-image-container > span > a > div > img').attr('src');

                products.push({
                    title: productTitle,
                    rating: productRating,
                    reviews: productReviews,
                    imgUrl: productImg
                });
            })

            console.log(`${products.length} items founded in amazon search with '${keyword}' keyword`);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send({error: 'Internal server error'}).end();
        })
        .finally(() => {
            // return list of products
            return res.status(200).send({products: products}).end();
        });
};

module.exports = amazonSearchScrape;

// "www.amazon.com.br/s?k=notebook"