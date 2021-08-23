# node-resize

An image resize server built using [node.js](https://nodejs.org), [sharp](https://github.com/lovell/sharp), [S3](https://aws.amazon.com/s3/) and [Koa](https://koajs.com/)

## How it works

1. A Node.js server receives a `multipart/form-data` request at `api/image`

2. The server resizes the image using `sharp` to a set of `sizes` configured
using [node-config](https://github.com/lorenwest/node-config)

3. The server uploads the resized images to an `AWS S3` bucket configured in a
[config](#config) file

4. The server returns a `json` [response](#response) with URLs and sizes of all
the resized images on `S3`

## Config

We use [node-config](https://github.com/lorenwest/node-config) to configure the
service `port`, AWS `s3` keys, `bucket` and the `sizes` you'd like in return.

### Format

```javascript
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

## Response

The response is an json array per image with links and sizes of all the resized
images.

Example:

```javascript
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

## Test

See `test/README.md`

## Contribute

If you have ideas on how to speed up performance or improve this repo somehow, please create an issue or a PR. Thanks!

Let's make the best image-resize micro service for nodejs :D