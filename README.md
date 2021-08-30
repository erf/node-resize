# node-resize

An image resize server built using [node.js](https://nodejs.org), [sharp](https://github.com/lovell/sharp) and [S3](https://aws.amazon.com/s3/)

## How it works

1. we receive `multipart/form-data` requests at `api/image`

2. images are resized using `sharp` to a set of configured `sizes` 

3. images are uploaded to an `AWS S3` bucket using streams

4. we return a `JSON` [response](#response) with links and sizes

## Config

We use [node-config](https://github.com/lorenwest/node-config) to configure
`AWS`, sizes and more.

### Example

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

The response is an `JSON` array per image with links and sizes of all the resized
images.

### Example

```javascript
[{
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

If you have ideas on how to improve `node-resize`, please create an issue or a PR.

Let's make the best (and fastest) image-resize server for Node.js !
