<script lang="ts">
	import { Calendar } from 'bits-ui'
	import { settings } from '$scripts/settings'
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	dayjs.extend(utc)
	dayjs.extend(timezone)

	export let events, versions, games

	let eventDates = Object.fromEntries(
		events.map((e) => {
			let version = versions.find((v) =>
				v.id.startsWith(e.data.game.id + '/' + e.id.split('/')[1])
			).data
			let game = games.find((g) => g.id.startsWith(e.data.game.id))

			let times = {
				start: version.startDate + `T${game.data.times.version + game.data.times.zones.dev}`,
				mid:
					version.midDate +
					`T${game.data.times.update + game.data.times.zones[settings.get()[game.id]]}`,
				end:
					version.endDate +
					`T${game.data.times.maintenance + (game.data.name != 'Zenless Zone Zero' ? game.data.times.zones.dev : game.data.times.zones[settings.get()[game.id]])}`
			}

			let event = []
			if (e.data.startDate == version.startDate) {
				event.push(dayjs.utc(times.start).tz(dayjs.tz.guess()).format('YYYY-MM-DD'))
			} else {
				event.push(dayjs.utc(times.mid).tz(dayjs.tz.guess()).format('YYYY-MM-DD'))
			}
			event.push(game.id)
			return event
		})
	)

	const isDateUnavailable: Calendar.Props['isDateUnavailable'] = (date) => {
		return dayjs(date).format('YYYY-MM-DD') in eventDates
	}
</script>

<Calendar.Root
	let:months
	let:weekdays
	{isDateUnavailable}
	class="flex w-full flex-col p-4 text-center md:grid md:h-full md:grid-rows-[fit-content(theme(spacing.32))] md:min-h-0"
	fixedWeeks={true}
	weekdayFormat="short"
>
	<Calendar.Header class="playfair-display-sc-bold flex items-center justify-between gap-2 p-2">
		<Calendar.PrevButton
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
		>
			<i class="ri-arrow-left-s-line"></i>
		</Calendar.PrevButton>
		<Calendar.Heading />
		<Calendar.NextButton
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
		>
			<i class="ri-arrow-right-s-line"></i>
		</Calendar.NextButton>
	</Calendar.Header>

	{#each months as month, i (i)}
		<Calendar.Grid
			class="md:flex md:h-full md:w-full md:border-collapse md:flex-col md:gap-4 md:text-left md:min-h-0"
		>
			<Calendar.GridHead class="hidden h-min md:block">
				<Calendar.GridRow
					class="playfair-display-sc-bold grid grid-cols-7 justify-items-center text-dark text-opacity-50"
				>
					{#each weekdays as day}
						<Calendar.HeadCell class="align-center text-xs">
							<div>{day.slice(0, 3)}</div>
						</Calendar.HeadCell>
					{/each}
				</Calendar.GridRow>
			</Calendar.GridHead>
			<Calendar.GridBody
				class=" min-h-0 md:grid md:h-full md:grid-rows-6 md:divide-y md:border md:border-black md:border-opacity-20"
			>
				{#each month.weeks as weekDates}
					<Calendar.GridRow
						class="md:grid md:grid-cols-7 md:divide-x md:border-black md:border-opacity-20 md:align-top"
					>
						{#each weekDates as date}
							<Calendar.Cell
								{date}
								class="min-h-0 p-2 md:aspect-square md:h-full md:w-full md:border-black md:border-opacity-20 md:p-1 md:px-2"
							>
								{@const event = isDateUnavailable
									? eventDates[dayjs(date).format('YYYY-MM-DD')]
									: ''}
								<Calendar.Day
									{date}
									month={month.value}
									data-game={event}
									class="crimson-text-regular rounded-9px text-foreground hover:border-foreground data-[selected]:text-background group relative inline-flex aspect-square h-auto w-full items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent p-2 text-sm font-normal leading-none data-[outside-month]:pointer-events-none data-[game='genshin']:bg-genshin-event data-[game='zzz']:bg-zzz-event data-[game='starrail']:bg-starrail-event data-[game='wuwa']:bg-wuwa-event data-[game='genshin']:text-white data-[game='zzz']:text-white data-[game='starrail']:text-white data-[game='wuwa']:text-white data-[disabled]:opacity-20 md:min-h-0 md:w-min md:p-[.35rem]"
								>
									{date.day}
								</Calendar.Day>
								{#if event}
									<p
										class={`ml-1 hidden w-min ${event == 'genshin' ? 'text-2xs' : 'text-xs'} ${event} text-[#535353] md:inline xl:${event == 'genshin' ? 'text-xs' : 'text-sm'}`}
									>
										{event.charAt(0).toUpperCase() + event.slice(1)}
									</p>
								{/if}
							</Calendar.Cell>
						{/each}
					</Calendar.GridRow>
				{/each}
			</Calendar.GridBody>
		</Calendar.Grid>
	{/each}
</Calendar.Root>
