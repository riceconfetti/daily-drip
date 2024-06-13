<script lang="ts">
  import FiveStarCard from "./five-star-card.svelte";
  import FourStarCard from "./four-star-card.svelte";
  export let characters;
</script>

<!-- Characters -->
<section class="grid grid-cols-[auto_auto_45%] gap-2">
  {#each characters.fiveStars as character}
    <FiveStarCard {character} />
  {/each}
  <div class="flex flex-col justify-between gap-2">
    <h2 class="text-2xs text-right mt-1 text-dark md:text-sm">
      Featured Four Stars
    </h2>
    {#each characters.fourStars as character}
      <FourStarCard {character} />
    {/each}
  </div>
</section>
