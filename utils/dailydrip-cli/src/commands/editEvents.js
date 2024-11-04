import { input, select, checkbox, number, Separator } from '@inquirer/prompts'
import fileSelector from 'inquirer-file-selector'
import chalk from 'chalk'
import ora from 'ora'
import { editEvent } from '../lib/event.js'

async function askMenu() {
	console.log('')
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Edit More Event(s)', value: 'addNew' },
			new Separator(),
			{ name: chalk.bold.green('Back'), value: 'back' },
			new Separator(' ')
		]
	})

	return action
}

async function askNextEvent() {
	let event = {
		path: await fileSelector({
			message: 'Enter the event path:',
			basePath: 'src/content/events',
			filter: (file) => file.name.endsWith('.json')
		})
	}

	const actions = await checkbox({
		message: 'What do you want to edit?',
		choices: ['status', 'type', 'phase', 'character', 'weapon']
	})

	for (const editValue of actions) {
		switch (editValue) {
			case 'status':
				event.status = await select({
					message: 'Select event status:',
					choices: ['spec', 'confirmed']
				})
				break
			case 'type':
				event.type = await input({
					message: 'Enter event type:'
				})
				break
			case 'phase':
				event.eventType = await number({
					message: 'Enter new phase:'
				})
				break
			case 'character':
				event.character = await input({
					message: 'Enter new character:'
				})
				break
			case 'weapon':
				event.weapon = await input({
					message: 'Enter new weapon:'
				})
				break
		}
	}
	return event
}

const askQuestions = async () => {
	const eventArray = []
	try {
		eventArray.push(await askNextEvent())

		let nextAction = await askMenu()
		while (nextAction !== 'back') {
			eventArray.push(await askNextEvent())
			nextAction = await askMenu()
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error
		}
	}

	return eventArray
}

export default async function editEvents() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Editing ' + response.path.split('\\').at(-1)).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			editEvent(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Events saved!\n'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
