import { input, select, checkbox, number, Separator } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { editWeapon } from '../lib/weapon.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Edit More Version(s)', value: 'addNew' },
			{ name: 'Change Game', value: 'changeGame' },
			new Separator(),
			{ name: chalk.bold.green('Back'), value: 'back' },
			new Separator(' ')
		]
	})

	return action
}

async function askNextWeapon(game) {
	let weapon = {
		game: game,
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

export default async function editWeapons() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Editing ' + response.key).start()

			await new Promise((resolve) => setTimeout(resolve, 1000))
			editWeapon(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Weapons saved!\n'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
