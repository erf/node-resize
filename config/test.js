// configuration for testing against the LocalStack docker container
module.exports = {
	port: 4000,
	bucket: 'images',
	s3: {
		region: 'us-east-1',
		endpoint: 'http://localhost:4566',
		s3ForcePathStyle: true
	},
	sizes: [[84, 84], [172, 172], [320, 320], [640, 640], [1024, 1024]],
	keep_original: true,
}

