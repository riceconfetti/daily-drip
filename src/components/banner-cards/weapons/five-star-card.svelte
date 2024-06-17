<script lang="ts">
  import { twMerge } from "tailwind-merge";
  let className = "";
  export { className as class };
  export let weapon, images, game;
  const weaponImage =
    images.weapons[`../assets/weapons/${weapon.icon}`] != undefined
      ? images.weapons[`../assets/weapons/${weapon.icon}`]
      : images.placeHolders[
          `../assets/placeholders/${game}/fiveStar_${game != "genshin" ? "default" : weapon.weaponType}.png`
        ];
  //console.log(weaponImage);
  if (weaponImage == undefined) {
    console.log(weaponImage);
  }
</script>

<div
  class={twMerge(
    "flex relative h-auto justify-between w-full bg-gradient-to-r text-white from-[#272317] to-[#8D7D52] gap-2 rounded-sm items-center",
    className,
  )}
>
  <div
    class="h-min p-2 pr-4 sm:max-w-[130px] lg:max-w-[110px] xl:max-w-[130px]"
  >
    <h1
      class="text-[.3rem] text-balance sm:text-2xs md:text-xs lg:text-[.45rem] lg:leading-normal xl:text-[.7rem]"
    >
      {weapon.name}
    </h1>
  </div>

  <img
    class="h-0 absolute right-0 aspect-square min-h-full"
    src={weaponImage.default.src}
    alt={`${weapon.name} Icon`}
  />
</div>
