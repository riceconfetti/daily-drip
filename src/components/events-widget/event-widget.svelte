<script lang="ts">
  import dayjs from "dayjs";
  import EventSingle from "./event-single.svelte";
  export let events;

  $: currentEvents = events.filter((e) => {
    return dayjs(e.startDate) < dayjs() && dayjs(e.endDate) > dayjs();
  });

  $: upcomingEvents = events.filter((e) => {
    return (
      dayjs(e.startDate) > dayjs() && dayjs(e.startDate) < dayjs().add(6, "w")
    );
  });
</script>

<section
  class="lg:min-h-0 flex flex-col gap-2 w-full h-full md:flex-row lg:flex-col lg:overflow-auto lg:p-4"
>
  <div class="flex flex-col gap-2 w-full">
    <h2 class="playfair-display-semibold text-dark">Current Events</h2>
    {#each currentEvents as eventDetails}
      <EventSingle {eventDetails} />
    {/each}
  </div>
  <div class="flex flex-col gap-2 w-full">
    <h2 class="playfair-display-semibold text-dark">Upcoming Events</h2>
    {#each upcomingEvents as eventDetails}
      <EventSingle {eventDetails} />
    {/each}
  </div>
</section>
