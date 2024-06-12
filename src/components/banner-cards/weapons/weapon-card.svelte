<script lang="ts">
  import FiveStarCard from "./five-star-card.svelte";
  import FourStarCard from "./four-star-card.svelte";
  export let weapons;
</script>

<!-- Weapons -->
<section class="flex gap-2">
  {#each weapons.fiveStars as weapon}
    <FiveStarCard {weapon} />
  {/each}
  <div class="flex flex-col">
    <h2>Featured Four Stars</h2>
    {#each weapons.fourStars as weapon}
      <FourStarCard {weapon} />
    {/each}
  </div>
</section>
