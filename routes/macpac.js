var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

let wep = [];

function scrapeWildEarth() {
  var options = {
    uri: 'https://www.wildearth.com.au/view/sale',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {
    let titles = $('.prod-title').text().split('\n').filter(e => { return e.match(/\S/); });
    // let salePrices = $('.product-sales-price').text().split(/[$]/); 
      // salePrices.shift();
    
    // let prodImages = [];
    // let prodURLs = [];
    
    // $('.thumb-link').find('.img-fading.top').each((i,e) => { prodImages.push($(e).attr('src')); });
    // $('.thumb-link').each((i,e) => { prodURLs.push($(e).attr('href')); });

    // for(let i=0; i<titles.length; i++) {
      // wep.push({ title: titles[i],
        // salePrice: salePrices[i],
        // prodImage: prodImages[i],
        // prodURL: prodURLs[i]
      // })
    // }
    // console.log($('p').html());
    // console.log(titles);
    // console.log(titles.length);
  })
  .catch(function (err) {
    console.log(`${err}`)
  });
}

scrapeWildEarth();

router.get('/', function(req, res, next) {
  res.render('maintenance', { title: 'Macpac',
  image: 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1531729141976/shutterstock-1030050604_main_1531729223400.jpeg'});
});

module.exports = router;