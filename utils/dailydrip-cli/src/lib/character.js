import * as fs from 'fs'

const SYMBOLS = /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g

String.prototype.isEmpty = function () {
	return this.length === 0 || !this.trim()
}

export function addCharacter(answers) {
	const characterKey = answers.key ? answers.key : answers.name.toLowerCase().replace(SYMBOLS, '')
	const characterPath = `/src/content/characters/${answers.game}/${characterKey}.json`

	let characterObj = {
		name: answers.name,
		rarity: answers.rarity,
		images: {
			gachaSplash: characterKey + '/gachaSplash',
			gachaCard: characterKey + '/gachaCard',
			bannerCard: characterKey + '/bannerCard'
		}
	}

	characterObj.element = answers.element ? answers.element : answers.game
	characterObj.weaponType = answers.weapon ? answers.weapon : answers.game

	if (answers.rarity == 5) {
		characterObj.bannerName = answers.banner ? answers.banner : '?????'

		if (!answers.colors) {
			characterObj.colors = {
				primary:
					answers.game === 'zzz'
						? gradients.zzz[characterObj.element]
						: 'bg-gradient-to-r from-[#000] to-[#FFF]',
				secondary:
					answers.game === 'zzz'
						? gradients.zzz[characterObj.element + '_secondary']
						: 'bg-gradient-to-t from-[#000] to-[#FFF00]',
				textAccent:
					answers.game === 'zzz' ? gradients.zzz[characterObj.element + '_text'] : 'text-[#000]'
			}
		} else {
			const aColors = answers.colors
			characterObj.colors = {
				primary: !aColors.primary.isEmpty()
					? `bg-gradient-to-r from-[#${aColors.primary[0]}] to-[#${aColors.primary[1]}]`
					: 'bg-gradient-to-r from-[#000] to-[#FFF]',
				secondary: !aColors.secondary.isEmpty()
					? `bg-gradient-to-t from-[#${aColors.secondary[0]}] to-[#${aColors.secondary[1]}00]`
					: 'bg-gradient-to-t from-[#000] to-[#FFF00]',
				textAccent: !aColors.textAccent.isEmpty() ? `text-[#${aColors.textAccent}]` : 'text-[#000]'
			}
		}
	}

	fs.writeFile(characterPath, JSON.stringify(characterObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})
}

export function editCharacter(answers) {
	const characterKey = answers.key
	const characterPath = `/src/content/characters/${answers.game}/${characterKey}.json`

	let characterObj = JSON.parse(fs.readFileSync(characterPath, { encoding: utf8, flags: r }))

	for (const [key, value] of Object.entries(answers)) {
		if (key == 'colors') {
			for (const [k, v] of Object.entries(value)) {
				switch (k) {
					case 'textAccent':
						characterObj[k] = `text-[#${v}]`
						break
					case 'primary':
						characterObj[k] = `bg-gradient-to-r from-[#${v[0]}] to-[#${v[1]}]`
						break
					case 'secondary':
						characterObj[k] = `bg-gradient-to-t from-[#${v[0]}] to-[#${v[1]}00]`
						break
				}
			}
		} else {
			characterObj[key] = value
		}
	}

	fs.writeFile(characterPath, JSON.stringify(characterObj, null, 4), (err) => {
		if (err) {
			console.error(err)
		}
	})
}
