import * as fs from 'fs'
const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g

export function addWeapon(answers) {
	let weaponPath = `src/content/weapons/${answers.game}/${answers.name.replace(SYMBOLS, '')}.json`
	let weaponObj = {
		name: answers.name,
		rarity: answers.rarity,
		weaponType: answers.type,
		icon: answers.name.replace(SYMBOLS, '') + '.webp'
	}

	fs.writeFileSync(weaponPath, JSON.stringify(weaponObj, null, 4))
}

export function editWeapon(answers) {
	let weaponPath = `src/content/weapons/${answers.game}/${answers.key}.json`
	let weaponObj = JSON.parse(fs.readFileSync(weaponPath, { encoding: 'utf8', flag: 'r' }))

	for (const [key, value] of Object.entries(answers)) {
		if (key == 'name') {
			fs.rm(weaponPath, (err) => {
				if (err) {
					console.error(err)
				}
			})
			weaponPath = `src/content/weapons/${answers.game}/${value.replace(SYMBOLS, '')}.json`
			weaponObj.name = value
			weaponObj.icon = value.replace(SYMBOLS, '') + '.webp'
		} else if (!['key', 'game'].includes(key)) {
			weaponObj[key] = value
		}
	}

	fs.writeFileSync(weaponPath, JSON.stringify(weaponObj, null, 4))
}
