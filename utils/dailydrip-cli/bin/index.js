import { program } from 'commander'
import { select, Separator } from '@inquirer/prompts'
import addCharacters from '../src/commands/addCharacters.js'
import addWeapons from '../src/commands/addWeapons.js'
import addVersions from '../src/commands/addVersions.js'
import addEvents from '../src/commands/addEvents.js'
import editCharacters from '../src/commands/editCharacters.js'
import editWeapons from '../src/commands/editWeapons.js'
import editEvents from '../src/commands/editEvents.js'
import editVersions from '../src/commands/editVersions.js'
import chalk from 'chalk'

const actions = {
	add: {
		character: addCharacters,
		weapon: addWeapons,
		version: addVersions,
		event: addEvents
	},
	edit: {
		character: editCharacters,
		weapon: editWeapons,
		version: editVersions,
		event: editEvents
	}
}

async function actionMenu() {
	return await select({
		message: 'Select an action:',
		choices: [
			{ name: 'Add', value: 'add' },
			{ name: 'Edit', value: 'edit' },
			new Separator(),
			{ name: chalk.bold.yellow('Back'), value: 'back' },
			new Separator(' ')
		]
	})
}

async function askNextAction() {
	let category = await select({
		message: 'Select an category: ',
		choices: [
			{ name: 'Character', value: 'character' },
			{ name: 'Weapon', value: 'weapon' },
			{ name: 'Version', value: 'version' },
			{ name: 'Event', value: 'event' },
			new Separator(),
			{ name: chalk.bold.yellow('Exit'), value: 'exit' },
			new Separator(' ')
		]
	})

	if (category === 'exit') {
		return false
	} else {
		let action = await actionMenu()
		if (action === 'back') {
			return askNextAction()
		}

		return {
			category: category,
			action: action
		}
	}
}

program.action(async () => {
	try {
		let nextAction = await askNextAction()
		while (nextAction) {
			await actions[nextAction.action][nextAction.category]()
			nextAction = await askNextAction()
		}
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			// noop; silence this error
		} else {
			throw error
		}
	}
})

program.parse()
