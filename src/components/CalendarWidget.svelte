<script lang="ts">
  import { Calendar } from "bits-ui";
  import { parseDate, CalendarDate } from "@internationalized/date";
  import { Event } from "../classes/event";
  export let genshin, starrail, reverse, wuwa;

  function findGame(game, date) {
    return game.find((e) => e === date.toString()) != undefined;
  }

  function isDate(date) {
    let game = "";
    if (findGame(genshin, date)) {
      game = "genshin";
    } else if (findGame(starrail, date)) {
      game = "starrail";
    } else if (findGame(reverse, date)) {
      game = "reverse";
    } else if (findGame(wuwa, date)) {
      game = "wuwa";
    }
    return game;
  }

  console.log("Genshin");
  console.log(genshin);

  console.log("Starrail");
  console.log(starrail);
</script>

<Calendar.Root
  let:months
  let:weekdays
  class="w-full flex flex-col text-center md:h-full md:grid md:grid-rows-[fit-content(theme(spacing.32))] p-4"
  fixedWeeks={true}
  weekdayFormat="short"
>
  <Calendar.Header
    class="playfair-display-sc-bold flex justify-between items-center gap-2 pb-6"
  >
    <Calendar.PrevButton
      class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt hover:bg-muted active:scale-98 active:transition-all"
    >
      <i class="ri-arrow-left-s-line"></i>
    </Calendar.PrevButton>
    <Calendar.Heading />
    <Calendar.NextButton
      class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt hover:bg-muted active:scale-98 active:transition-all"
    >
      <i class="ri-arrow-right-s-line"></i>
    </Calendar.NextButton>
  </Calendar.Header>

  {#each months as month, i (i)}
    <Calendar.Grid
      class=" md:text-left md:h-full md:w-full md:flex md:flex-col md:gap-4 md:border-collapse"
    >
      <Calendar.GridHead class="hidden md:block h-min">
        <Calendar.GridRow
          class="grid grid-cols-7 justify-items-center text-dark text-opacity-50 playfair-display-sc-bold"
        >
          {#each weekdays as day}
            <Calendar.HeadCell class="text-xs align-center">
              <div>{day.slice(0, 3)}</div>
            </Calendar.HeadCell>
          {/each}
        </Calendar.GridRow>
      </Calendar.GridHead>
      <Calendar.GridBody
        class="md:grid md:grid-rows-6 md:h-full md:border md:border-black md:border-opacity-20 md:divide-y"
      >
        {#each month.weeks as weekDates}
          <Calendar.GridRow
            class="md:grid md:grid-cols-7 md:border-black md:border-opacity-20 md:align-top md:divide-x"
          >
            {#each weekDates as date}
              <Calendar.Cell
                {date}
                class=" md:p-1 md:aspect-square md:px-2 md:h-full md:w-full md:border-black md:border-opacity-20"
              >
                <Calendar.Day
                  {date}
                  month={month.value}
                  data-game={isDate(date)}
                  class="crimson-text-regular p-2 leading-none group relative inline-flex w-10 h-auto aspect-square items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent text-sm font-normal text-foreground hover:border-foreground rounded-md data-[game='genshin']:bg-genshin-event data-[game='genshin']:text-white data-[game='starrail']:bg-starrail-event data-[game='starrail']:text-white data-[game='reverse']:bg-reverse-event data-[game='reverse']:text-white data-[game='wuwa']:bg-wuwa-event data-[game='wuwa']:text-white md:w-3 md:h-3 md:text-xs lg:text-sm lg:w-6 lg:h-6 "
                >
                  {date.day}
                </Calendar.Day>
                <p
                  class={`ml-2 hidden w-min ${isDate(date) == "genshin" ? "text-2xs" : "text-sm"} ${isDate(date)} md:inline text-[#535353] lg:${isDate(date) == "genshin" ? "text-xs" : "text-sm"}`}
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
