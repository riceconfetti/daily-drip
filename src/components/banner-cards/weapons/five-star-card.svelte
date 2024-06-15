<script lang="ts">
  export let weapon, images, game;
  const weaponImage =
    images.weapons[
      `../assets/weapons/${weapon.name.replace(
        /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
        ""
      )}.webp`
    ] != undefined
      ? images.weapons[
          `../assets/weapons/${weapon.name.replace(
            /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
            ""
          )}.webp`
        ]
      : images.placeHolders[
          `../assets/placeholders/${game}/fiveStar_${weapon.game == "starrail" ? "default" : weapon.weaponType}.png`
        ];
</script>

<div
  class="flex relative h-auto justify-between w-full bg-gradient-to-r text-white from-[#272317] to-[#8D7D52] gap-2 rounded-sm items-center"
>
  <div class="h-min p-2 pr-4">
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
