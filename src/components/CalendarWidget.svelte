<script lang="ts">
  import { Calendar } from "bits-ui";
  import { parseDate, CalendarDate } from "@internationalized/date";
  import { Event } from "../classes/event";
  export let events: Event[];

  const genshin = events
    .filter((e) => {
      return e.game.id === "genshin";
    })
    .map((e) => e.startDate);

  const starrail = events
    .filter((e) => {
      return e.game.id === "starrail";
    })
    .map((e) => parseDate(e.startDate));

  const reverse = events
    .filter((e) => {
      return e.game.id === "reverse";
    })
    .map((e) => parseDate(e.startDate));

  const wuwa = events
    .filter((e) => {
      return e.game.id === "wuwa";
    })
    .map((e) => parseDate(e.startDate));

    function isDate(game, date) {
      if(game.find((e)=> e === date.toString()) != undefined) {
        return true;
      } else {
        return false
      }
    }
</script>

<Calendar.Root
  let:months
  class="w-full flex flex-col text-center"
  fixedWeeks={true}
>
  <Calendar.Header
    class="playfair-display-sc-bold flex justify-between items-center gap-2"
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
    <Calendar.Grid>
      <Calendar.GridBody>
        {#each month.weeks as weekDates}
          <Calendar.GridRow>
            {#each weekDates as date}
              <Calendar.Cell {date}>
                <Calendar.Day
                  {date}
                  month={month.value}
                  class={`crimson-text-regular p-2 group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent text-sm font-normal text-foreground hover:border-foreground ${isDate(genshin, date) ? "bg-genshin-anemo-bg rounded-md" : ""} `}
                >
                  <div
                    class="absolute top-[5px] hidden size-1 rounded-full bg-foreground group-data-[today]:block group-data-[selected]:bg-background"
                  />
                  {date.day}
                </Calendar.Day>
              </Calendar.Cell>
            {/each}
          </Calendar.GridRow>
        {/each}
      </Calendar.GridBody>
    </Calendar.Grid>
  {/each}
</Calendar.Root>