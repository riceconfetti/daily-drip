#!/usr/bin/env node
import { input, select, number, Separator } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { addEvent } from '../lib/event.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Add More Character(s)', value: 'addNew' },
			{ name: 'Change Game', value: 'changeGame' },
			{ name: 'Change Patch', value: 'changePatch' },
			{ name: 'Change Phase', value: 'changePhase' },
			new Separator(),
			{ name: chalk.bold.yellow('Back'), value: 'back' },
			new Separator(' ')
		]
	})

	return action
}

async function askNextEvent(game, patch, phase) {
	let event = {
		game: game,
		patch: patch,
		phase: phase,
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

async function setPatch() {
	return await number({
		message: 'Enter the patch number:',
		step: 0.1
	})
}

async function setPhase() {
	return await number({
		message: 'Enter the phase number:'
	})
}

const askQuestions = async () => {
	const eventArray = []
	try {
		let game = await setGame()
		if (game === 'back') {
			return
		} else {
			let patch = await setPatch()
			let phase = await setPhase()
			eventArray.push(await askNextEvent(game, patch, phase))

			let nextAction = await askMenu()
			while (nextAction !== 'back') {
				switch (nextAction) {
					case 'changeGame':
						game = await setGame()
					case 'changePatch':
						patch = await setPatch()
					case 'changePhase':
						phase = await setPhase()
						nextAction = await askMenu()
						break
					case 'addNew':
						eventArray.push(await askNextEvent(game, patch, phase))
						nextAction = await askMenu()
						break
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

	return eventArray
}

export default async function addEvents() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			const fileName = `${response.type == 'chronicle' ? 'chronicle_' : '' + (response.character ? response.character : response.weapon ? response.weapon : 'phase_' + response.phase)}.json`

			let spinner = ora('Adding ' + fileName).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			addEvent(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Events added!\n'))
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error
		}
	}
}
