#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')

const options = yargs
	.usage('Usage: -n <name> -g <game> -t <type> -c <color>')
	.option('n', {
		alias: 'name',
		describe: 'Character Name',
		type: 'string',
		demandOption: true
	})
	.option('g', {
		alias: 'game',
		describe: 'Game',
		type: 'string',
		demandOption: true
	})
	.option('t', { alias: 'type', describe: 'Color Type', type: 'string', demandOption: true })
	.option('c', { alias: 'colors', describe: 'Colors', type: 'array', demandOption: true }).argv

let characterPath = `src/content/characters/${options.game}/${options.name}.json`
let characterObj = JSON.parse(
	fs.readFileSync(characterPath, {
		encoding: 'utf8',
		flag: 'r'
	})
)
switch (options.type) {
	case 'primary':
		characterObj.colors.primary = `bg-gradient-to-r from-[#${options.colors[0]}] to-[#${options.colors[1]}]`
		break
	case 'secondary':
		characterObj.colors.secondary = `bg-gradient-to-t from-[#${options.colors[0]}] to-[#${options.colors[1]}00]`
		break
	case 'text':
		characterObj.colors.textAccent = `text-[#${options.colors[0]}]`
}

fs.writeFile(characterPath, JSON.stringify(characterObj, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
