import { input, select, checkbox, number, confirm, Separator } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { editVersion } from '../lib/version.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Edit More Version(s)', value: 'addNew' },
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
			message: 'Enter the patch number:',
			step: 0.1
		})
	}

	const actions = await checkbox({
		message: 'What do you want to edit?',
		choices: [
			{ name: 'Version Name', value: 'name' },
			{ name: 'Start Date', value: 'startDate' },
			{ name: 'Mid Date', value: 'midDate' },
			{ name: 'End Date', value: 'endDate' }
		]
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

export default async function editVersions() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Editing ' + response.patch).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			editVersion(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Versions saved!\n'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
