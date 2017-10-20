const request = require('request-promise-native');
const queryValidator = require('./query-validator.js');

function postQuoteRequest(data) {
	// email relevant parties
	// post google sheets request
	// return promise
	return Promise.resolve('true');
}

/**
* Use to make a request to the Escalade manuals API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.brand Brand name to retrieve manuals for
* @returns {Promise.<Object>} Returns a promise resolving to a JSON response from the API (or an error
* if passed invalid data)
* @example
* manualsApi.manualsRequest({brand: 'goalrilla'}).then( ... )
*/
module.exports.postQuote = function(data) {
	// validate
	if (!queryValidator.validateQuotePost(data)) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return postQuoteRequest(data);
}