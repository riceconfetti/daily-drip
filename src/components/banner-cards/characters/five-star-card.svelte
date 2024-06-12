<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let character, game, className;
  const fonts = {
    genshin: "hy-impact-regular",
    starrail: "bai-jamjuree-bold",
    reverse: "playfair-display-sc-bold",
    wuwa: "philosopher-bold",
  };
  export { className as class };
</script>

<div
  class={`border border-black shadow-xl border-opacity-20 relative flex flex-col h-full justify-end ${className}`}
>
  <div
    class={`absolute bottom-0 z-10 text-center flex gap-1 flex-col w-full h-1/2 justify-end items-center p-4 ${character.colors.secondary} ${fonts[game]}`}
  >
    <h2 class="text-white text-[.35rem]">{character.bannerName}</h2>
    <h1 class="text-white text-[.6rem]">{character.name}</h1>
  </div>
  <div class="relative w-full h-full">
    <Image
      class="absolute inset-0 w-full h-auto"
      height={2100}
      width={1200}
      src={`./images/backgrounds/${character.element}.png`}
    />
    <Image
      class="relative w-full h-auto"
      src={character.images.gachaCard}
      height={2100}
      width={1200}
    />
  </div>
</div>
