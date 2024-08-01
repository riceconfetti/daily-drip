import { Character } from './character'
import type { Weapon } from './weapon'

export interface Phase {
	number: number
	date: string
	characters?: {
		fiveStars: Character[]
		fourStars: Character[]
	}
	weapons?: {
		fiveStars: Weapon[]
		fourStars: Weapon[]
	}
}
export class Version {
	version: number
	startDate: string
	midDate: string
	endDate: string
	name?: string
	phases?: Phase[]
	chronicle: {
		characters: Character[]
		weapons: Weapon[]
	}
	constructor(data) {
		this.version = data.version
		this.startDate = data.startDate
		this.midDate = data.midDate
		this.endDate = data.startDate
		if (data.name != undefined) {
			this.name = data.name
		}
	}
}
