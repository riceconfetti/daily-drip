<script lang="ts">
  import { Image } from "@unpic/svelte";
  export let character;

  const colors = {
    hydro:
      "bg-gradient-to-r from-genshin-hydro-gradient-from to-genshin-hydro-gradient-to",
    dendro:
      "bg-gradient-to-r from-genshin-dendro-gradient-from to-genshin-dendro-gradient-to",
    anemo:
      "bg-gradient-to-r from-genshin-anemo-gradient-from to-genshin-anemo-gradient-to",
    geo: "bg-gradient-to-r from-genshin-geo-gradient-from to-genshin-geo-gradient-to",
    electro:
      "bg-gradient-to-r from-genshin-electro-gradient-from to-genshin-electro-gradient-to",
    pyro: "bg-gradient-to-r from-genshin-pyro-gradient-from to-genshin-pyro-gradient-to",
    cryo: "bg-gradient-to-r from-genshin-cryo-gradient-from to-genshin-cryo-gradient-to",

    genshin:
      "bg-gradient-to-r from-genshin-default-gradient-from to-genshin-default-gradient-to",
  };
</script>

<div
  class={`flex relative w-full shadow-lg border-0 border-black border-opacity-20 items-center ${colors[character.element]}`}
>
  <Image
    class="gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%] right-0 h-full"
    src={character.images.bannerCard}
    alt={`${character.name} Art`}
    layout="constrained"
    height={1200}
    width={4600}
  ></Image>
  <div class="absolute flex items-center w-full h-full p-2">
    <h1 class={`text-white text-[.6rem]`}>{character.name}</h1>
  </div>
</div>
