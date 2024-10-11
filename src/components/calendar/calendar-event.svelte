<script lang="ts">
	import colors from './colors.json'
	export let game, event, week

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

	console.log(event.data.character)
</script>

<button
	class={` mx-2 px-2 flex items-center justify-items-start rounded h-3 md:h-5 text-ellipsis truncate ${game} ${startDay[start(week)]} ${durations[duration(week)]} ${event.colors.primary} ${event.colors.textAccent} `}
>
	<p class="text-2xs leading-tight">{event.label}</p>
</button>
