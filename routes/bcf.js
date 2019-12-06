var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

let bcfp = [];

function scrapeBcf() {
  var options = {
    uri: 'https://www.bcf.com.au/catalogue-sale',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {
    let titles = $('.product-name').text().split('\n').filter(e => { return e.match(/\S/); });
    let salePrices = $('.product-sales-price').text().split(/[$]/); 
      salePrices.shift();
    
    let prodImages = [];
    let prodURLs = [];
    
    $('.thumb-link').find('.img-fading.top').each((i,e) => { prodImages.push($(e).attr('src')); });
    $('.thumb-link').each((i,e) => { prodURLs.push($(e).attr('href')); });

    for(let i=0; i<titles.length; i++) {
      bcfp.push({ title: titles[i],
        salePrice: salePrices[i],
        prodImage: prodImages[i],
        prodURL: prodURLs[i]
      })
    }
    // console.log(prodImages.length);
  })
  .catch(function (err) {
    console.log(`${err}`)
  });
}

scrapeBcf();

router.get('/', function(req, res, next) {
  res.render('content', { title: 'BCF', products: bcfp});
});

module.exports = router;