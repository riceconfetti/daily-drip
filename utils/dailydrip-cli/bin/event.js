#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const dayjs = require('dayjs')

const options = yargs
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
	.option('h', {
		alias: 'half',
		describe: 'phase half',
		type: 'number',
		demandOption: true
	})
	.option('t', {
		alias: 'type',
		describe: 'type',
		type: 'string',
		demandOption: true
	})
	.option('n', {
		alias: 'name',
		describe: 'Name',
		type: 'string'
	})
	.option('w', {
		alias: 'weapon',
		describe: 'Weapon',
		type: 'string'
	}).argv

const version = JSON.parse(
	fs.readFileSync(`src/content/versions/${options.game}/${options.patch}.json`, {
		encoding: 'utf8',
		flag: 'r'
	})
)

let eventPath = `src/content/events/${options.game}/${options.patch}`
switch (options.type) {
	case 'select':
	case 'banner':
	case 'debut':
		eventPath += '/characters/five'
		break
	case 'rate-up':
		eventPath += '/characters/four'
		break
	case 'weapon':
		eventPath += '/weapons'
	case 'chronicle':
		eventPath += '/chronicle'
}

if (!fs.existsSync(eventPath)) {
	fs.mkdirSync(eventPath, { recursive: true })
}

eventPath += `/${options.type == 'chronicle' ? 'chronicle_' : '' + options.name ? options.name : options.weapon ? options.weapon : 'phase_' + options.half}.json`

let eventObj = {
	status: 'spec',
	type: options.type,
	game: options.game,
	startDate: options.half == 1 ? version.startDate : version.midDate,
	endDate: options.half == 1 ? version.midDate : version.endDate
}

if (['select', 'banner', 'debut', 'rate-up'].includes(options.type)) {
	eventObj.character = `${options.game}/${options.name}`
}

if (options.weapon) {
	eventObj.weapon = `${options.game}/${options.weapon}`
}

fs.writeFile(eventPath, JSON.stringify(eventObj, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
