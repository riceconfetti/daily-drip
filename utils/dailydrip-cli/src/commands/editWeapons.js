#!/usr/bin/env node
import { input, select, checkbox, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { editWeapon } from '../lib/weapon.js'

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
		key: await input({
			message: 'Enter the weapon key:'
		})
	}

	const actions = await checkbox({
		message: 'What do you want to edit?',
		choices: ['name', 'rarity', 'type']
	})

	for (const editValue of actions) {
		switch (editValue) {
			case 'name':
				weapon.name = await input({
					message: 'Enter the new name'
				})
				break
			case 'rarity':
				weapon.rarity = await number({
					message: 'Enter new rarity:'
				})
				break
			case 'type':
				weapon.weaponType = await input({
					message: 'Enter new weapon type:'
				})
				break
		}
	}
	return weapon
}

const askQuestions = async () => {
	const weaponArray = []
	let loop = false
	do {
		const userRes = await init()
		weaponArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to edit more weapons?' })

		if (confirmQ) {
			loop = true
			console.log(chalk.bgBlueBright('----------------'))
		} else {
			loop = false
		}
	} while (loop)

	return weaponArray
}

export default async function editWeapons() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Editing weapons...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			editWeapon(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Weapons saved!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
