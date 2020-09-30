var Acuity = require('acuityscheduling');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var query;
var tokenCode;
var app = express();
app.use(bodyParser.json());
// Router:
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
 
});

app.get('/authorize', function (req, res) {
    // Redirect the user to the Acuity authorization endpoint.  You must
    // choose a scope to work with.
    var config={
        clientId: 'eeeTqt6xib07MdxYbmGe',
        clientSecret: 'eee43eWTsWzcWfU9W0m7UnijnOy2YPMp56jSi73IRzde',
        redirectUri:'http://localhost:8080/outh2'
      };
      
    var acuity = Acuity.oauth(config);
  
  acuity.authorizeRedirect(res, {scope: 'api-v1'});
  
  
  });

  app.get('/outh2', function (req, res) {
    var config={
      clientId: 'eeTqt6xib07MdxYbmGe',
      clientSecret: 'ee43eWTsWzcWfU9W0m7UnijnOy2YPMp56jSi73IRzde',
      redirectUri:'http://localhost:8080/outh2'
    };
    var options = Object.create(config);
   // options.accessToken = config.accessToken || req.session.accessToken;
    var acuity = Acuity.oauth(options);
    var response = res;

    query = req.query;

    console.log('Authorized Code ', query);
  
    if (!query.code || query.error) {
      res.sendFile(path.join(__dirname, 'ui', 'oauth2.html'),query);
      
    }
  
    // Exchange the authorization code for an access token and store it
    // somewhere.  You'll need to pass it to the AcuitySchedulingOAuth
    // constructor to make calls later on.
    acuity.requestAccessToken(query.code, function (err, tokenResponse) {
  
    if (err) return console.log(err);
   
    console.log('Token Response ', tokenResponse);
   
    if (err) return console.log(err);
    res.sendFile(path.join(__dirname, 'ui', 'oauth2.html'),tokenCode);
      
    
    });
  });
  

app.listen(port, function () {
  console.log('Listening on ', port);
}).on('error', function () {
  if (e) return console.log(e);
});