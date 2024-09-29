<script>
	import { settings } from '$scripts/settings'

	$: settings_temp = JSON.parse(JSON.stringify(settings.get()))

	function handleSubmit() {
		settings.setKey('genshin', settings_temp.genshin)
		settings.setKey('starrail', settings_temp.starrail)
		settings.setKey('wuwa', settings_temp.wuwa)
		settings.setKey('zzz', settings_temp.zzz)
	}
</script>

<div
	id="settings"
	class="absolute h-dvh w-dvw bg-dark bg-opacity-20 z-50 backdrop-blur-sm hidden items-center justify-center"
>
	<div class="bg-light rounded p-4 flex flex-col playfair-display-semibold gap-4 w-3/5">
		<h2 class="playfair-display-sc-bold text-2xl">Settings</h2>
		<hr class="border-accent-light" />
		<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
			<ul class="grid grid-cols-2 gap-4">
				<li class="grid grid-cols-subgrid col-span-2">
					<label for="setting_genshin">Genshin Impact</label>
					<select
						bind:value={settings_temp.genshin}
						class="bg-dark bg-opacity-10 border border-accent-light border-opacity-20 text-accent-light px-2 text-sm rounded-sm"
						name="setting_genshin"
						id="setting_genshin"
					>
						<option value="na">America</option>
						<option value="as">Asia</option>
						<option value="eu">Europe</option>
						<option value="sar">TW/HK/MO</option>
					</select>
				</li>
				<li class="grid grid-cols-subgrid col-span-2">
					<label for="setting_starrail">Honkai: Starrail</label>
					<select
						bind:value={settings_temp.starrail}
						class="bg-dark bg-opacity-10 border border-accent-light border-opacity-20 text-accent-light px-2 text-sm rounded-sm"
						name="setting_starrail"
						id="setting_starrail"
					>
						<option value="na">America</option>
						<option value="as">Asia</option>
						<option value="eu">Europe</option>
					</select>
				</li>
				<li class="grid grid-cols-subgrid col-span-2">
					<label for="setting_wuwa">Wuthering Waves</label>
					<select
						bind:value={settings_temp.wuwa}
						class="bg-dark bg-opacity-10 border border-accent-light border-opacity-20 text-accent-light px-2 text-sm rounded-sm"
						name="setting_wuwa"
						id="setting_wuwa"
					>
						<option value="na">America</option>
						<option value="sea">SEA</option>
						<option value="as">Asia</option>
						<option value="eu">Europe</option>
						<option value="hmt">HMT</option>
					</select>
				</li>
				<li class="grid grid-cols-subgrid col-span-2">
					<label for="setting_zzz">Zenless Zone Zero</label>
					<select
						bind:value={settings_temp.zzz}
						class="bg-dark bg-opacity-10 border border-accent-light border-opacity-20 text-accent-light px-2 text-sm rounded-sm"
						name="setting_zzz"
						id="setting_zzz"
					>
						<option value="na">America</option>
						<option value="as">Asia</option>
						<option value="eu">Europe</option>
						<option value="sar">HK/TW/MO</option>
					</select>
				</li>
			</ul>
			<hr class="border-accent-light" />
			<div class="flex gap-2 justify-end items-center">
				<button
					type="submit"
					id="setting_confirm"
					class="rounded bg-accent-light text-light p-1 px-2">Confirm</button
				>
				<button id="setting_close" class="rounded bg-dark text-light p-1 px-2">Close</button>
			</div>
		</form>
	</div>
</div>
