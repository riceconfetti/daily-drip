import { select, Separator } from '@inquirer/prompts'
import chalk from 'chalk'

export default async function setGame() {
	return await select({
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
			},
			new Separator(),
			{ name: chalk.bold.yellow('Back'), value: 'back' },
			new Separator(' ')
		]
	})
}
