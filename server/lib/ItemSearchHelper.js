const request = require('request');
const Api = require('../../config/ApiKey');

var searchWalmartProducts = (query, callback) => {
  request({
    method: 'GET',
    url: `http://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=${Api.walmartApi}`,
  }, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body);
    }
  });
};
module.exports.searchWalmart = searchWalmartProducts;
//module.exports.name = 'Mahima';