#!/usr/bin/env node
import * as fs from 'fs'

const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g

export function addEvent(answers) {
	let eventPath = `src/content/events/${answers.game}/${answers.patch}`
	switch (answers.type) {
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
			break
		case 'chronicle':
			eventPath += '/chronicle'
			break
	}

	if (!fs.existsSync(eventPath)) {
		fs.mkdirSync(eventPath, { recursive: true })
	}

	eventPath += `/${answers.type == 'chronicle' ? 'chronicle_' : '' + (answers.name != undefined ? answers.name : answers.weapon != undefined ? answers.weapon : 'phase_' + answers.half)}.json`

	let eventObj = {
		status: answers.status,
		type: answers.type,
		game: answers.game,
		startDate: answers.phase == 1 ? version.startDate : version.midDate,
		endDate: answers.phase == 1 ? version.midDate : version.endDate
	}

	if (['select', 'banner', 'debut', 'rate-up'].includes(answers.type)) {
		eventObj.character = `${answers.game}/${answers.name}`
	}

	if (answers.weapon) {
		eventObj.weapon = `${answers.game}/${answers.weapon}`
	}

	fs.writeFile(eventPath, JSON.stringify(eventObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})
}

export function editEvent(answers) {
	let game = answers.path.split('/')[0]
	let version = JSON.parse(
		fs.readFileSync(`${game}/${answers.path.split('/')[2]}.json`, {
			encoding: 'utf8',
			flag: r
		})
	)
	let eventPath = answers.path
	let eventObj = JSON.parse(
		fs.readFileSync(eventPath, {
			encoding: 'utf8',
			flag: r
		})
	)

	for (const [key, value] of Object.entries(answers)) {
		if (key == 'phase') {
			eventObj.startDate = value == 1 ? version.startDate : version.midDate
			eventObj.endDate = value == 1 ? version.midDate : version.endDate
		} else if (key == 'character' || key == 'weapon') {
			eventObj[key] = game + '/' + value
		} else {
			eventObj[key] = value
		}
	}

	fs.writeFile(eventPath, JSON.stringify(eventObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})
}
