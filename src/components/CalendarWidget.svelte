<script lang="ts">
  import { Calendar } from "bits-ui";

  const isDateUnavailable: Calendar.Props["isDateUnavailable"] = (date) => {
    return date.day === 17 || date.day === 18;
  };
</script>

<Calendar.Root
  let:months
  class="w-full flex flex-col text-center"
  {isDateUnavailable}
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
                  class="crimson-text-regular p-2 group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent text-sm font-normal text-foreground hover:border-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-foreground data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
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
