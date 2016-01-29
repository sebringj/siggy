# sign S3

Simple S3 signing of a URL to enable uploads via client-side.

TODO: will integrate in with JWT token permission as a microservice

## Requirement

1. Get an S3 account and get the key and secret

2. Your S3 bucket needs CORS setup with following XML entry:

    <?xml version="1.0" encoding="UTF-8"?>
    <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
      <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
      </CORSRule>
    </CORSConfiguration>

3. $ PORT=[PORT] AWS_ACCESS_KEY='[key]' AWS_SECRET_KEY='[secret]' S3_BUCKET='[bucket]' node index.js

4. Can access from other web apps to get temporary signature for client-side upload
