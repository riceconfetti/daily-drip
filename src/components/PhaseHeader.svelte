<script lang="ts">
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(utc);
  dayjs.extend(timezone);

  let { game = "genshin", startDate, phase } = $props();

  import { getServer } from "$store/settings.svelte";
  const server = $derived(getServer(game));
  let currzone = dayjs.tz.guess();
  const tz = $derived(phase.phase == "1" ? "+08:00" : server?.value?.timezone);
</script>

<div
  class={`tracking-normal h-min font-semibold font-subheading flex w-full justify-between border border-black/10 p-2 text-xs sm:text-sm ${phase.phase == "1" ? "bg-[#BFBFBF] text-text-light" : "bg-dark text-accent-gold"}`}
>
  <h1>Phase {phase.phase}</h1>
  <p class="font-light italic">
    {dayjs(startDate + "T" + phase.start + tz)
      .tz(currzone)
      .format("MMM D") +
      " @" +
      dayjs(startDate + "T" + phase.start + tz)
        .tz(currzone)
        .format("h a")}
  </p>
</div>
