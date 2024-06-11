<script lang="ts">
  import { Calendar } from "bits-ui";
</script>

<Calendar.Root let:months class="w-full flex flex-col text-center">
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
                  class="crimson-text-regular p-2"
                  month={month.value}
                />
              </Calendar.Cell>
            {/each}
          </Calendar.GridRow>
        {/each}
      </Calendar.GridBody>
    </Calendar.Grid>
  {/each}
</Calendar.Root>
