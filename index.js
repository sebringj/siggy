var express = require('express');
var body_parser = require('body-parser')
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var cors = require('cors');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({ extended: true }))

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET

app.listen(app.get('port'));

app.get('/sign_s3', cors(), function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.content_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err)
            console.log(err);
        else {
            var return_data = {
                signed_request: data,
                url: 'https://' +S3_BUCKET + '.s3.amazonaws.com/' + req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});
