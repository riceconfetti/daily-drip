#!/usr/bin/env node
import { input, select, checkbox, number, confirm, search } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { editVersion } from '../lib/version.js'

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
		})
	}

	const actions = await checkbox({
		message: 'What do you want to edit?',
		choices: ['name', 'startDate', 'midDate', 'endDate']
	})
	let askEvents = false

	for (const editValue of actions) {
		switch (editValue) {
			case 'name':
				version.name = await input({
					message: 'Enter version name:'
				})
				break
			case 'startDate':
			case 'midDate':
			case 'endDate':
				version[editValue] = await input({
					message: 'Enter new date:'
				})
				askEvents = true
				break
		}
	}
	if (askEvents) {
		version.updateEvents = await confirm({
			message: 'Do you want to update events?'
		})
	}

	return version
}

const askQuestions = async () => {
	const versionArray = []
	let loop = false
	do {
		const userRes = await init()
		versionArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to edit more versions?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return versionArray
}

export default async function editVersions() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Editing versions...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			editVersion(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Versions saved!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
