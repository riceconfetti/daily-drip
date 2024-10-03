#!/usr/bin/env node
import { input, select, checkbox, number, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import ora from 'ora'
import { editCharacter } from '../lib/character.js'

async function input() {
	let character = {
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
			message: 'Enter the character key:'
		})
	}
    
    let loop = false;
	do {
		const editValue = await select({
            message: 'What do you want to edit?',
            choice: [ 'name', 'rarity','element','weapon','banner','colors']
        })

        switch(editValue) {
            case 'name': 
                character.newName = await input({
                    message: 'Enter the new name'
                })
            case 'rarity': 
                character.rarity = await number({
                    message: 'Enter new rarity:'
                }); break;
            case 'element': 
                character.element = await input({
                    message: 'Enter new element:'
                }); break;
            case 'weapon': 
                character.weapon = await input({
                    message: 'Enter new weapon type:'
                }); break;
            case 'banner': 
                character.banner = await input({
                    message: 'Enter banner name:'
                }); break;
            case 'colors': 
                const colorType = await checkbox({
                    message: 'Select the palette you want to edit:',
                    choices: ['primary', 'secondary', 'textAccent'
                    ]
                })

                colorType.forEach(async (t)=>{
                    const colors = await input({
                        message: 'Enter new color(s):'
                    })
    
                    if (t == 'primary' || t == 'secondary') {
                        character.colors[t] == colors.split(' ')
                    } else {
                        character.colors[t] == colors
                    }
                })

                break;
        }

        const confirmValues = await confirm({message: 'Do you want to edit another value?'})

        if (confirmValues) {
			loop = true
			console.log('-----------------------')
		} else {
			loop = false
		}

	} while (done)

	return character
}


const askQuestions = async () => {
	const characterArray = []
	let loop = false
	do {
		const userRes = await input()
		characterArray.push(userRes)
		const confirmQ = await confirm({ message: 'Do you want to edit more characters?' })

		if (confirmQ) {
			loop = true
			console.log('-----------------------')
		} else {
			loop = false
		}
	} while (loop)

	return characterArray
}

export default async function editCharacters() {
	try {
		const userResponse = await askQuestions()

		let spinner = ora('Editing characters...').start()

		for (let i in userResponse) {
			const response = userResponse[i]
			editCharacter(response)
		}

		spinner.stop()
		console.log(chalk.greenBright('Characters saved!'))
	} catch (error) {
		// Error Handling
		console.log('Something went wrong, Error: ', error)
		process.exit(1)
	}
}
