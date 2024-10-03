import * as fs from 'fs'
const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g

String.prototype.isEmpty = function () {
	return this.length === 0 || !this.trim()
}
export function addWeapon(options) {
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
}
