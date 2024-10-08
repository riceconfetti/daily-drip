<script lang="ts">
	import EventSingle from './event-single.svelte'
	import { Event } from '../../classes/event.ts'
	import { settings } from '$scripts/settings'
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	dayjs.extend(utc)
	dayjs.extend(timezone)

	export let collections, images

	let timesEvents = collections.events.map((e) => {
		let timeEvent = JSON.parse(JSON.stringify(e)).data
		let version = collections.versions.find((v) =>
			v.id.startsWith(e.data.game.id + '/' + e.id.split('/')[1])
		).data
		let game = collections.games.find((g) => g.id.startsWith(e.data.game.id)).data

		if (e.data.startDate == version.startDate) {
			timeEvent.startDate = dayjs
				.utc(e.data.startDate + `T${game.times.version}Z`)
				.tz(dayjs.tz.guess())
				.format('YYYY-MM-DDTHH:mm[Z]')
			timeEvent.endDate = dayjs
				.utc(
					e.data.endDate +
						`T${game.times.update.find((t) => t.zone == settings.get()[e.data.game.id]).time}Z`
				)
				.tz(dayjs.tz.guess())
				.format('YYYY-MM-DDTHH:mm[Z]')
		} else {
			timeEvent.startDate = dayjs
				.utc(
					e.data.startDate +
						`T${game.times.update.find((t) => t.zone == settings.get()[e.data.game.id]).time}Z`
				)
				.tz(dayjs.tz.guess())
				.format('YYYY-MM-DDTHH:mm[Z]')

			timeEvent.endDate = dayjs
				.utc(e.data.endDate + `T${game.times.maintenance}Z`)
				.tz(dayjs.tz.guess())
				.format('YYYY-MM-DDTHH:mm[Z]')
		}
		return timeEvent
	})

	let events: Event[] = new Array()
	timesEvents.forEach((data) => {
		let event = new Event(data)
		event.game = data.game.id
		event.startDate = data.startDate
		event.endDate = data.endDate
		if (data.type == 'banner' || data.type == 'debut' || data.type == 'select') {
			const character = collections.characters.find((c) => c.id == data.character.id)
			event.title = character.data.bannerName
			event.image = character.data.images.bannerCard
			event.colors = character.data.colors
		}
		//console.log(event);
		events.push(event)
	})

	$: currentEvents = events
		.filter((e) => {
			return dayjs(e.startDate) < dayjs() && dayjs(e.endDate) > dayjs()
		})
		.sort((a, b) => {
			return dayjs(a.startDate) < dayjs(b.startDate) ? -1 : 1
		})

	$: upcomingEvents = events
		.filter((e) => {
			return dayjs(e.startDate) > dayjs() && dayjs(e.startDate) < dayjs().add(6, 'w')
		})
		.sort((a, b) => {
			return dayjs(a.startDate) < dayjs(b.startDate) ? -1 : 1
		})
</script>

<section
	class="overlay flex h-full w-full flex-col gap-2 transition md:flex-row lg:min-h-0 lg:flex-col lg:overflow-auto lg:p-4"
>
	<div class="flex w-full flex-col gap-2">
		<h2 class="playfair-display-semibold text-dark">Current Events</h2>
		{#each currentEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
	<div class="flex w-full flex-col gap-2">
		<h2 class="playfair-display-semibold text-dark">Upcoming Events</h2>
		{#each upcomingEvents as eventDetails}
			<EventSingle {eventDetails} {images} />
		{/each}
	</div>
</section>
