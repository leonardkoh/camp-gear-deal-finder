var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

let prods = [];

function scrapeMitchells() {
  var options = {
    uri: 'https://www.mitchellsadventure.com/list/onsale.aspx',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {
    let salePrices = $('.onsale').text().split(/[$]/); 
      salePrices.shift();
    
    let prodImages = [];
      $('a').find('.img-responsive').each((i,e) => { prodImages.push('https://www.mitchellsadventure.com/'+$(e).attr('src')); });
    let prodURLs = [];
      $('.stylesummaryimageholder').find('a').each((i,e) => { prodURLs.push($(e).attr('href')); });
    
    let titles = [];
    
    $('span').find('a').map((i,e) => { titles.push($(e).attr('title')); });
    titles = titles.slice(10,titles.length-1).filter((e,i) => { if(e !== undefined) return e; });
    prodImages = prodImages.slice(2)
    for(let i=0; i<titles.length; i++) {
      prods.push({ title: titles[i],
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

scrapeMitchells();

router.get('/', function(req, res, next) {
  res.render('content', { title: 'Mitchells Adventure', products: prods});
});

module.exports = router;