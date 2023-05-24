# Test

Test uploading and resizing an image before uploading it to a `LocalStack`
version of AWS S3.

Based on:
https://onexlab-io.medium.com/aws-s3-bucket-local-testing-using-localstack-1918fb375280

## LocalStack setup

1. Install `Docker` 

2. Run `docker compose up` to install LocalStack 

3. Add the `images` bucket: `aws --endpoint-url=http://localhost:4566 s3 mb s3://images`

## Run tests

From the root folder run:

```
npm test
```

## Examine data

### List images

aws --endpoint-url=http://localhost:4566 s3 ls images

### Download image

aws --endpoint-url=http://localhost:4566 s3 cp s3://images/[IMAGE] [IMAGE_OUT]


