const axios = require('axios');
const cheerio = require('cheerio');

const amazonSearchScrape = (req, res) => {
    const keyword = req.params.keyword;
    let products = [];

    axios.get('https://www.amazon.com/s', {
            params: {
                k: keyword
            },
            headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1"    
            }
        })
        .then(res => {
            // load the html content using cheerio
            const $ = cheerio.load(res.data); 
        
            $('[data-asin!=""]').each((index, element) => {
                // product title
                const productTitle = $(element).find('.s-title-instructions-style > h2').prop('innerText');

                // product rating
                let productRating = $(element).find('.a-icon-star-small').prop('innerText');
                
                // extract rating number
                if (productRating) {
                    productRating = productRating.split(' ');
                    if (productRating[0].length > 1) 
                        productRating = productRating[0][0] + '.' + productRating[0][2];
                }

                // product review
                const productReviews = $(element).find('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style > .a-size-base.s-underline-text').prop('innerText');

                // product img
                const productImg = $(element).find('.s-image').attr('src');

                if (productTitle && productImg) {
                    products.push({
                        title: productTitle,
                        rating: productRating,
                        reviews: productReviews,
                        imgUrl: productImg
                    });
                }
            })

            console.log(`${products.length} items founded in amazon search with '${keyword}' keyword`);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send({message: 'Internal server error', error}).end();
        })
        .finally(() => {
            // return list of products
            return res.status(200).send({products}).end();
        });
};

module.exports = amazonSearchScrape;