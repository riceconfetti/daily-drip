<script lang="ts">
  import { Image } from "@unpic/svelte";

  export let character, images, game;
  //console.log(character.id);

  const gachaCard =
    images.gachaCards[
      `../assets/characters/${game}/${character.images.gachaCard}.png`
    ] != undefined
      ? images.gachaCards[
          `../assets/characters/${game}/${character.images.gachaCard}.png`
        ]
      : images.placeHolders[
          `../assets/placeholders/${game}/${game === "starrail" ? character.weaponType : character.element}.png`
        ];
  // if (gachaCard == undefined) {
  //   console.log(character);
  // }
  // console.log(character.name)
</script>

<div
  class={`border border-black shadow-xl border-opacity-20 relative flex flex-col h-full justify-end`}
>
  <div
    class={`absolute bottom-0 z-10 text-center flex gap-1 p-3 sm:p-4 md:p-6 lg:p-4 xl:p-5 flex-col w-full h-2/3 justify-end items-center ${character.colors ? character.colors.secondary : ""}`}
  >
    <h2
      class="text-white text-[.35rem] sm:text-[.5rem] md:text-xs lg:text-2xs xl:text-xs"
    >
      {character.bannerName}
    </h2>
    <h1
      class="text-white text-[.6rem] sm:text-sm md:text-lg lg:text-base xl:text-lg"
    >
      {character.name}
    </h1>
  </div>
  <div class="relative w-full h-full">
    <Image
      class="absolute inset-0 w-full h-full"
      height={1050}
      width={600}
      alt={`${character.element} Art`}
      src={images.backgrounds[`../assets/backgrounds/${character.element}.png`]
        .default.src}
    />
    <Image
      class={`relative w-full h-full ${character.spec ? "border-2 lg:border-4 [border-image:url(/textures/holo-4.jpg)_10_round]" : ""}`}
      src={gachaCard.default.src}
      alt={`${character.name} Art`}
      height={1050}
      width={600}
    />
  </div>
</div>
