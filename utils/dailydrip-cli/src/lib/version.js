#!/usr/bin/env node
import * as fs from 'fs'
import dayjs from 'dayjs'

const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g

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
}
