<script lang="ts">
	import { Calendar } from 'bits-ui'
	import { parseDate, CalendarDate } from '@internationalized/date'
	import { Event } from '../../classes/event'
	export let genshin, starrail, reverse, wuwa

	function findGame(game, date) {
		return game.find((e) => e === date.toString()) != undefined
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
		}
		return game
	}
</script>

<Calendar.Root
	let:months
	class="flex w-full flex-col p-4 text-center md:grid md:h-full md:grid-rows-[fit-content(theme(spacing.32))]"
	fixedWeeks={true}
>
	<Calendar.Header class="playfair-display-sc-bold flex items-center justify-between gap-2 pb-6">
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
		<Calendar.Grid class=" md:grid md:h-full md:w-full md:border-collapse md:text-left">
			<Calendar.GridBody
				class="md:grid md:h-full md:grid-rows-6 md:divide-y md:border md:border-black md:border-opacity-20"
			>
				{#each month.weeks as weekDates}
					<Calendar.GridRow
						class="md:grid md:grid-cols-7 md:divide-x md:border-black md:border-opacity-20 md:align-top"
					>
						{#each weekDates as date}
							<Calendar.Cell
								{date}
								class=" md:h-full md:w-full md:border-black md:border-opacity-20 md:p-1 md:px-2"
							>
								<Calendar.Day
									{date}
									month={month.value}
									data-game={isDate(date)}
									class="crimson-text-regular rounded-9px text-foreground hover:border-foreground group relative inline-flex aspect-square h-auto w-10 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent p-2 text-sm font-normal leading-none data-[game='genshin']:bg-genshin-event data-[game='reverse']:bg-reverse-event data-[game='starrail']:bg-starrail-event data-[game='wuwa']:bg-wuwa-event data-[game='genshin']:text-white data-[game='reverse']:text-white data-[game='starrail']:text-white data-[game='wuwa']:text-white md:h-3 md:w-3 md:text-xs "
								>
									{date.day}
								</Calendar.Day>
								<p class={`ml-2 hidden w-min text-2xs ${isDate(date)} text-[#535353] md:inline`}>
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
