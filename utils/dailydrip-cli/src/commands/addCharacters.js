#!/usr/bin/env node
import { input, select, number, checkbox, Separator } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { addCharacter } from '../lib/character.js'

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

async function askNextCharacter(game) {
	let character = {
		game: game,
		name: await input({
			message: 'Enter character name:'
		}),
		key: await input({
			message: 'Enter an alternative key for the character (optional):'
		}),
		rarity: await number({
			message: 'Enter character rarity:'
		}),
		weapon: await input({
			message: 'Enter character weapon type:'
		}),
		element: await input({
			message: 'Enter character element:'
		})
	}

	if (character.rarity == 5) {
		character.banner = await input({
			message: 'Enter banner name:'
		})
		let colorObj

		let colorType
		do {
			colorType = await select({
				message: 'Enter the color palette(s) (optional):',
				choices: [
					{ name: 'Primary Gradient', value: 'primary' },
					{ name: 'Secondary Gradient', value: 'secondary' },
					{ name: 'Text Accent', value: 'textAccent' },
					new Separator(),
					{ name: chalk.bold.yellow('Back'), value: 'back' },
					new Separator(' ')
				]
			})

			if (colorType !== 'back') {
				const colors = await input({
					message: colorType + ':'
				})

				if (colorType == 'primary' || colorType == 'secondary') {
					colorObj[colorType] = colors.split(' ')
				} else {
					colorObj[colorType] = colors
				}
			}
		} while (colorType !== 'back')

		if (colorObj !== undefined) {
			character.colors = colorObj
		}
	}

	return character
}

const askQuestions = async () => {
	let characterArray = []
	try {
		let game = await setGame()
		if (game === 'back') {
			return
		} else {
			characterArray.push(await askNextCharacter(game))
			let nextAction = await askMenu()
			while (nextAction !== 'back') {
				if (nextAction === 'changeGame') {
					game = await setGame()
					nextAction = await askMenu()
				} else if (nextAction == 'addNew') {
					characterArray.push(await askNextCharacter(game))
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

	return characterArray
}

export default async function addCharacters() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Adding ' + response.name).start()

			await new Promise((resolve) => setTimeout(resolve, 400))
			addCharacter(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Characters added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
