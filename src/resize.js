"use strict"

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const sharp = require('sharp')
const sizeOf = require('image-size')
const config = require('config')
const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk')

const readFilePromise = promisify(fs.readFile)
const unlinkPromise = promisify(fs.unlink)

const s3 = new AWS.S3(config.s3)

module.exports = async ctx => {

	// validate files
	if (!ctx.request.files || ctx.request.files.length !== 1) {
		console.log('Error: missing files')
		throw { status: 400 }
	}

	// read file from /upload
	const file = ctx.request.files[0]

	// get image size
	const originalSize = sizeOf(file.path)

	// resize sizes
	const sizes = config.sizes

	// validate sizes
	if (!sizes || sizes.empty) {
		throw { status: 400 }
	}

	const fileBuffer = await readFilePromise(file.path)

	// create image id, 6c84fb90-12c4-11e1-840d-7b25c5ee775a
	const uuid = uuidv1()

	// ext -> .jpg
	const ext = path.extname(file.path)

	// filename -> 6c84fb90-12c4-11e1-840d-7b25c5ee775a.jpg
	const filename = uuid + ext

	// resize
	const resizeTasks = sizes.map(([w, h]) => sharp(fileBuffer).resize(w, h).toBuffer())

	// perform tasks
	const imageBuffers = await Promise.all(resizeTasks)

	// if keep original image
	if (config.keep_original) {
		imageBuffers.push(fileBuffer)
		sizes.push([originalSize.width, originalSize.height])
	}

	// upload
	const uploadTasks = sizes.map((size, i) => {
		const data = {
			Bucket: config.bucket,
			Key: `${uuid}_${size[0]}_${size[1]}_${ext}`,
			Body: imageBuffers[i],
			ACL: "public-read"
		}
		return s3.upload(data).promise()
	})

	let uploadResults = await Promise.all(uploadTasks)

	const scaled = uploadResults.map((res, i) => ({
		url: res.Location,
		width: sizes[i][0],
		height: sizes[i][1]
	}))

	// last
	let [last] = uploadResults.slice(-1)

	const photo = {
		id: uuid,
		ext: ext,
		filename: filename,
		url: last.Location,
		main: true,
		scaled: scaled
	}

	// in the future we might support multiple photos
	const photos = [photo]

	// delete original image
	await unlinkPromise(file.path)

	// set response
	ctx.body = photos
	ctx.status = 200
}
