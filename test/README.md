# Test

Based on the article:

https://onexlab-io.medium.com/aws-s3-bucket-local-testing-using-localstack-1918fb375280

## LocalStack setup

1. install `Docker` 

2. run `docker-compose up` to install LocalStack and add the `images` bucket

## Run tests

From the root folder run:

```
npm test
```

## Examine data

You can use the [Commandeer app](https://getcommandeer.com/) to examine the images in the container bucket.

