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
	import { settings } from '$scripts/settings'
	import CalendarEvent from './calendar-event.svelte'

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

	function initCalendar(calendarMap) {
		let calendar = {
			before: [],
			main: Object.entries(calendarMap).map((x) => x[1]),
			after: []
		}

		for (const week of calendar.main) {
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

		while (calendar.main.length > 4) {
			calendar.after = calendar.main.pop()
		}

		if (calendar.before.length == 0) {
			calendar.before.unshift(calendar.main[0][0].subtract(1, 'day'))
			while (calendar.before.length < 7) {
				calendar.before.unshift(calendar.before[0].subtract(1, 'day'))
			}
		}

		if (calendar.after.length == 0) {
			calendar.after.push(calendar.main.at(-1).at(-1).add(1, 'day'))
			while (calendar.after.length < 7) {
				calendar.after.push(calendar.after.at(-1).add(1, 'day'))
			}
		}

		return calendar
	}

	function goBackWeek(calendar) {
		let temp = calendar
		temp.main.unshift(temp.before)
		temp.after = temp.main.pop()
		temp.before = []

		let eDate = temp.main[0][0]
		for (let i = 0; i < 7; ++i) {
			temp.before.unshift(eDate.subtract(1, 'day'))
			eDate = temp.before[0]
		}
		return temp
	}

	function goForwardWeek(calendar) {
		let temp = calendar
		temp.main.push(temp.after)
		temp.before = temp.main.shift()
		temp.after = []

		let eDate = temp.main.at(-1).at(-1)
		for (let i = 0; i < 7; ++i) {
			temp.after.push(eDate.add(1, 'day'))
			eDate = temp.after.at(-1)
		}
		return temp
	}

	let calendar = initCalendar(calendarMap)
	let refDate = calendar.main[1][4]

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, Observer)
		gsap.set('.weekBefore', { yPercent: -100 })
		gsap.set('.weekAfter', { yPercent: 100 })

		let animating
		ScrollTrigger.observe({
			trigger: '.calendar',
			type: 'wheel,touch',
			onUp: () => !animating && getAfter(),
			onDown: () => !animating && getBefore(),
			wheelSpeed: -1,
			tolerance: 50,
			preventDefault: true,
			allowClicks: true,
			onEnable: (self) => (self.savedScroll = self.scrollY()), // save the scroll position
			onChangeY: (self) => self.scrollY(self.savedScroll) // refuse to scroll
		})

		function getBefore() {
			animating = true
			gsap.to('.calendar .weekBefore', { yPercent: 0 })
			gsap.to('.calendar .mainWeeks', {
				yPercent: 25,
				onComplete: () => {
					calendar = goBackWeek(calendar)
					refDate = calendar.main[1][4]
					gsap.set('.calendar .weekBefore', { yPercent: -100 })
					gsap.set('.calendar .mainWeeks', { yPercent: 0 })
					animating = false
				}
			})
		}

		function getAfter() {
			animating = true
			gsap.to('.calendar .weekAfter', { yPercent: 0 })
			gsap.to('.calendar .mainWeeks', {
				yPercent: -25,
				onComplete: () => {
					calendar = goForwardWeek(calendar)
					refDate = calendar.main[1][4]
					gsap.set('.calendar .weekAfter', { yPercent: 100 })
					gsap.set('.calendar .mainWeeks', { yPercent: 0 })
					animating = false
				}
			})
		}
	})

	export let events, versions, games, characters

	let eventMap = events.map((e) => {
		let game = e.data.game.id
		let version = versions.find((v) => v.id.startsWith(game + '/' + e.id.split('/')[1])).data
		let gameData = games.find((g) => g.id.startsWith(game)).data
		let cData = characters.find((c) => c.id == e.data.character.id).data

		let times = {
			start: version.startDate + `T${gameData.times.version}Z`,
			mid:
				version.midDate +
				`T${gameData.times.update.find((t) => t.zone == settings.get()[game]).time}Z`,
			end: version.endDate + `T${gameData.times.maintenance}Z`
		}

		let event = e
		event.game = game
		event.label = cData.bannerName
		event.element = cData.element

		if (e.data.startDate == version.startDate) {
			event.startWeek = dayjs.utc(times.start).isoWeek()
			event.endWeek = dayjs.utc(times.mid).isoWeek()

			event.startDate = dayjs.utc(times.start).tz(dayjs.tz.guess())
			event.endDate = dayjs.utc(times.mid).tz(dayjs.tz.guess())
		} else {
			event.startWeek = dayjs.utc(times.mid).isoWeek()
			event.endWeek = dayjs.utc(times.end).isoWeek()

			event.startDate = dayjs.utc(times.mid).tz(dayjs.tz.guess())
			event.endDate = dayjs.utc(times.end).tz(dayjs.tz.guess())
		}

		return event
	})

	function getEvents(events, week) {
		return events.filter((e) => e.startWeek <= week && e.endWeek >= week)
	}
