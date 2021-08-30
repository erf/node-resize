# Test

Test uploading and resizing an image before uploading it to a `LocalStack`
version of AWS S3.

Based on:
https://onexlab-io.medium.com/aws-s3-bucket-local-testing-using-localstack-1918fb375280

## LocalStack setup

1. Install `Docker` 

2. Run `docker-compose up` to install LocalStack and add the `images` bucket

## Run tests

From the root folder run:

```
npm test
```

## Examine data

### List images

aws --endpoint-url=http://localhost:4566 s3 ls images

### Download image

aws --endpoint-url=http://localhost:4566 s3 cp s3://images/e3ac1970-09da-11ec-baa6-215de898dcb9_1920_1080_.jpg test_image.jpg


