var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

let bwp = [];

function scrapeBlackwolf() {
  var options = {
    uri: 'https://www.blackwolf.com.au/products/categories/clearance/',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {

    let titles = $('.title-prd').text().split('\t').filter(e => { return e.match(/\S/); });
    let originalPrices = $('.bc-product__original-price').text().split(/[$]/); 
      originalPrices.shift();
    let salePrices = $('.bc-product__price').text().split('\t').filter(e => { return e.match(/\S/); });
    let prodImages = [];
    let prodURLs = [];

    $('.bc-product-card__featured-image').each((i,e)=>{
        prodImages.push($(e).find('img').attr('src'));
        prodURLs.push($(e).find('a').attr('href'));
    })
    for(let i=0; i<titles.length; i++) {
      bwp.push({ title: titles[i],
        origPrice: originalPrices[i],
        salePrice: salePrices[i],
        prodImage: prodImages[i],
        prodURL: prodURLs[i]
      })
    }
  })
  .catch(function (err) {
    console.log(`${err}`)
  });
}

scrapeBlackwolf();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clearance Outdoor Gear', blackwolfProducts: bwp});
});

module.exports = router;
