<script lang="ts">
	import { Calendar } from 'bits-ui'
	import { CalendarDate, parseDate } from '@internationalized/date'
	import { settings } from '$scripts/settings'
	import dayjs from 'dayjs'
	import utc from 'dayjs/plugin/utc'
	import timezone from 'dayjs/plugin/timezone'
	dayjs.extend(utc)
	dayjs.extend(timezone)

	export let events, versions, games

	function findGame(game, date) {
		// console.log(dayjs(date))
		return game.find((e) => e.isSame(dayjs(date), 'day'))
	}

	let eventDates = {
		genshin: events.filter(({ id }) => id.startsWith('genshin/')),
		starrail: events.filter(({ id }) => id.startsWith('starrail/')),
		wuwa: events.filter(({ id }) => id.startsWith('wuwa/')),
		zzz: events.filter(({ id }) => id.startsWith('zzz/'))
	}
	// console.log(eventDates)

	const genshin = [
		...new Set(
			eventDates.genshin.map((e) => {
				let version = versions.find((v) => v.id.startsWith('genshin/' + e.id.split('/')[1])).data
				let game = games.find((g) => g.id.startsWith('genshin')).data

				if (e.data.startDate == version.startDate) {
					return dayjs.utc(e.data.startDate + `T${game.times.version}Z`).tz(dayjs.tz.guess())
				} else {
					return dayjs
						.utc(
							e.data.startDate +
								`T${game.times.update.find((t) => t.zone == settings.get().genshin).time}Z`
						)
						.tz(dayjs.tz.guess())
				}
			})
		)
	]

	// console.data.log(genshin)

	const starrail = [
		...new Set(
			eventDates.starrail.map((e) => {
				let version = versions.find((v) => v.id.startsWith('starrail/' + e.id.split('/')[1])).data
				let game = games.find((g) => g.id.startsWith('starrail')).data

				if (e.data.startDate == version.startDate) {
					return dayjs.utc(e.data.startDate + `T${game.times.version}Z`).tz(dayjs.tz.guess())
				} else {
					return dayjs
						.utc(
							e.data.startDate +
								`T${game.times.update.find((t) => t.zone == settings.get().starrail).time}Z`
						)
						.tz(dayjs.tz.guess())
				}
			})
		)
	]

	const wuwa = [
		...new Set(
			eventDates.wuwa.map((e) => {
				let version = versions.find((v) => v.id.startsWith('wuwa/' + e.id.split('/')[1])).data
				let game = games.find((g) => g.id.startsWith('wuwa')).data

				if (e.data.startDate == version.startDate) {
					return dayjs.utc(e.data.startDate + `T${game.times.version}Z`).tz(dayjs.tz.guess())
				} else {
					return dayjs
						.utc(
							e.data.startDate +
								`T${game.times.update.find((t) => t.zone == settings.get().wuwa).time}Z`
						)
						.tz(dayjs.tz.guess())
				}
			})
		)
	]

	const zzz = [
		...new Set(
			eventDates.zzz.map((e) => {
				let version = versions.find((v) => v.id.startsWith('zzz/' + e.id.split('/')[1])).data
				let game = games.find((g) => g.id.startsWith('zzz')).data

				if (e.data.startDate == version.startDate) {
					return dayjs.utc(e.data.startDate + `T${game.times.version}Z`).tz(dayjs.tz.guess())
				} else {
					return dayjs
						.utc(
							e.data.startDate +
								`T${game.times.update.find((t) => t.zone == settings.get().zzz).time}Z`
						)
						.tz(dayjs.tz.guess())
				}
			})
		)
	]

	function isDate(date) {
		let game = ''
		if (findGame(genshin, date)) {
			game = 'genshin'
		} else if (findGame(starrail, date)) {
			game = 'starrail'
		} else if (findGame(wuwa, date)) {
			game = 'wuwa'
		} else if (findGame(zzz, date)) {
			game = 'zzz'
		}
		return game
	}
</script>

<Calendar.Root
	let:months
	let:weekdays
	class="flex w-full flex-col p-4 text-center md:grid md:h-full md:grid-rows-[fit-content(theme(spacing.32))] md:min-h-0"
	fixedWeeks={true}
	weekdayFormat="short"
>
	<Calendar.Header class="playfair-display-sc-bold flex items-center justify-between gap-2 p-2">
		<Calendar.PrevButton
			disabled
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
		>
			<i class="ri-arrow-left-s-line"></i>
		</Calendar.PrevButton>
		<Calendar.Heading />
		<Calendar.NextButton
			disabled
			class="rounded-9px bg-background-alt hover:bg-muted active:scale-98 inline-flex size-10 items-center justify-center active:transition-all"
		>
			<i class="ri-arrow-right-s-line"></i>
		</Calendar.NextButton>
	</Calendar.Header>

	{#each months as month, i (i)}
		<Calendar.Grid
			class="md:flex md:h-full md:w-full md:border-collapse md:flex-col md:gap-4 md:text-left lg:min-h-0"
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
								<Calendar.Day
									{date}
									month={month.value}
									data-game={isDate(date)}
									class="crimson-text-regular rounded-9px text-foreground hover:border-foreground data-[selected]:text-background data-[unavailable]:text-muted-foreground group relative inline-flex aspect-square h-auto w-full items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent p-2 text-sm font-normal leading-none data-[outside-month]:pointer-events-none data-[game='genshin']:bg-genshin-event data-[game='zzz']:bg-zzz-event data-[game='starrail']:bg-starrail-event data-[game='wuwa']:bg-wuwa-event data-[game='genshin']:text-white data-[game='zzz']:text-white data-[game='starrail']:text-white data-[game='wuwa']:text-white data-[disabled]:opacity-20 md:min-h-0 md:w-min md:p-[.35rem]"
								>
									{date.day}
								</Calendar.Day>
								<p
									class={`ml-1 hidden w-min ${isDate(date) == 'genshin' ? 'text-2xs' : 'text-xs'} ${isDate(date)} text-[#535353] md:inline xl:${isDate(date) == 'genshin' ? 'text-xs' : 'text-sm'}`}
								>
									{isDate(date).charAt(0).toUpperCase() + isDate(date).slice(1)}
								</p>
							</Calendar.Cell>
						{/each}
					</Calendar.GridRow>
				{/each}
			</Calendar.GridBody>
		</Calendar.Grid>
	{/each}
</Calendar.Root>
