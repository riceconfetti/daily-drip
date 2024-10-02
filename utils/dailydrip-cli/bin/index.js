#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'

program.action(() => {
	inquirer.prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'What do you want to add/edit?',
			list: ['Character', 'Weapon', 'Version', 'Event']
		}
	])
})
