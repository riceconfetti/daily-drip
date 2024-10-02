#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const dayjs = require('dayjs')

const options = yargs
	.usage('Usage: -p <patch> -g <game> -n <name>')
	.option('p', {
		alias: 'patch',
		describe: 'Patch',
		type: 'number',
		demandOption: true
	})
	.option('g', {
		alias: 'game',
		describe: 'Game',
		type: 'string',
		demandOption: true
	})
	.option('n', {
		alias: 'name',
		describe: 'Name',
		type: 'string'
	}).argv

const versions = fs.readdirSync(`src/content/versions/${options.game}`)
const lastVersion = JSON.parse(
	fs.readFileSync(`src/content/versions/${options.game}/` + versions.at(-1), {
		encoding: 'utf8',
		flag: 'r'
	})
)

let versionPath = `src/content/versions/${options.game}/${options.patch}.json`
let versionObj = {
	version: options.patch,
	startDate: lastVersion.endDate,
	midDate: dayjs(lastVersion.endDate).add(21, 'day').format('YYYY-MM-DD'),
	endDate: dayjs(lastVersion.endDate).add(42, 'day').format('YYYY-MM-DD')
}

if (options.name) {
	versionObj.name = options.name
}
fs.writeFile(versionPath, JSON.stringify(versionObj, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
