<script lang="ts">
	import colors from '$assets/gradients.json'
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
</script>

<button
	class={` mx-2 px-2 flex items-start rounded h-5 text-ellipsis truncate ${game} ${startDay[start(week)]} ${durations[duration(week)]} ${colors[game][event.element]}`}
>
	<p class="text-light text-opacity-70 mix-blend-screen">{event.label}</p>
</button>
