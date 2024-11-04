import { input, select, checkbox, number, Separator } from '@inquirer/prompts'
import setGame from './setGame.js'
import chalk from 'chalk'
import ora from 'ora'
import { editCharacter } from '../lib/character.js'

async function askMenu() {
	let action = await select({
		message: 'What do you want to do next?: ',
		choices: [
			{ name: 'Edit More Character(s)', value: 'addNew' },
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
		key: await input({
			message: 'Enter the character key:'
		})
	}

	const actions = await checkbox({
		message: 'What do you want to edit?',
		choices: [
			{ name: 'Name', value: 'name' },
			{ name: 'Rarity', value: 'rarity' },
			{ name: 'Element', value: 'element' },
			{ name: 'Weapon', value: 'weapon' },
			{ name: 'Banner', value: 'banner' },
			{ name: 'Colors', value: 'colors' }
		]
	})

	for (const editValue of actions) {
		switch (editValue) {
			case 'name':
				character.newName = await input({
					message: 'Enter new name'
				})
				break
			case 'rarity':
				character.rarity = await number({
					message: 'Enter new rarity:'
				})
				break
			case 'element':
				character.element = await input({
					message: 'Enter new element:'
				})
				break
			case 'weapon':
				character.weapon = await input({
					message: 'Enter new weapon type:'
				})
				break
			case 'banner':
				character.bannerName = await input({
					message: 'Enter banner name:'
				})
				break
			case 'colors':
				let colorObj = {
					primary: '',
					secondary: '',
					textAccent: ''
				}

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

				character.colors = colorObj
				break
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

export default async function editCharacters() {
	try {
		const userResponse = await askQuestions()

		for (let i in userResponse) {
			const response = userResponse[i]
			let spinner = ora('Editing ' + response.key).start()

			await new Promise((resolve) => setTimeout(resolve, 400))
			editCharacter(response)
			spinner.stopAndPersist()
		}

		console.log(chalk.greenBright('Characters saved!\n'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
