#!/usr/bin/env node

const yargs = require('yargs')
const fs = require('fs')
const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g
const gradients = JSON.parse(
	fs.readFileSync('src/assets/gradients.json', {
		encoding: 'utf8',
		flag: 'r'
	})
)

const options = yargs
	.usage('Usage: -n <name>')
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
	.option('r', {
		alias: 'rarity',
		describe: 'Rarity',
		type: 'number',
		demandOption: true
	})
	.option('b', { alias: 'banner', describe: 'Banner Name', type: 'string' })
	.option('w', { alias: 'weapon', describe: 'Weapon Type', type: 'string' })
	.option('e', { alias: 'element', describe: 'Element', type: 'string' }).argv

let characterPath = `src/content/characters/${options.game}/${options.name.toLowerCase().replace(SYMBOLS, '')}.json`
let characterObj = {
	name: options.name,
	rarity: options.rarity,
	images: {
		gachaSplash: options.name.toLowerCase().replace(SYMBOLS, '') + '/gachaSplash',
		gachaCard: options.name.toLowerCase().replace(SYMBOLS, '') + '/gachaCard',
		bannerCard: options.name.toLowerCase().replace(SYMBOLS, '') + '/bannerCard'
	}
}

characterObj.element = options.element ? options.element : options.game
characterObj.weaponType = options.weapon ? options.weapon : options.game

if (options.rarity == 5) {
	characterObj.bannerName = options.banner ? options.banner : '?????'
	characterObj.colors = {
		primary:
			options.game === 'zzz'
				? gradients.zzz[characterObj.element]
				: 'bg-gradient-to-r from-[#000] to-[#FFF]',
		secondary:
			options.game === 'zzz'
				? gradients.zzz[characterObj.element + '_secondary']
				: 'bg-gradient-to-t from-[#000] to-[#FFF00]',
		textAccent:
			options.game === 'zzz' ? gradients.zzz[characterObj.element + '_text'] : 'text-[#000]'
	}
}

fs.writeFile(characterPath, JSON.stringify(characterObj, null, 4), (err) => {
	if (err) {
		console.error(err)
	}
})
