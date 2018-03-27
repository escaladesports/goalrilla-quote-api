'use strict';
require('envdotjs').load()
const quotesApi = require('./src/quotes-api.js');

module.exports.postQuoteRequest = (event, context, callback) => {

	const body = JSON.parse(event.body);

	console.log('Body:', body)
  const params = {
    dealerId: body.dealerId,
    dealerName: body.dealerName,
    dealerAddress: body.dealerAddress,
    dealerCity: body.dealerCity,
    dealerState: body.dealerState,
	 dealerZip: body.dealerZip,
	 dealerEmail: body.dealerEmail,
    dealerPhone: body.dealerPhone,
    userFirstName: body.userFirstName,
    userLastName: body.userLastName,
    userEmail: body.userEmail,
    userPhone: body.userPhone,
    contactPreference: body.contactPreference,
    userState: body.userState,
    userZip: body.userZip
  };

  quotesApi.postQuote(params).then(responseData => {
	  console.log('responseData', responseData)
    const body = JSON.stringify(responseData);
    const response = {
      statusCode: 200,
      body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": 'true'
      }
    };
    callback(null, response);
  }).catch(err => {
	  console.error(err)
    let msg = 'There was a problem with your request. Please try again later';

    if (err.code === 'malformed') {
      msg = 'The request data was malformed- ensure parameter data is correct and try again.'
    }

    const response = {
      statusCode: 400,
      body: JSON.stringify({
        errors: [msg]
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    };
    callback(null, response);
  });
};