"use strict"

const { readFile, unlink } = require('fs/promises')
const { createReadStream } = require('fs')
const { Readable } = require('stream')
const path = require('path')
const sharp = require('sharp')
const sizeOf = require('image-size')
const config = require('config')
const { v1: uuidv1 } = require('uuid')
const AWS = require('aws-sdk')

const s3 = new AWS.S3(config.s3)

module.exports = async ctx => {

	// validate files
	if (!ctx.request.files || ctx.request.files.length !== 1) {
		console.log('Error: missing files')
		throw { status: 400 }
	}

	// read file from /upload
	const [ file ] = ctx.request.files

	// get image size
	const { width, height } = sizeOf(file.path)

	// resize sizes
	const sizes = config.sizes

	// validate sizes
	if (!sizes || sizes.empty) {
		throw { status: 400 }
	}

	// create image id, 6c84fb90-12c4-11e1-840d-7b25c5ee775a
	const uuid = uuidv1()

	// ext -> .jpg
	const ext = path.extname(file.path)

	// filename -> 6c84fb90-12c4-11e1-840d-7b25c5ee775a.jpg
	const filename = uuid + ext

	// readable image buffer
	const imageBuffer = await readFile(file.path)

	// create stream from image buffer
	const readableStream = Readable.from(imageBuffer);

	// resize
	const imageStreams = sizes.map(([w, h]) => readableStream.pipe(sharp().resize(w, h)))

	// if keep original image
	if (config.keep_original) {
		imageStreams.push(readableStream)
		sizes.push([width, height])
	}

	// upload
	const uploadTasks = sizes.map(([w, h], i) => s3.upload({
		Bucket: config.bucket,
		Key: `${uuid}_${w}_${h}_${ext}`,
		Body: imageStreams[i],
		ACL: "public-read"
	}).promise())

	let uploadResults = await Promise.all(uploadTasks)

	const scaled = uploadResults.map((res, i) => ({
		url: res.Location,
		width: sizes[i][0],
		height: sizes[i][1]
	}))

	// last
	let [ last ] = uploadResults.slice(-1)

	const photo = {
		id: uuid,
		ext: ext,
		filename: filename,
		url: last.Location,
		main: true,
		scaled: scaled
	}

	// in the future we might support multiple photos
	const photos = [ photo ]

	// delete original image
	await unlink(file.path)

	// set response
	ctx.body = photos
	ctx.status = 200
}
