<script lang="ts">
  import FiveStarCard from "./five-star-card.svelte";
  import FourStarCard from "./four-star-card.svelte";
  export let weapons;
</script>

<!-- Weapons -->

<section class="flex flex-col w-full">
  <h2 class="text-dark text-2xs">Rate Up Weapons</h2>
  <div class="grid grid-cols-[1fr_1fr_45%] gap-2">
    {#each weapons.fiveStars as weapon}
      <FiveStarCard {weapon} />
    {/each}
    <div class="flex justify-between w-full h-full gap-1">
      {#each weapons.fourStars as weapon}
        <FourStarCard {weapon} />
      {/each}
    </div>
  </div>
</section>
