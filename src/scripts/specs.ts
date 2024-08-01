import { version } from 'react'
import type { Phase } from '../classes/version.ts'
import dayjs from 'dayjs'

let simBanners = (game) => (game === 'wuwa' ? 1 : 2)

function getCharacters(game, events, collections) {
	let characters = {
		fiveStars: [],
		fourStars: []
	}

	events
		.filter(({ data }) => {
			return data.type != 'weapon'
		})
		.forEach((event) => {
			let character = collections.characters.find((c) => c.id === event.data.character.id)
			let characterData = character.data
			characterData.id = character.id
			if (event.data.status === 'spec') {
				characterData.spec = true
			}
			if (event.data.type === 'debut') {
				characterData.debut = true
			}
			if (character.data.rarity === 5) {
				// 5 Star
				characters.fiveStars.push(characterData)
			} else {
				characters.fourStars.push(characterData)
			}
		})

	characters.fiveStars.sort((a, b) => {
		const x = a.debut ? 1 : -1
		const y = b.debut ? 1 : -1
		return y - x
	})

	while (characters.fiveStars.length < simBanners(game)) {
		characters.fiveStars.push({
			name: '????',
			rarity: 5,
			bannerName: '????',
			element: game,
			weaponType: game,
			images: {
				gachaSplash: `${game}/gachaSplash`,
				gachaCard: `${game}/gachaCard`,
				bannerCard: `${game}/bannerCard`
			}
		})
	}

	while (characters.fourStars.length < 3) {
		characters.fourStars.push({
			name: '????',
			rarity: 4,
			element: game,
			images: {
				gachaSplash: `${game}/gachaSplash`,
				gachaCard: `${game}/gachaCard`,
				bannerCard: `${game}/bannerCard`
			}
		})
	}

	return characters
}

function getWeapons(game, events, collections) {
	let weapons = {
		fiveStars: [],
		fourStars: []
	}

	events.forEach((event) => {
		if (event.data.weapon) {
			let weapon = collections.weapons.find((w) => w.id === event.data.weapon.id)
			let weaponData = weapon.data
			weaponData.id = weapon.id
			if (weapon.data.rarity === 5) {
				// 5 Star
				weapons.fiveStars.push(weaponData)
			} else {
				weapons.fourStars.push(weaponData)
			}
		}
	})

	while (weapons.fiveStars.length < simBanners(game)) {
		weapons.fiveStars.push({
			name: '????',
			rarity: 5,
			game: game,
			weaponType: 'default',
			icon: `./images/weapons/default/fiveStars/${game}_default.png`
		})
	}

	if (weapons.fourStars.length < 5 && game == 'genshin') {
		const weaponTypes = {
			genshin: ['bow', 'sword', 'catalyst', 'polearm', 'claymore']
		}

		weaponTypes[game].forEach((weapon) => {
			const weaponTypeExists =
				weapons.fourStars.find((w) => {
					w.weaponType == weapon
				}) != undefined
			if (!weaponTypeExists) {
				weapons.fourStars.push({
					name: '????',
					rarity: 5,
					weaponType: weapon,
					icon: `./images/weapons/default/fourStars/${game}_${weapon}.png`,
					game: game
				})
			}
		})
		weapons.fourStars.sort((a, b) => {
			return weaponTypes[game].indexOf(a.weaponType) - weaponTypes[game].indexOf(b.weaponType)
		})
	} else {
		while (weapons.fourStars.length < 3) {
			weapons.fourStars.push({
				name: '????',
				rarity: 4,
				game: game,
				weaponType: 'default',
				icon: `./images/weapons/default/fourStars/${game}_default.png`
			})
		}
	}

	return weapons
}

export function getPhase(game, versionData, number, collections, timezone) {
	console.log(versionData.midDate)
	let phaseDate = number === 0 ? versionData.startDate : versionData.midDate

	//console.log(collections.events)

	let events = collections.events.filter(
		({ id, data }) =>
			id.startsWith(`${game}/${versionData.version}`) &&
			data.type != 'chronicle' &&
			data.startDate === phaseDate
	)

	//console.log(events)

	let phase: Phase = {
		number: number,
		date: phaseDate,
		characters: getCharacters(game, events, collections),
		weapons: getWeapons(game, events, collections)
	}

	return phase
}
