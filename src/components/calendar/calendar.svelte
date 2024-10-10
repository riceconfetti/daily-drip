<script lang="ts">
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	import isoWeek from 'dayjs/plugin/isoWeek'
	import weekOfYear from 'dayjs/plugin/weekOfYear'
	import arraySupport from 'dayjs/plugin/arraySupport'
	import groupBy from 'core-js/actual/array/group-by'
	import { onMount } from 'svelte'
	import gsap from 'gsap/dist/gsap'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
	import { Observer } from 'gsap/dist/Observer'

	dayjs.extend(isoWeek)
	dayjs.extend(weekOfYear)
	dayjs.extend(utc)
	dayjs.extend(timezone)
	dayjs.extend(arraySupport)

	const Day_Headings = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const columns = [
		'col-start-7',
		'col-start-1',
		'col-start-2',
		'col-start-3',
		'col-start-4',
		'col-start-5',
		'col-start-6'
	]

	const date = dayjs().date()
	const month = dayjs().month()
	const year = dayjs().year()
	const weeksInMonth = Math.ceil(dayjs().daysInMonth() / 7)
	const calendarMap = Array(dayjs().daysInMonth())
		.fill(0)
		.map((_, i) => dayjs([year, month, i + 1]))
		.groupBy((d) => d.isoWeek())

	// console.log(calendarMap)
	let calendar = Object.entries(calendarMap).map((x) => x[1])

	for (const week of calendar) {
		if (week[0].date() == 1) {
			while (week.length < 7) {
				week.unshift(week[0].subtract(1, 'day'))
			}
		}

		if (week.at(-1).date() == week.at(-1).daysInMonth()) {
			while (week.length < 7) {
				week.push(week.at(-1).add(1, 'day'))
				// console.log(week)
			}
		}
	}

	let weekBefore = []
	let weekAfter = []
	while (calendar.length > 4) {
		weekAfter = calendar.pop()
	}

	if (weekBefore.length == 0) {
		weekBefore.unshift(calendar[0][0].subtract(1, 'day'))
		while (weekBefore.length < 7) {
			weekBefore.unshift(weekBefore[0].subtract(1, 'day'))
		}
	}

	if (weekAfter.length == 0) {
		weekAfter.push(calendar.at(-1).at(-1).add(1, 'day'))
		while (weekBefore.length < 7) {
			weekAfter.push(weekAfter.at(-1).add(1, 'day'))
		}
	}

	$: refDate = calendar[2][0]

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, Observer)

		gsap.set('.weekBefore', { yPercent: -100 })
		function getbefore() {
			gsap.to('.weekBefore', { yPercent: 0 })
			gsap.to('.mainWeeks', { yPercent: 25 })
		}

		document.querySelector('.mainWeeks').addEventListener('click', getbefore)
	})
</script>

<div class="w-full h-full p-2 flex flex-col gap-2">
	<h2 class="playfair-display-sc-bold text-xl text-black text-opacity-70">
		{refDate.format('MMMM')}
	</h2>

	<div class="w-full grid grid-cols-7 justify-items-center">
		{#each Day_Headings as day}
			<h2 class="crimson-text-regular text-2xs uppercase text-dark text-opacity-70">{day}</h2>
		{/each}
	</div>

	<div class="calendar w-full h-full relative overflow-hidden">
		<!-- Before -->
		<div
			class="panel weekBefore z-10 top-0 border-b-0 absolute inset-x-0 border box-border border-dark border-opacity-30 text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-7 bg-light h-1/4"
		>
			{#each weekBefore as day}
				<div
					class={`${columns[day.day()]} p-2 crimson-text-regular ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
				>
					{day.date()}
				</div>
			{/each}
		</div>

		<!-- Main -->
		<div
			class="panel mainWeeks box-border absolute inset-0 border border-dark border-opacity-30 w-full grid grid-cols-7 auto-rows-auto divide-y divide-dark divide-opacity-30 bg-light"
		>
			{#each calendar as week, index}
				<div
					class=" text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-subgrid w-full col-span-7"
				>
					{#each week as day}
						<div
							class={`${columns[day.day()]} p-2 crimson-text-regular ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
						>
							{day.date()}
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<!-- After -->
		<div
			class="panel box-border border-t-0 weekAfter -z-10 bottom-0 absolute inset-x-0 border border-dark border-opacity-30 text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-7 bg-light h-1/4"
		>
			{#each weekAfter as day}
				<div
					class={`${columns[day.day()]} p-2 crimson-text-regular  ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
				>
					{day.date()}
				</div>
			{/each}
		</div>
	</div>
</div>
