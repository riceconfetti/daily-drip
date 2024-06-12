<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let character, game;

  const fonts = {
    genshin: "hy-impact-regular",
    starrail: "bai-jamjuree-bold",
    reverse: "playfair-display-sc-bold",
    wuwa: "philosopher-bold",
  };
</script>

<div
  class="flex relative h-full w-full items-center bg-gradient-to-r from-genshin-hydro-bg to-genshin-anemo-bg"
>
  <Image
    class="gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%] right-0 h-full"
    src={character.images.bannerCard}
    height={1200}
    width={4600}
  ></Image>
  <div class="absolute flex items-center w-full h-full p-4">
    <h1 class={`text-white text-[.6rem] ${fonts[game]}`}>{character.name}</h1>
  </div>
</div>
