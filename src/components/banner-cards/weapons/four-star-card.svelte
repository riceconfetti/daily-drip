<script lang="ts">
  import { Image } from "@unpic/svelte";
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
          `../assets/placeholders/${game}/fourStar_${weapon.game == "starrail" ? "default" : weapon.weaponType}.png`
        ];
  //console.log(weaponImage);
</script>

<div
  class="flex relative h-min aspect-square justify-between bg-gradient-to-b text-white from-[#37263D] to-[#9367A3] gap-2 rounded-sm items-center px-2"
>
  <Image src={weaponImage.default.src} height={256} width={256} />
</div>
