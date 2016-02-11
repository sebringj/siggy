var express = require('express');
var body_parser = require('body-parser');
var crypto = require('crypto');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 5000;
app.use(body_parser.json());

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;
var S3_HOSTNAME = process.env.S3_HOSTNAME || 's3.amazonaws.com';

var prefix = 'uploads/';
var postUrl = 'https://' + S3_BUCKET + '.' + S3_HOSTNAME;

app.get('/sign_s3', cors(), function(req, res) {
  var date = new Date();
  date.setTime(Date.now() + (30 * 60 * 1000));
  var isoDate = date.toISOString();

  var s3Policy = {
    expiration: isoDate,
    conditions: [
      ['starts-with', '$key', prefix],
      { bucket: S3_BUCKET },
      { acl: 'public-read' },
      ['starts-with', '$Content-Type', '']
    ]
  };

  // stringify and encode the policy
  var stringPolicy = JSON.stringify(s3Policy);
  var base64Policy = Buffer(stringPolicy, 'utf-8').toString('base64');

  // sign the base64 encoded policy
  var base64Signature = crypto.createHmac('sha1', AWS_SECRET_KEY)
    .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

  res.json({
    policy: base64Policy,
    signature: base64Signature,
    postUrl: postUrl,
    baseUrl: postUrl + '/' + prefix,
    awsAccessKey: AWS_ACCESS_KEY
  });

});

app.listen(port);
