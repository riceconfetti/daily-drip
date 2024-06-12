<script lang="ts">
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime.js";
  dayjs.extend(relativeTime);
  export let eventDetails;

  const eventType =
    dayjs(eventDetails.startDate) > dayjs() ? "Starting" : "Ending";
 $: timeUntil =
    dayjs(eventDetails.startDate) > dayjs()
      ? dayjs().to(dayjs(eventDetails.startDate))
      : dayjs().to(dayjs(eventDetails.endDate));

  const fonts = {
    genshin: "hy-impact-regular",
    starrail: "bai-jamjuree-bold",
    reverse: "playfair-display-sc-bold",
    wuwa: "philosopher-bold",
  };
</script>

<div
  class={`w-full relative p-4 flex flex-col gap-2 rounded-md overflow-hidden ${eventDetails.colors.primary} ${fonts[eventDetails.game.id]}`}
>
  <h2 class="text-white text-sm">{eventDetails.title}</h2>
  <h3 class={`${eventDetails.colors.textAccent} text-xs`}>
    {eventType}
    {timeUntil}
  </h3>
  <slot />
</div>
