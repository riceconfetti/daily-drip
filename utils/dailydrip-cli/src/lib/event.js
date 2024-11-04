import * as fs from 'fs'

export function addEvent(answers) {
	let eventPath = `src/content/events/${answers.game}/${answers.patch}`
	let version

	try {
		version = JSON.parse(
			fs.readFileSync(`src/content/versions/${answers.game}/${answers.patch}.json`)
		)
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log(`Version ${answers.patch} Not Found!`)
			return
		}
	}

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

	const fileName = `${answers.type == 'chronicle' ? 'chronicle_' : '' + (answers.character ? answers.character : answers.weapon ? answers.weapon : 'phase_' + answers.phase)}.json`
	eventPath += '/' + fileName

	let eventObj = {
		status: answers.status,
		type: answers.type,
		game: answers.game,
		startDate: answers.phase == 1 ? version.startDate : version.midDate,
		endDate: answers.phase == 1 ? version.midDate : version.endDate
	}

	if (['select', 'banner', 'debut', 'rate-up'].includes(answers.type)) {
		eventObj.character = `${answers.game}/${answers.character}`
	}

	if (answers.weapon) {
		eventObj.weapon = `${answers.game}/${answers.weapon}`
	}

	fs.writeFileSync(eventPath, JSON.stringify(eventObj, null, 4))
}

export function editEvent(answers) {
	let game = answers.path.split('events\\')[1].split('\\')[0]
	let version
	try {
		version = JSON.parse(
			fs.readFileSync(
				`src/content/versions/${game}/${answers.path.split('events\\')[1].split('\\')[1]}.json`
			)
		)
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log(`Version ${game}/${answers.path.split('events\\')[1].split('\\')[1]} Not Found!`)
			return
		}
	}
	let eventPath = answers.path
	let eventObj = JSON.parse(
		fs.readFileSync(eventPath, {
			encoding: 'utf8',
			flag: 'r'
		})
	)

	for (const [key, value] of Object.entries(answers)) {
		if (key == 'phase') {
			eventObj.startDate = value == 1 ? version.startDate : version.midDate
			eventObj.endDate = value == 1 ? version.midDate : version.endDate
		} else if (key == 'character' || key == 'weapon') {
			eventObj[key] = game + '/' + value
		} else if (key != 'path') {
			eventObj[key] = value
		}
	}

	fs.writeFileSync(eventPath, JSON.stringify(eventObj, null, 4))
}
