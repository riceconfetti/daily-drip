<script lang="ts">
  import dayjs from "dayjs";
  import EventSingle from "./event-single.svelte";
  export let events;

  $: currentEvents = events.filter((e) => {
    return dayjs(e.startDate) < dayjs() && dayjs(e.endDate) > dayjs();
  });

  $: upcomingEvents = events.filter((e) => {
    return (
      dayjs(e.startDate) > dayjs() && dayjs(e.startDate) < dayjs().add(4, "w")
    );
  });
</script>

<section class="flex flex-col gap-2 w-full">
  <h2 class="playfair-display-semibold text-dark">Current Events</h2>
  {#each currentEvents as eventDetails}
    <EventSingle {eventDetails} />
  {/each}
  <h2 class="playfair-display-semibold text-dark">Upcoming Events</h2>
  {#each upcomingEvents as eventDetails}
    <EventSingle {eventDetails} />
  {/each}
</section>
