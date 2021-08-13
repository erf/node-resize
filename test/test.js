const test = require('ava')

const axios = require('axios');
const config = require('config')
const FormData = require('form-data');
const fs = require('fs');

let server
test.before(async t => {
	server = require('../server')
})

test.after.always(t => {
	server.close()
})

test('upload image', async t => {

	const form = new FormData();
	form.append('image.jpg', fs.createReadStream('test/image.jpg'));

	const res = await axios.post(`http://localhost:${config.port}/api/image`,
		form,
		{ headers: form.getHeaders() }
	);

	t.is(res.status, 200)
	t.is(res.data.length, 1)

	const photo = res.data[0]

	t.truthy(photo.id)
	t.truthy(photo.ext)
	t.truthy(photo.filename)
	t.truthy(photo.url)
	t.truthy(photo.main)

	t.is(photo.scaled.length, 5)

	t.truthy(photo.scaled[0].url)
	t.is(photo.scaled[0].width, 84)
	t.is(photo.scaled[0].height, 84)

	t.truthy(photo.scaled[1].url)
	t.is(photo.scaled[1].width, 172)
	t.is(photo.scaled[1].height, 172)

	t.truthy(photo.scaled[2].url)
	t.is(photo.scaled[2].width, 320)
	t.is(photo.scaled[2].height, 320)

	t.truthy(photo.scaled[3].url)
	t.is(photo.scaled[3].width, 640)
	t.is(photo.scaled[3].height, 640)

	t.truthy(photo.scaled[4].url)
	t.is(photo.scaled[4].width, 1024)
	t.is(photo.scaled[4].height, 1024)

	//t.truthy(photo.scaled[5].url)
	//t.is(photo.scaled[5].width, 1920)
	//t.is(photo.scaled[5].height, 1080)

})

