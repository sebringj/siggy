# siggy

Simple S3-compatible signing of a URL to enable uploads via client-side.

TODO: will integrate in with JWT token permission as a microservice

## Requirement

1. Get your S3 account with the key, secret and bucket

2. Your S3 bucket needs CORS setup with following XML entry:


    &lt;?xml version="1.0" encoding="UTF-8"?&gt;
    &lt;CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"&gt;
      &lt;CORSRule&gt;
        &lt;AllowedOrigin&gt;*&lt;/AllowedOrigin&gt;
        &lt;AllowedMethod&gt;GET&lt;/AllowedMethod&gt;
        &lt;AllowedMethod&gt;POST&lt;/AllowedMethod&gt;
        &lt;AllowedMethod&gt;PUT&lt;/AllowedMethod&gt;
        &lt;AllowedHeader&gt;*&lt;/AllowedHeader&gt;
      &lt;/CORSRule&gt;
    &lt;/CORSConfiguration&gt;

3. $ PORT=[PORT] AWS_ACCESS_KEY='[key]' AWS_SECRET_KEY='[secret]' S3_BUCKET='[bucket]' node index.js

4. Can access from other web apps to get temporary signature for client-side upload

## Start up

$ export AWS_ACCESS_KEY = '[your access key]'

$ export AWS_SECRET_KEY = '[your secret]'

$ export S3_BUCKET = '[your bucket]'

(optional defaults to 's3.amazonaws.com', dreamhost is 'objects.dreamhost.com')
$ export S3_HOSTNAME = 's3 hostname'

$ node index.js
