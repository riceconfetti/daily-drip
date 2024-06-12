<script lang="ts">
  import FiveStarCard from "./five-star-card.svelte";
  import FourStarCard from "./four-star-card.svelte";
  export let characters;
</script>

<!-- Characters -->
<section class="flex gap-2">
  {#each characters.fiveStars as character}
    <FiveStarCard {character} />
  {/each}
  <div class="flex flex-col">
    <h2>Featured Four Stars</h2>
    {#each characters.fourStars as character}
      <FourStarCard {character} />
    {/each}
  </div>
</section>
