#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { addCharacter } from '../lib/characters.js'

async function input() {
	let character = await inquirer.prompt([
		{
			name: 'game',
			message: 'Select the game:',
			type: 'list',
			choices: ['genshin', 'starrail', 'zzz', 'wuwa']
		},
		{
			name: 'name',
			message: 'Enter the name of the character:',
			type: 'input'
		},
		{
			name: 'key',
			message: 'Enter an alternative key for the character:',
			type: 'input'
		},
		{
			name: 'rarity',
			message: 'Enter the rarity:',
			type: 'number'
		},
		{
			name: 'weapon',
			message: 'Enter the weapon type:',
			type: 'input'
		},
		{
			name: 'element',
			message: 'Enter the element:',
			type: 'input'
		},
		{
			name: 'banner',
			message: 'Enter the banner name:',
			type: 'input'
		}
	])
	let colorsQ = await inquirer.prompt([
		{ name: 'confirm', message: 'Do you want to add colors?', type: 'confirm' }
	])

	if (colorsQ.confirm) {
		let colors = await inquirer.prompt([
			{
				name: 'primary',
				message: 'Enter the primary colors:',
				type: 'input'
			},
			{
				name: 'secondary',
				message: 'Enter the secondary colors:',
				type: 'input'
			},
			{
				name: 'textAccent',
				message: 'Enter the text color:',
				type: 'input'
			}
		])

		for (let c in colors) {
			if (c != 'text') colors[c] = colors[c].split(' ')
		}

		character.colors = colors
	}

	return character
}

const askQuestions = async () => {
	const characterArray = []
	let loop = false
	do {
		const userRes = await input()
		characterArray.push(userRes)
		const confirmQ = await inquirer.prompt([
			{
				name: 'confirm',
				message: 'Do you want to add more characters?',
				type: 'confirm'
			}
		])
		if (confirmQ.confirm) {
			loop = true
		} else {
			loop = false
		}
	} while (loop)

	return characterArray
}

export default async function addCharacters() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Creating the todos...').start()

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
