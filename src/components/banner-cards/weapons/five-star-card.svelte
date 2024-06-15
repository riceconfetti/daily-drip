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
  class="flex relative h-full justify-between w-full bg-gradient-to-r text-white from-[#272317] to-[#8D7D52] gap-2 pl-2 rounded-sm items-center"
>
  <h1 class="text-[.25rem] text-balance sm:text-[.5rem] md:text-2xs">
    {weapon.name}
  </h1>
  <img
    class="h-0 aspect-square min-h-full"
    src={weaponImage.default.src}
    alt={`${weapon.name} Icon`}
  />
</div>
