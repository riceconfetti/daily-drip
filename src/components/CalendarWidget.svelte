<script lang="ts">
	import { Calendar } from 'bits-ui'
	import dayjs from 'dayjs'
	import { CalendarDate, parseDate } from '@internationalized/date'
	import utc from 'dayjs/plugin/utc'
	dayjs.extend(utc)

	export let genshin, starrail, reverse, wuwa, zzz

	function findGame(game, date) {
		//console.log(date.toString())
		return game.find((e) => e.startsWith(date.toString())) != undefined
	}

	function isDate(date) {
		let game = ''
		if (findGame(genshin, date)) {
			game = 'genshin'
		} else if (findGame(starrail, date)) {
			game = 'starrail'
		} else if (findGame(reverse, date)) {
			game = 'reverse'
		} else if (findGame(wuwa, date)) {
			game = 'wuwa'
		} else if (findGame(zzz, date)) {
			game = 'zzz'
		}
		return game
	}

	// console.log("Genshin");
	// console.log(genshin);

	// console.log("Starrail");
	// console.log(starrail);
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
