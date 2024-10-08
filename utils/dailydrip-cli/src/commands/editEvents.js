#!/usr/bin/env node
import { input, select, checkbox, number, confirm, search } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { editEvent } from '../lib/event.js'
import fileSelector from 'inquirer-file-selector'

async function init() {
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
	let loop = false
	do {
		const userRes = await init()
		eventArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to edit more events?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return eventArray
}

export default async function editEvents() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Editing events...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			editEvent(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Events saved!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
