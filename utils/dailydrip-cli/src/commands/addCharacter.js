#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { addCharacter } from '../lib/character.js'

async function input() {
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
		name: await input({
			message: 'Enter the name of the character:'
		}),
		key: await input({
			message: 'Enter an alternative key for the character:'
		}),
		rarity: await number({
			message: 'Enter the rarity:'
		}),
		weapon: await input({
			message: 'Enter the weapon type:'
		}),
		element: await input({
			message: 'Enter the element:'
		}),
		banner: await input({
			message: 'Enter the banner name:'
		})
	}

	if (character.rarity == 5) {
		const confirmColors = await confirm({ message: 'Do you want to add colors?', type: 'confirm' })

		if (confirmColors) {
			let colors = {
				primary: await input({
					message: 'Enter the primary colors:'
				}),
				secondary: await input({
					message: 'Enter the secondary colors:'
				}),
				textAccent: await input({
					message: 'Enter the text color:'
				})
			}

			for (let c in colors) {
				if (c != 'text') colors[c] = colors[c].split(' ')
			}

			character.colors = colors
		}
	}

	return character
}

const askQuestions = async () => {
	const characterArray = []
	let loop = false
	do {
		const userRes = await input()
		characterArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to add more characters?' })

		if (confirmQ) {
			loop = true
			console.log('-----------------------')
		} else {
			loop = false
		}
	} while (loop)

	return characterArray
}

export default async function addCharacters() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Adding characters...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			addCharacter(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Characters added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
