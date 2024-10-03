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
		return dayjs(date.toString()).format('YYYY-MM-DD') in eventDates
	}
</script>

<Calendar.Root
	class="p-2 w-full h-full min-h-0 flex flex-col"
	let:months
	let:weekdays
	{isDateUnavailable}
	weekdayFormat="short"
	fixedWeeks={false}
	numberOfMonths={1}
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

	<div class="flex flex-col gap-4 h-full min-h-0">
		<Calendar.GridHead class="grid grid-cols-7">
			<Calendar.GridRow
				class="grid grid-cols-subgrid col-span-7 crimson-text-semibold uppercase text-2xs"
			>
				{#each weekdays as day}
					<Calendar.HeadCell class="w-10 rounded-md">
						<div>{day.slice(0, 3)}</div>
					</Calendar.HeadCell>
				{/each}
			</Calendar.GridRow>
		</Calendar.GridHead>

		<Calendar.Grid
			class=" grid grid-cols-7 auto-rows-auto w-full h-full border border-dark min-h-0 border-opacity-20"
		>
			{#each months as month, i (i)}
				<Calendar.GridBody
					class="grid grid-cols-subgrid col-span-7 divide-y divide-dark divide-opacity-20"
				>
					{#each month.weeks as weekDates}
						<Calendar.GridRow
							class="grid grid-cols-subgrid col-span-7 divide-x divide-opacity-20 divide-dark"
						>
							{#each weekDates as date}
								<Calendar.Cell {date} class="relative text-2xs h-full px-2 p-1">
									<Calendar.Day {date} month={month.value} class=" flex justify-end">
										{date.day}
									</Calendar.Day>
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			{/each}
		</Calendar.Grid>
	</div>
</Calendar.Root>
