#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { addEvent } from '../lib/event.js'

async function init() {
	let event = {
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
		phase: await number({
			message: 'Enter the phase number:'
		}),
		type: await select({
			message: 'Select the event type:',
			choices: ['banner', 'rate-up', 'weapon', 'debut', 'select', 'chronicle']
		}),
		status: await select({
			message: 'Select the event status:',
			choices: ['spec', 'confirmed']
		})
	}

	if (['select', 'banner', 'debut', 'rate-up', 'chronicle'].includes(event.type)) {
		event.character = await input({
			message: 'Enter character name:'
		})
	}

	if (['select', 'banner', 'debut', 'weapon', 'chronicle'].includes(event.type)) {
		event.weapon = await input({
			message: 'Enter weapon name:'
		})
	}

	return event
}

const askQuestions = async () => {
	const eventArray = []
	let loop = false
	do {
		const userRes = await init()
		eventArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to add more events?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return eventArray
}

export default async function addEvents() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Adding events...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			addEvent(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Events added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