</script>

<main id="fullPageCalendar" class="w-full h-full p-2 flex flex-col gap-2">
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
			class="panel weekBefore top-0 border-b-0 absolute inset-x-0 border box-border grid grid-cols-8 border-dark border-opacity-30 h-1/4"
		>
			<div class="p-4 h-full w-full flex items-center justify-center">
				<p>{calendar.before[0].isoWeek()}</p>
			</div>
			<div
				class="relative text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-subgrid w-full col-span-7 h-full grid-flow-dense"
			>
				{#each calendar.before as day}
					<div
						class={`${columns[day.day()]} p-2 crimson-text-regular ${dayjs().isSame(day, 'day') ? 'text-accent-light' : ''} ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
					>
						{day.date()}
					</div>
				{/each}
				<div
					class="absolute inset-y-2 top-10 border-none inset-x-0 grid grid-cols-7 gap-1 text-xs auto-rows-min grid-flow-dense"
				>
					{#each getEvents(eventMap, calendar.before[0].isoWeek()) as event}
						<CalendarEvent game={event.game} {event} week={calendar.before[0].isoWeek()} />
					{/each}
				</div>
			</div>
		</div>

		<!-- Main -->
		<div
			class="panel mainWeeks box-border absolute inset-0 border border-dark border-opacity-30 w-full grid grid-cols-8 auto-rows-auto divide-y divide-dark divide-opacity-30 bg-light"
		>
			{#each calendar.main as week, index}
				<div class="p-4 h-full w-full flex items-center justify-center">
					<p>{week[0].isoWeek()}</p>
				</div>
				<div
					class="relative text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-subgrid w-full col-span-7"
				>
					{#each week as day}
						<div
							class={`${columns[day.day()]} p-2 crimson-text-regular ${dayjs().isSame(day, 'day') ? 'text-accent-light' : ''} ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
						>
							{day.date()}
						</div>
					{/each}

					<div
						class="absolute inset-y-2 top-10 border-none inset-x-0 grid grid-cols-7 gap-1 text-xs auto-rows-min grid-flow-dense"
					>
						{#each getEvents(eventMap, week[0].isoWeek()) as event}
							<CalendarEvent game={event.game} {event} week={week[0].isoWeek()} />
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- After -->
		<div
			class="panel weekAfter bottom-0 border-t-0 absolute inset-x-0 border box-border grid grid-cols-8 border-dark border-opacity-30 h-1/4"
		>
			<div class="p-4 h-full w-full flex items-center justify-center">
				<p>{calendar.after[0].isoWeek()}</p>
			</div>
			<div
				class="relative text-sm divide-x divide-dark divide-opacity-30 grid grid-cols-subgrid w-full col-span-7 bg-light h-full"
			>
				{#each calendar.after as day}
					<div
						class={`${columns[day.day()]} p-2 crimson-text-regular ${dayjs().isSame(day, 'day') ? 'text-accent-light' : ''} ${day.month() != refDate.month() ? 'bg-dark bg-opacity-10' : ''}`}
					>
						{day.date()}
					</div>
				{/each}
				<div
					class="absolute inset-y-2 top-10 border-none inset-x-0 grid grid-cols-7 gap-1 text-xs auto-rows-min grid-flow-dense"
				>
					{#each getEvents(eventMap, calendar.after[0].isoWeek()) as event}
						<CalendarEvent game={event.game} {event} week={calendar.after[0].isoWeek()} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
