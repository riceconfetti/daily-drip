<script lang="ts">
  import FiveStarCard from "./five-star-card.svelte";
  import FourStarCard from "./four-star-card.svelte";
  export let weapons, images, game;
</script>

<!-- Weapons -->

<section class="flex flex-col w-full">
  <h2 class="text-dark text-2xs sm:text-sm">Rate Up Weapons</h2>
  <div
    class={`grid grid-cols-[1fr_1fr_45%] gap-2 ${game == "wuwa" ? "grid-cols-[1fr_65%]" : "grid-cols-[1fr_1fr_45%]"}`}
  >
    {#each weapons.fiveStars as weapon}
      <FiveStarCard {weapon} {images} {game} />
    {/each}
    <div class="flex justify-between w-full h-full gap-1">
      {#each weapons.fourStars as weapon}
        <FourStarCard {weapon} {images} {game} />
      {/each}
    </div>
  </div>
</section>
