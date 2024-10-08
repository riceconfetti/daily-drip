#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { addVersion } from '../lib/version.js'

async function init() {
	let version = {
		game: await select({
			message: 'Select the game:',
			choices: [
				{
					value: 'genshin',
					name: 'Genshin Impact'
				},
				{
					value: 'starrail',
					name: 'Honkai: Starrail'
				},
				{
					value: 'wuwa',
					name: 'Wuthering Waves'
				},
				{
					value: 'zzz',
					name: 'Zenless Zone Zero'
				}
			]
		}),
		patch: await number({
			message: 'Enter the patch number:',
			step: 0.1
		}),
		name: await input({
			message: 'Enter the patch name:'
		}),
		initialize: await confirm({ message: 'Do you want to initialize events?' })
	}

	return version
}

const askQuestions = async () => {
	const versionArray = []
	let loop = false
	do {
		const userRes = await init()
		versionArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to add more versions?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return versionArray
}

export default async function addVersions() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Adding version...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			addVersion(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Versions added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
