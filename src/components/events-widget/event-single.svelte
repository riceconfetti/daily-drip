<script lang="ts">
	import { Image } from '@unpic/svelte'
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime.js'
	dayjs.extend(relativeTime)
	export let eventDetails, images

	const eventType = dayjs(eventDetails.startDate) > dayjs() ? 'Starting' : 'Ending'
	$: timeUntil =
		dayjs(eventDetails.startDate) > dayjs()
			? dayjs().to(dayjs(eventDetails.startDate))
			: dayjs().to(dayjs(eventDetails.endDate))

	const bannerPath = `../assets/characters/${eventDetails.game}/${eventDetails.image}.webp`
	const bannerImage =
		images[eventDetails.game].bannerCards[bannerPath] != undefined
			? images[eventDetails.game].bannerCards[bannerPath]
			: images[eventDetails.game].placeHolders[
					`../assets/placeholders/${eventDetails.game}/bannerCard.webp`
				]
	//console.log(bannerImage);
</script>

<div
	class={`relative flex w-full flex-col gap-2 overflow-hidden rounded-md ${eventDetails.colors.primary}`}
>
	<div class="absolute inset-0 z-10 flex h-full w-full flex-col justify-center p-4">
		<h2 class={`z-10 text-sm text-white ${eventDetails.game}`}>{eventDetails.title}</h2>
		<h3 class={`${eventDetails.colors.textAccent} z-10 text-xs ${eventDetails.game}`}>
			{eventType}
			{timeUntil}
		</h3>
	</div>

	<Image
		src={bannerImage.default.src}
		height={300}
		width={1150}
		class="h-full gradient-mask-l-[transparent,rgba(0,0,0,1.0)_0px,rgba(0,0,0,0.8)_30%]"
		alt={`${eventDetails.title} Banner Card`}
	/>
</div>
