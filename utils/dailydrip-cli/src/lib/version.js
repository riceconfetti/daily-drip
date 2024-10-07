#!/usr/bin/env node
import * as fs from 'fs'
import dayjs from 'dayjs'

String.prototype.isEmpty = function () {
	return this.length === 0 || !this.trim()
}
export function addVersion(answers) {
	const versions = fs.readdirSync(`src/content/versions/${answers.game}`)
	const lastVersion = JSON.parse(
		fs.readFileSync(`src/content/versions/${answers.game}/` + versions.at(-1), {
			encoding: 'utf8',
			flag: 'r'
		})
	)

	let versionPath = `src/content/versions/${answers.game}/${answers.patch}.json`
	let versionObj = {
		version: answers.patch,
		startDate: lastVersion.endDate,
		midDate: dayjs(lastVersion.endDate).add(21, 'day').format('YYYY-MM-DD'),
		endDate: dayjs(lastVersion.endDate).add(42, 'day').format('YYYY-MM-DD')
	}

	if (answers.name) {
		versionObj.name = answers.name
	}
	fs.writeFile(versionPath, JSON.stringify(versionObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})

	if (answers.initialize) {
		initializeEvents(answers.game, answers.patch, versionObj)
	}
}

function initializeEvents(game, patch, version) {
	const eventPath = `src/content/events/${game}/${patch}`

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
		character: game + '/',
		game: game,
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
		character: game + '/',
		game: game,
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
		character: game + '/',
		game: game,
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
		character: game + '/',
		game: game,
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
		game: game,
		weapon: game + '/',
		startDate: version.startDate,
		endDate: version.midDate
	}
	fs.writeFile(
		eventPath + '/weapons/phase1.json',
		JSON.stringify(weapon_phase1, null, 4),
		(err) => {
			if (err) {
				console.error(err)
			}
		}
	)

	let weapon_phase2 = {
		status: 'spec',
		type: 'weapon',
		game: game,
		weapon: game + '/',
		startDate: version.midDate,
		endDate: version.endDate
	}
	fs.writeFile(
		eventPath + '/weapons/phase2.json',
		JSON.stringify(weapon_phase2, null, 4),
		(err) => {
			if (err) {
				console.error(err)
			}
		}
	)
}

export function editVersion(answers) {
	let versionPath = `src/content/versions/${answers.game}/${answers.patch}.json`
	let versionObj = JSON.parse(fs.readFileSync(versionPath))

	for (const [key, value] of Object.entries(answers)) {
		if (key == 'patch') {
			versionObj.version = value
		} else {
			versionObj[key] = value
		}
	}

	fs.writeFile(versionPath, JSON.stringify(versionObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})
}
