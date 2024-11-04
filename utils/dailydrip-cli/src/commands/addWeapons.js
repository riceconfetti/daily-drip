#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { addWeapon } from '../lib/weapon.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Add More Character(s)', value: 'addNew' },
			{ name: 'Change Game', value: 'changeGame' },
			new Separator(),
			{ name: chalk.bold.yellow('Back'), value: 'back' },
			new Separator(' ')
		]
	})

	return action
}

async function askNextWeapon(game) {
	let weapon = {
		game: game,
		name: await input({
			message: 'Enter weapon name:'
		}),
		rarity: await number({
			message: 'Enter weapon rarity:'
		}),
		type: await input({
			message: 'Enter weapon type:'
		})
	}

	return weapon
}

const askQuestions = async () => {
	const weaponArray = []
	let loop = false
	try {
		let game = await setGame()
		if (game === 'back') {
			return
		} else {
			weaponArray.push(await askNextWeapon(game))
			let nextAction = await askMenu()
			while (nextAction !== 'back') {
				if (nextAction === 'changeGame') {
					game = await setGame()
					nextAction = await askMenu()
				} else if (nextAction == 'addNew') {
					weaponArray.push(await askNextWeapon(game))
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

	return weaponArray
}

export default async function addWeapons() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Adding ' + response.name).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			addWeapon(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Weapons added!\n'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
