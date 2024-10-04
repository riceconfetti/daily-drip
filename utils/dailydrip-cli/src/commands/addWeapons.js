#!/usr/bin/env node
import { input, select, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { addWeapon } from '../lib/weapon.js'

async function init() {
	let weapon = {
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
			message: 'Enter the name of the weapon:'
		}),
		rarity: await number({
			message: 'Enter the rarity:'
		}),
		type: await input({
			message: 'Enter the weapon type:'
		})
	}

	return weapon
}

const askQuestions = async () => {
	const weaponArray = []
	let loop = false
	do {
		const userRes = await init()
		weaponArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to add more characters?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return weaponArray
}

export default async function addWeapons() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Adding weapons...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			addWeapon(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Weapons added!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
