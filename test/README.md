# Test

Based on the article:

https://onexlab-io.medium.com/aws-s3-bucket-local-testing-using-localstack-1918fb375280

## Setup LocalStack

Install `Docker` on your system and then run the following to install LocalStack
and add a `images` bucket.

```
docker-compose up

aws --endpoint-url=http://localhost:4566 s3 mb s3://images
```

## Run tests

You can now run the tests from the root folder with:

```
npm test
```

## Examine data

You can use the Commandeer app to check images in bucket.

