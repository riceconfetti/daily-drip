<script lang="ts">
  import { Image } from "@unpic/svelte";
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
  class={`w-full relative flex flex-col gap-2 rounded-md overflow-hidden ${eventDetails.colors.primary} ${fonts[eventDetails.game]}`}
>
  <div
    class="absolute inset-0 z-10 flex flex-col h-full w-full justify-center p-4"
  >
    <h2 class=" text-white text-sm z-10">{eventDetails.title}</h2>
    <h3 class={`${eventDetails.colors.textAccent} text-xs z-10`}>
      {eventType}
      {timeUntil}
    </h3>
  </div>

  <Image
    src={eventDetails.image}
    height={1200}
    width={4600}
    class="h-full gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%]"
    alt={`${eventDetails.title} Banner Card`}
  />
</div>
