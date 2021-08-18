# node-resize

An image resize web server built on node.js and sharp.

## model example

``` json
photos: [{
	id: "fea4f480-7ce0-4143-a310-a03c2b2cdbc6",
	ext: "jpg",
	filename: "fea4f480-7ce0-4143-a310-a03c2b2cdbc6.jpg",
	url: "http://s3-eu-west-1.amazonaws.com/my-images/0067505f-99db-4770-8fda-df70c8f879e0.jpg"
	main: true,
	scaled: [{
		width: 640,
		height: 640,
		url: "http://s3-eu-west-1.amazonaws.com/my-images/640x640_0067505f-99db-4770-8fda-df70c8f879e0.jpg"
		}, {
		width: 320,
		height: 320,
		url: "http://s3-eu-west-1.amazonaws.com/my-images/320x320_0067505f-99db-4770-8fda-df70c8f879e0.jpg"
		}, {
		width: 172,
		height: 172,
		url: "http://s3-eu-west-1.amazonaws.com/my-images/172x172_0067505f-99db-4770-8fda-df70c8f879e0.jpg"
		}, {
		width: 84,
		height: 84,
		url: "http://s3-eu-west-1.amazonaws.com/my-images/84x84_0067505f-99db-4770-8fda-df70c8f879e0.jpg"
	}],
}]
```

## config example

``` json
{
	port: 1337,
	bucket: 'images',
	s3: {
		apiVersion: '',
		region: '',
		accessKeyId: '',
		secretAccessKey: ''
	},
	sizes: [[84, 84], [172, 172], [320, 320], [640, 640], [1024, 1024]],
	keep_original: false,
}
```

## Test using LocalStack and local s3 bucket

Based on the article:

https://onexlab-io.medium.com/aws-s3-bucket-local-testing-using-localstack-1918fb375280

1. run Docker container in 'test' folder

docker-compose up

2. create test bucket 'images'

aws --endpoint-url=http://localhost:4566 s3 mb s3://images

3. run test from root folder

npm test

4. use the Commandeer app to check uploaded files

