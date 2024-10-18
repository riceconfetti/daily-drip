import dayjs from 'dayjs'
import type { Phase } from '../classes/version.ts'
import type { Character } from 'src/classes/character.ts'
import { Weapon } from 'src/classes/weapon.ts'

let simBanners = (game) => (game === 'wuwa' || game === 'zzz' ? 1 : 2)
let rateUpBanners = (game) => (game === 'zzz' ? 2 : 3)

const weaponTypes = {
	genshin: ['bow', 'sword', 'catalyst', 'polearm', 'claymore']
}

function getCharacters(game, events, collections, select) {
	let characters = {
		fiveStars: [],
		fourStars: []
	}

	events
		.filter(({ data }) => {
			return data.type != 'weapon' && data.type != 'select'
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

	while (characters.fiveStars.length < simBanners(game) && !select) {
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
			},
			colors: {
				primary: 'bg-gradient-to-r from-[#000] to-[#FFF]',
				secondary: 'bg-gradient-to-t from-[#000] to-[#00000000]',
				textAccent: 'text-[#000]'
			}
		})
	}

	while (characters.fourStars.length < rateUpBanners(game)) {
		characters.fourStars.push({
			name: '????',
			rarity: 4,
			element: game,
			weaponType: game,
			images: {
				gachaSplash: `${game}/gachaSplash`,
				gachaCard: `${game}/gachaCard`,
				bannerCard: `${game}/bannerCard`
			}
		})
	}

	return characters
}

function getWeapons(game, events, collections, select) {
	let weapons = {
		fiveStars: [],
		fourStars: []
	}

	events
		.filter(({ data }) => {
			return data.type != 'select'
		})
		.forEach((event) => {
			if (event.data.weapon) {
				//console.log(event.data.weapon)
				let weapon = collections.weapons.find((w) => w.id === event.data.weapon.id)
				let weaponData = weapon.data
				weaponData.id = weapon.id
				if (event.data.type === 'debut') {
					weaponData.debut = true
				}
				if (weapon.data.rarity === 5) {
					// 5 Star
					weapons.fiveStars.push(weaponData)
				} else {
					weapons.fourStars.push(weaponData)
				}
			}
		})

	while (weapons.fiveStars.length < simBanners(game) && !select) {
		weapons.fiveStars.push({
			name: '????',
			rarity: 5,
			game: game,
			weaponType: 'default',
			icon: `./images/weapons/default/fiveStars/${game}_default.webp`
		})
	}

	if (weapons.fourStars.length < 5 && game == 'genshin') {
		weaponTypes[game].forEach((weapon) => {
			const weaponTypeExists = weapons.fourStars.some((w) => w.weaponType === weapon)
			if (!weaponTypeExists) {
				weapons.fourStars.push({
					name: '????',
					rarity: 5,
					weaponType: weapon,
					icon: `./images/weapons/default/fourStars/${game}_${weapon}.webp`,
					game: game
				})
			}
		})
	} else {
		while (weapons.fourStars.length < rateUpBanners(game)) {
			weapons.fourStars.push({
				name: '????',
				rarity: 4,
				game: game,
				weaponType: 'default',
				icon: `./images/weapons/default/fourStars/${game}_default.webp`
			})
		}
	}
	if (game === 'genshin') {
		weapons.fourStars.sort((a, b) => {
			return weaponTypes[game].indexOf(a.weaponType) - weaponTypes[game].indexOf(b.weaponType)
		})
	}

	weapons.fiveStars.sort((a, b) => {
		const x = a.debut ? 1 : -1
		const y = b.debut ? 1 : -1
		return y - x
	})

	return weapons
}

export function getPhase(game, versionData, number, collections) {
	//console.log(versionData.midDate)
	let phaseDate = number === 0 ? versionData.startDate : versionData.midDate
	//console.log(collections.events)

	let events = collections.events.filter(
		({ id, data }) =>
			id.startsWith(`${game}/${versionData.version}`) &&
			data.type != 'chronicle' &&
			data.startDate === phaseDate
	)

	const select = events.some((x) => x.data.type == 'select')

	let selectEvents = events.filter(({ id, data }) => {
		return data.type === 'select'
	})

	let phase: Phase = {
		number: number,
		date: `${phaseDate}`,
		characters: getCharacters(game, events, collections, select),
		weapons: getWeapons(game, events, collections, select)
	}

	if (selectEvents.length != 0) {
		let indelibleCoterie = {
			characters: [],
			weapons: []
		}

		selectEvents.forEach((e) => {
			if (e.data.character) {
				let character = collections.characters.find((c) => c.id === e.data.character.id)
				let characterData: Character = character.data

				if (e.data.status === 'spec') {
					characterData.spec = true
				}
				indelibleCoterie.characters.push(characterData)
			}
			if (e.data.weapon) {
				let weapon = collections.weapons.find((w) => w.id === e.data.weapon.id)

				let weaponData: Weapon = new Weapon(weapon.data, game, e.data.priority)

				if (e.data.status === 'spec') {
					weaponData.spec = true
				}
				indelibleCoterie.weapons.push(weaponData)
			}
		})

		indelibleCoterie.weapons.sort((a, b) => {
			const x = a.priority ? 1 : 0
			const y = b.priority ? 1 : 0
			return y - x
		})
		//console.log(indelibleCoterie)
		phase.select = indelibleCoterie
	}
	// console.log(phase)
	return phase
}

export function getTimeVersion(version, timezone, game) {
	let v = JSON.parse(JSON.stringify(version))

	v.startDate = version.startDate + `T${game.times.version + game.times.zones.dev}`
	v.midDate = version.midDate + `T${game.times.update + game.times.zones[timezone]}`
	v.endDate =
		version.endDate +
		`T${game.times.maintenance + (game.name != 'Zenless Zone Zero') ? game.times.zones.dev : game.times.zone[timezone]}`

	v.phases[0].date = v.startDate
	v.phases[1].date = v.midDate

	return v
}

export function getEventTimes(events, game, timezone, versions) {}
