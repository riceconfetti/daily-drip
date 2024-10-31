<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	dayjs.extend(utc)
	import { twMerge } from 'tailwind-merge'
	export let game, event, week
	let className = ''

	export { className as class }

	const startDay = [
		['col-start-1', 'col-start-2', 'col-start-3'],
		['col-start-4', 'col-start-5', 'col-start-6'],
		['col-start-7', 'col-start-8', 'col-start-9'],
		['col-start-10', 'col-start-11', 'col-start-12'],
		['col-start-13', 'col-start-14', 'col-start-15'],
		['col-start-16', 'col-start-17', 'col-start-18'],
		['col-start-19', 'col-start-20', 'col-start-21']
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

	const startEnd = (week) => (week === event.startWeek ? -1 : week === event.endWeek ? 1 : 0)
	const start = (week) => {
		if ([0, 1].includes(startEnd(week))) {
			return startDay[0][0]
		} else {
			if (game == 'hsr') {
				return startDay[event.startDate.day() - 1][1]
			} else {
				return startDay[event.startDate.day()][1]
			}
		}
	}
	const duration = (week) => {
		let startDay = event.startDate.day()
		let endDay = event.endDate.day()

		if (startEnd(week) == -1) {
			return durations[7 - startDay][1]
		} else if (startEnd(week) == 1) {
			if (game == 'hsr') {
				return durations[endDay + 2][0]
			} else {
				return durations[endDay + 1][0]
			}
		} else {
			return durations[7][2]
		}
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
		`mx-2 px-2 flex items-center rounded h-3 md:h-5 text-ellipsis truncate ${game} ${start(week)} ${duration(week)}  ${event.colors.primary} ${event.colors.textAccent}`,
		className
	)}
>
	<p
		style:--2xs={`${fontMultipliers[game] * 0.5}rem`}
		style:--xs={`${fontMultipliers[game] * 0.7}rem`}
		class="text-[length:var(--2xs)] md:text-[length:var(--xs)] leading-tight text-ellipsis truncate w-full text-left"
	>
		<!-- <span class="mr-8 text-white mix-blend-exclusion">
			{event.startWeek + '  -   ' + event.endWeek}
		</span> -->
		{event.label}
		<span class="mr-8 hidden">
			{event.startDate.format('MM/DD [@] HH')} <span class="mx-4"> | </span>
			{event.endDate.format('MM/DD [@] HH')}
		</span>
	</p>
</button>
