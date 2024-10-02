#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')

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
	}).argv

const version = JSON.parse(
	fs.readFileSync(`src/content/versions/${options.game}/${options.patch}.json`, {
		encoding: 'utf8',
		flag: 'r'
	})
)

const eventPath = `src/content/events/${options.game}/${options.patch}`

if (!fs.existsSync(eventPath)) {
	fs.mkdirSync(eventPath, { recursive: true })
}
if (!fs.existsSync(eventPath + '/weapons')) {
	fs.mkdirSync(eventPath + '/weapons')
}
if (!fs.existsSync(eventPath + '/characters/five')) {
	fs.mkdirSync(eventPath + '/characters/five', { recursive: true })
}
if (!fs.existsSync(eventPath + '/characters/four')) {
	fs.mkdirSync(eventPath + '/characters/four')
}

let five_phase1 = {
	status: 'spec',
	type: 'banner',
	character: options.game + '/',
	game: options.game,
	startDate: version.startDate,
	endDate: version.midDate
}

fs.writeFile(
	eventPath + '/characters/five/phase1.json',
	JSON.stringify(five_phase1, null, 4),
	(err) => {
		if (err) {
			console.error(err)
		}
	}
)

let five_phase2 = {
	status: 'spec',
	type: 'banner',
	character: options.game + '/',
	game: options.game,
	startDate: version.midDate,
	endDate: version.endDate
}
fs.writeFile(
	eventPath + '/characters/five/phase2.json',
	JSON.stringify(five_phase2, null, 4),
	(err) => {
		if (err) {
			console.error(err)
		}
	}
)

let four_phase1 = {
	status: 'spec',
	type: 'rate-up',
	character: options.game + '/',
	game: options.game,
	startDate: version.startDate,
	endDate: version.midDate
}
fs.writeFile(
	eventPath + '/characters/four/phase1.json',
	JSON.stringify(four_phase1, null, 4),
	(err) => {
		if (err) {
			console.error(err)
		}
	}
)

let four_phase2 = {
	status: 'spec',
	type: 'rate-up',
	character: options.game + '/',
	game: options.game,
	startDate: version.midDate,
	endDate: version.endDate
}
fs.writeFile(
	eventPath + '/characters/four/phase2.json',
	JSON.stringify(four_phase2, null, 4),
	(err) => {
		if (err) {
			console.error(err)
		}
	}
)

let weapon_phase1 = {
	status: 'spec',
	type: 'weapon',
	game: options.game,
	weapon: options.game + '/',
	startDate: version.startDate,
	endDate: version.midDate
}
fs.writeFile(eventPath + '/weapons/phase1.json', JSON.stringify(weapon_phase1, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})

let weapon_phase2 = {
	status: 'spec',
	type: 'weapon',
	game: options.game,
	weapon: options.game + '/',
	startDate: version.midDate,
	endDate: version.endDate
}
fs.writeFile(eventPath + '/weapons/phase2.json', JSON.stringify(weapon_phase2, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
