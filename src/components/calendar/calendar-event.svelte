<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	export let game, event, week
	let className = ''

	export { className as class }

	const startDay = [
		'col-start-7',
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6'
	]

	const durations = [
		'col-span-1',
		'col-span-2',
		'col-span-3',
		'col-span-4',
		'col-span-5',
		'col-span-6',
		'col-span-7'
	]

	const start = (week) => (week > event.startWeek ? 1 : event.startDate.day())
	const duration = (week) =>
		week < event.endWeek ? 7 - start(week) : event.endDate.day() - start(week) - 1

	const fontMultipliers = {
		genshin: 1,
		starrail: 1,
		wuwa: 1,
		zzz: 0.75
	}
</script>

<button
	class={twMerge(
		`mx-2 px-2 flex items-center justify-items-start rounded h-3 md:h-5 text-ellipsis truncate ${game} ${startDay[start(week)]} ${durations[duration(week)]} ${event.colors.primary} ${event.colors.textAccent}`,
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
