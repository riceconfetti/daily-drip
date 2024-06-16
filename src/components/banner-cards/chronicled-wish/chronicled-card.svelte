<script lang="ts">
  import CharacterCard from "./character-card.svelte";
  import WeaponCard from "./weapon-card.svelte";
  export let chronicle, images, game;
  //   chronicle = {
  //     characters: [],
  //     weapons: [],
  //   };
</script>

<section>
  <div>
    {#each chronicle.characters as character}
      <CharacterCard {character} {images} {game} />
    {/each}
  </div>

  <div>
    {#each chronicle.weapons as weapon}
      <WeaponCard {weapon} {images} {game}/>
    {/each}
  </div>
</section>
