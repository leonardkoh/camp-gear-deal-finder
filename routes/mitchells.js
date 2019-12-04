var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

let mitchp = [];

function scrapeMitchells() {
  var options = {
    uri: 'https://www.mitchellsadventure.com/list/onsale.aspx',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {
    let titles = $('.product-name').text().split('\n').filter(e => { return e.match(/\S/); });
    // let salePrices = $('.product-sales-price').text().split(/[$]/); 
      // salePrices.shift();
    
    // let prodImages = [];
    // let prodURLs = [];
    
    // $('.thumb-link').find('.img-fading.top').each((i,e) => { prodImages.push($(e).attr('src')); });
    // $('.thumb-link').each((i,e) => { prodURLs.push($(e).attr('href')); });

    // for(let i=0; i<titles.length; i++) {
      // bcfp.push({ title: titles[i],
        // salePrice: salePrices[i],
        // prodImage: prodImages[i],
        // prodURL: prodURLs[i]
      // })
    // }
    let m = [];
    $('span').find('a').map((i,e) => { m.push($(e).attr('title')); });
    m = m.slice(10).filter((e,i) => { console.log(e === underfined ? true: false) });
    console.log();
  })
  .catch(function (err) {
    console.log(`${err}`)
  });
}

scrapeMitchells();

router.get('/', function(req, res, next) {
  res.render('mitchells', { title: 'Mitchells Adventure', mitchProducts: mitchp});
});

module.exports = router;