<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	export let game, event, week
	let className = ''

	export { className as class }

	const startDay = [
		'col-start-19',
		'col-start-1',
		'col-start-4',
		'col-start-7',
		'col-start-10',
		'col-start-13',
		'col-start-16'
	]

	const durations = {
		1: ['col-span-1', 'col-span-2', 'col-span-3'],
		2: ['col-span-4', 'col-span-5', 'col-span-6'],
		3: ['col-span-7', 'col-span-8', 'col-span-9'],
		4: ['col-span-10', 'col-span-11', 'col-span-12'],
		5: ['col-span-13', 'col-span-14', 'col-span-15'],
		6: ['col-span-16', 'col-span-17', 'col-span-18'],
		7: ['col-span-19', 'col-span-20', 'col-span-21']
	}

	const start = (week) => (week > event.startWeek ? 1 : event.startDate.day())
	const duration = (week) => {
		if (week == event.startWeek) {
			if (start(week) == 0) {
				return durations[1][2]
			} else {
				return durations[8 - start(week)][2]
			}
		} else if (week == event.endWeek) {
			return durations[7 - event.endDate.day()][0]
		}
		// else if (week < event.endWeek && week > event.startWeek) {
		// 	return durations[7 - start(week)]
		// } else {
		// 	return durations[7 - event.endDate.day()]
		// }
	}

	const fontMultipliers = {
		genshin: 1,
		starrail: 1,
		wuwa: 1,
		zzz: 0.75
	}

	//
</script>

<button
	class={twMerge(
		`mx-2 px-2 flex items-center rounded h-3 md:h-5 text-ellipsis truncate ${game} ${startDay[start(week)]} ${duration(week)}  ${event.colors.primary} ${event.colors.textAccent}`,
		className
	)}
>
	<p
		style:--2xs={`${fontMultipliers[game] * 0.5}rem`}
		style:--xs={`${fontMultipliers[game] * 0.7}rem`}
		class="text-[length:var(--2xs)] md:text-[length:var(--xs)] leading-tight text-ellipsis truncate w-full text-left"
	>
		{event.label}
	</p>
</button>
