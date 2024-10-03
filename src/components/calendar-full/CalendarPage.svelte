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
			let game = e.data.game.id
			let version = versions.find((v) => v.id.startsWith(game + '/' + e.id.split('/')[1])).data
			let gameData = games.find((g) => g.id.startsWith(game)).data

			let event = []
			if (e.data.startDate == version.startDate) {
				event.push(
					dayjs
						.utc(e.data.startDate + `T${gameData.times.version}Z`)
						.tz(dayjs.tz.guess())
						.format('YYYY-MM-DD')
				)
			} else {
				event.push(
					dayjs
						.utc(
							e.data.startDate +
								`T${gameData.times.update.find((t) => t.zone == settings.get().genshin).time}Z`
						)
						.tz(dayjs.tz.guess())
						.format('YYYY-MM-DD')
				)
			}
			event.push(game)
			return event
		})
	)

	const isDateUnavailable: Calendar.Props['isDateUnavailable'] = (date) => {
		return dayjs(date).format('YYYY-MM-DD') in eventDates
	}
</script>

<Calendar.Root
	class="rounded-[15px] p-[22px] shadow-card"
	let:months
	let:weekdays
	{isDateUnavailable}
	weekdayFormat="short"
	fixedWeeks={true}
>
	<Calendar.Header class="flex items-center justify-between">
		<Calendar.PrevButton
			class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt hover:bg-muted active:scale-98 active:transition-all"
		>
			<i class="ri-arrow-left-s-line"></i>
		</Calendar.PrevButton>
		<Calendar.Heading class="text-[15px] font-medium" />
		<Calendar.NextButton
			class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt hover:bg-muted active:scale-98 active:transition-all"
		>
			<i class="ri-arrow-right-s-line"></i>
		</Calendar.NextButton>
	</Calendar.Header>
	<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
		{#each months as month, i (i)}
			<Calendar.Grid class="w-full border-collapse select-none space-y-1">
				<Calendar.GridHead>
					<Calendar.GridRow class="mb-1 flex w-full justify-between">
						{#each weekdays as day}
							<Calendar.HeadCell class="w-10 rounded-md text-xs !font-normal text-muted-foreground">
								<div>{day.slice(0, 2)}</div>
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as weekDates}
						<Calendar.GridRow class="flex w-full">
							{#each weekDates as date}
								<Calendar.Cell {date} class="relative size-10 !p-0 text-center text-sm">
									<Calendar.Day
										{date}
										month={month.value}
										class="group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent p-0 text-sm font-normal text-foreground hover:border-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-foreground data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
									>
										<div
											class="absolute top-[5px] hidden size-1 rounded-full bg-foreground group-data-[today]:block group-data-[selected]:bg-background"
										></div>
										{date.day}
									</Calendar.Day>
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	</div>
</Calendar.Root>
