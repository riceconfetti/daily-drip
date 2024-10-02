#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')

const options = yargs
	.usage('Usage: -n <name>')
	.option('n', {
		alias: 'name',
		describe: 'Weapon Name',
		type: 'string',
		demandOption: true
	})
	.option('g', {
		alias: 'game',
		describe: 'Game',
		type: 'string',
		demandOption: true
	})
	.option('r', {
		alias: 'rarity',
		describe: 'Rarity',
		type: 'number',
		demandOption: true
	})
	.option('t', {
		alias: 'type',
		describe: 'Weapon Type',
		type: 'string',
		demandOption: true
	}).argv

let weaponPath = `src/content/weapons/${options.game}/${options.name.replace(SYMBOLS, '')}.json`
let weaponObj = {
	name: options.name,
	rarity: options.rarity,
	weaponType: options.type,
	icon: options.name.replace(SYMBOLS, '') + '.webp'
}

fs.writeFile(weaponPath, JSON.stringify(weaponObj, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
