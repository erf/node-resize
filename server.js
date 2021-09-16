"use strict"

const path = require('path')
const Koa = require('koa')
const logger = require('koa-logger')
const body = require('koa-better-body')
const config = require('config')
const router = require('koa-router')()
const convert = require('koa-convert')

const error = require('./lib/error')
const resize = require('./lib/resize')
const status = require('./lib/status')

const app = new Koa()
app.use(error)
app.use(logger())
app.use(convert(body({
	uploadDir: path.join(__dirname, 'uploads'),
	keepExtensions: true,
})))

router.post('/api/image', resize)

router.get('/api/status', status)

app.use(router.routes())

const port = process.env.PORT || config.port

const server = app.listen(port)

console.log('node-resize running on port ' + port)

exports.close = () => {
	server.close()
}

