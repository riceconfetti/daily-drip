#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { addEvent } from '../lib/event.js'

async function init() {
	let character = {
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
			message: 'Enter the patch number:'
		}),
		name: await input({
			message: 'Enter the name patch:'
		}),
		initialize: await confirm({ message: 'Do you want to initialize events?' })
	}

	return character
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

	return characterArray
}

export default async function addEvents() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Adding characters...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			addEvent(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Versions added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
