var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio'); 

function scrape(uri) {
  var options = {
    uri: 'https://www.blackwolf.com.au/products/categories/clearance/',
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  
  rp(options)
  .then(function ($) {
    console.log($('.title-prd').text())
    console.log($('.bc-product__original-price').text())
    console.log($('.bc-product__price').text())    
  })
  .catch(function (err) {
    console.log(`Failed to crawl: ${err}`)
  });
}

scrape();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clearance Outdoor Gear' });
});

module.exports = router;
