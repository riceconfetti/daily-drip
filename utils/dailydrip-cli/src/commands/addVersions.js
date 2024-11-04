#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { addVersion } from '../lib/version.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Add More Version(s)', value: 'addNew' },
			{ name: 'Change Game', value: 'changeGame' },
			new Separator(),
			{ name: chalk.bold.yellow('Back'), value: 'back' },
			new Separator(' ')
		]
	})

	return action
}

async function askNextVersion(game) {
	let version = {
		game: game,
		patch: await number({
			message: 'Enter version patch number:',
			step: 0.1
		}),
		name: await input({
			message: 'Enter version name:'
		}),
		initialize: await confirm({ message: 'Do you want to initialize events?' })
	}

	return version
}

const askQuestions = async () => {
	const versionArray = []
	try {
		let game = await setGame()
		if (game === 'back') {
			return
		} else {
			versionArray.push(await askNextVersion(game))

			let nextAction = await askMenu()
			while (nextAction !== 'back') {
				if (nextAction === 'changeGame') {
					game = await setGame()
					nextAction = await askMenu()
				} else if (nextAction == 'addNew') {
					versionArray.push(await askNextVersion(game))
					nextAction = await askMenu()
				}
			}
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error
		}
	}

	return versionArray
}

export default async function addVersions() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Adding ' + response.patch).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			addVersion(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Versions added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
