#!/usr/bin/env node
import { program } from 'commander'
import { select } from '@inquirer/prompts'
import chalk from 'chalk'
import addCharacters from '../src/commands/addCharacters'
import editCharacters from '../src/commands/editCharacters'


program.action(() => {
	switch (addOrEdit()) {
		case 'add':
			select({
				message: 'What do you want to add?',
				choices: [
					{ value: 'Character' },
					{ value: 'Weapon' },
					{ value: 'Version' },
					{ value: 'Event' }
				]
			}).then((answers) => {
				switch (answers) {
					case 'Character':
						addCharacters()
						break
					case 'Weapon':
						break
					case 'Version':
						break
					case 'Event':
						break
				}
			})
			break
		case 'edit':
			select({
				message: 'What do you want to edit?',
				choices: [
					{ value: 'Character' },
					{ value: 'Weapon' },
					{ value: 'Version' },
					{ value: 'Event' }
				]
			}).then((answers) => {
				switch (answers) {
					case 'Character':
							editCharacters()
						break
					case 'Weapon':
						break
					case 'Version':
						break
					case 'Event':
						break
				}
			})
	}
})

async function addOrEdit() {
	const action = select({
		message: 'Select an operation: ',
		choices: [{ value: 'add' }, { value: 'edit' }]
	})
	return action
}
