"use strict"

const statuses = require('statuses');

module.exports = async function (ctx, next) {
	try {
		await next()
	} catch (err) {
		console.log(err)
		ctx.status = Number.isInteger(err.status) ? err.status : 500
		ctx.body = err.message || statuses(err.status)
	}
}
