import { persistentMap } from '@nanostores/persistent'

export type SettingsValue = {
	genshin: 'na' | 'as' | 'eu' | 'sar'
	starrail: 'na' | 'as' | 'eu'
	wuwa: 'na' | 'sea' | 'as' | 'eu' | 'hmt'
	zzz: 'na' | 'as' | 'eu' | 'sar'
}

export const settings = persistentMap<SettingsValue>('timezones', {
	genshin: 'na',
	starrail: 'na',
	wuwa: 'na',
	zzz: 'na'
})
