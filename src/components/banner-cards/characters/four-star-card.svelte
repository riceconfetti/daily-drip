<script lang="ts">
  import { Image } from "@unpic/svelte";
  import colors from "$assets/gradients.json";
  export let character, images, game;

  const bannerCard =
    images.bannerCards[`../assets/characters/${character.id}/bannerCard.png`] !=
    undefined
      ? images.bannerCards[
          `../assets/characters/${character.id}/bannerCard.png`
        ]
      : images.placeHolders[`../assets/placeholders/${game}/bannerCard.png`];

  if (bannerCard == undefined) {
    console.log(character);
  }
</script>

<div
  class={`flex relative w-full shadow-lg border-0 border-black border-opacity-20 items-center ${colors[game][character.element]}`}
>
  <Image
    class={`gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%] right-0 h-full ${character.spec ? "border-4 [border-image:url(/images/textures/holo-4.jpg)_10_round]" : ""}`}
    src={bannerCard.default.src}
    alt={`${character.name} Art`}
    layout="constrained"
    height={300}
    width={1150}
  ></Image>
  <div class="absolute flex items-center w-full h-full p-2 md:p-4">
    <h1
      class={`text-white text-[.6rem] sm:text-xs md:text-base lg:text-sm xl:text-base`}
    >
      {character.name}
    </h1>
  </div>
</div>
