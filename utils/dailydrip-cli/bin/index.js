#!/usr/bin/env node
import { program } from 'commander'
import { select } from '@inquirer/prompts'
import chalk from 'chalk'
import addCharacters from '../src/commands/addCharacters.js'
import editCharacters from '../src/commands/editCharacters.js'

program.action(async () => {
	let action = await select({
		message: 'Select an operation: ',
		choices: [{ value: 'add' }, { value: 'edit' }]
	})
	let choice = await select({
		message: 'What do you want to add?',
		choices: ['Character', 'Weapon', 'Version', 'Event']
	})

	switch (action + ' ' + choice) {
		case 'add Character':
			addCharacters()
			break
		case 'edit Character':
			editCharacters()
			break
		case 'add Weapon':
			addWeapons()
			break
		case 'edit Weapon':
			editWeapons()
			break
		case 'add Version':
			addVersions()
			break
		case 'edit Version':
			editVersions()
			break
		case 'add Event':
			addEvents()
			break
		case 'edit Event':
			editEvents()
			break
	}
})

program.parse()
