<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let character;
</script>

<div
  class={`border border-black shadow-xl border-opacity-20 relative flex flex-col h-full justify-end`}
>
  <div
    class={`absolute bottom-0 z-10 text-center flex gap-1 sm:p-4 flex-col w-full h-2/3 justify-end items-center p-3 ${character.colors ? character.colors.secondary : ""}`}
  >
    <h2 class="text-white text-[.35rem] sm:text-[.5rem] lg:text-2xs">
      {character.bannerName}
    </h2>
    <h1 class="text-white text-[.6rem] sm:text-sm lg:text-base">
      {character.name}
    </h1>
  </div>
  <div class="relative w-full h-full">
    <Image
      class="absolute inset-0 w-full h-full"
      height={2100}
      width={1200}
      alt={`${character.element} Art`}
      src={`./images/backgrounds/${character.element}.png`}
    />
    <Image
      class={`relative w-full h-full ${character.spec ? "border-2 lg:border-4 [border-image:url(/images/textures/holo-4.jpg)_10_round]" : ""}`}
      src={character.images.gachaCard}
      alt={`${character.name} Art`}
      height={2100}
      width={1200}
    />
  </div>
</div>
