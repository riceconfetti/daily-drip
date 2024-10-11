declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"characters": {
"genshin/albedo": {
	id: "genshin/albedo";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/alhaitham": {
	id: "genshin/alhaitham";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/amber": {
	id: "genshin/amber";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/aratakiitto": {
	id: "genshin/aratakiitto";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/arlecchino": {
	id: "genshin/arlecchino";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/baizhu": {
	id: "genshin/baizhu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/barbara": {
	id: "genshin/barbara";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/beidou": {
	id: "genshin/beidou";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/bennett": {
	id: "genshin/bennett";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/candace": {
	id: "genshin/candace";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/charlotte": {
	id: "genshin/charlotte";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/chasca": {
	id: "genshin/chasca";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/chevreuse": {
	id: "genshin/chevreuse";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/chiori": {
	id: "genshin/chiori";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/chongyun": {
	id: "genshin/chongyun";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/citlali": {
	id: "genshin/citlali";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/clorinde": {
	id: "genshin/clorinde";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/collei": {
	id: "genshin/collei";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/cyno": {
	id: "genshin/cyno";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/dehya": {
	id: "genshin/dehya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/diluc": {
	id: "genshin/diluc";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/diona": {
	id: "genshin/diona";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/dori": {
	id: "genshin/dori";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/emelie": {
	id: "genshin/emelie";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/eula": {
	id: "genshin/eula";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/faruzan": {
	id: "genshin/faruzan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/fischl": {
	id: "genshin/fischl";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/freminet": {
	id: "genshin/freminet";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/furina": {
	id: "genshin/furina";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/gaming": {
	id: "genshin/gaming";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/ganyu": {
	id: "genshin/ganyu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/gorou": {
	id: "genshin/gorou";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/hutao": {
	id: "genshin/hutao";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/jean": {
	id: "genshin/jean";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kachina": {
	id: "genshin/kachina";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kaedeharakazuha": {
	id: "genshin/kaedeharakazuha";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kaeya": {
	id: "genshin/kaeya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kamisatoayaka": {
	id: "genshin/kamisatoayaka";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kamisatoayato": {
	id: "genshin/kamisatoayato";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kaveh": {
	id: "genshin/kaveh";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/keqing": {
	id: "genshin/keqing";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kinich": {
	id: "genshin/kinich";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kirara": {
	id: "genshin/kirara";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/klee": {
	id: "genshin/klee";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kujousara": {
	id: "genshin/kujousara";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/kukishinobu": {
	id: "genshin/kukishinobu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/layla": {
	id: "genshin/layla";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/lisa": {
	id: "genshin/lisa";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/lynette": {
	id: "genshin/lynette";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/lyney": {
	id: "genshin/lyney";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/mavuika": {
	id: "genshin/mavuika";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/mika": {
	id: "genshin/mika";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/mona": {
	id: "genshin/mona";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/mualani": {
	id: "genshin/mualani";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/nahida": {
	id: "genshin/nahida";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/navia": {
	id: "genshin/navia";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/neuvillette": {
	id: "genshin/neuvillette";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/nilou": {
	id: "genshin/nilou";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/ningguang": {
	id: "genshin/ningguang";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/noelle": {
	id: "genshin/noelle";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/ororon": {
	id: "genshin/ororon";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/qiqi": {
	id: "genshin/qiqi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/raidenshogun": {
	id: "genshin/raidenshogun";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/razor": {
	id: "genshin/razor";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/rosaria": {
	id: "genshin/rosaria";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/sangonomiyakokomi": {
	id: "genshin/sangonomiyakokomi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/sayu": {
	id: "genshin/sayu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/sethos": {
	id: "genshin/sethos";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/shenhe": {
	id: "genshin/shenhe";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/shikanoinheizou": {
	id: "genshin/shikanoinheizou";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/sigewinne": {
	id: "genshin/sigewinne";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/sucrose": {
	id: "genshin/sucrose";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/tartaglia": {
	id: "genshin/tartaglia";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/thoma": {
	id: "genshin/thoma";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/tighnari": {
	id: "genshin/tighnari";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/venti": {
	id: "genshin/venti";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/wanderer": {
	id: "genshin/wanderer";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/wriothesley": {
	id: "genshin/wriothesley";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xiangling": {
	id: "genshin/xiangling";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xianyun": {
	id: "genshin/xianyun";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xiao": {
	id: "genshin/xiao";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xilonen": {
	id: "genshin/xilonen";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xingqiu": {
	id: "genshin/xingqiu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/xinyan": {
	id: "genshin/xinyan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yaemiko": {
	id: "genshin/yaemiko";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yanfei": {
	id: "genshin/yanfei";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yaoyao": {
	id: "genshin/yaoyao";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yelan": {
	id: "genshin/yelan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yoimiya": {
	id: "genshin/yoimiya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/yunjin": {
	id: "genshin/yunjin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"genshin/zhongli": {
	id: "genshin/zhongli";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/37": {
	id: "reverse/37";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/6": {
	id: "reverse/6";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/aknight": {
	id: "reverse/aknight";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/alient": {
	id: "reverse/alient";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/ananlee": {
	id: "reverse/ananlee";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/apple": {
	id: "reverse/apple";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/babyblue": {
	id: "reverse/babyblue";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/balloonparty": {
	id: "reverse/balloonparty";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/bette": {
	id: "reverse/bette";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/bkornblume": {
	id: "reverse/bkornblume";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/blonney": {
	id: "reverse/blonney";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/bunnybunny": {
	id: "reverse/bunnybunny";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/centurion": {
	id: "reverse/centurion";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/charlie": {
	id: "reverse/charlie";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/click": {
	id: "reverse/click";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/cristallo": {
	id: "reverse/cristallo";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/darleyclatter": {
	id: "reverse/darleyclatter";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/desertflannel": {
	id: "reverse/desertflannel";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/diggers": {
	id: "reverse/diggers";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/dikke": {
	id: "reverse/dikke";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/door": {
	id: "reverse/door";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/druvisiii": {
	id: "reverse/druvisiii";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/eagle": {
	id: "reverse/eagle";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/erick": {
	id: "reverse/erick";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/eternity": {
	id: "reverse/eternity";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/ezra": {
	id: "reverse/ezra";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/getian": {
	id: "reverse/getian";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/horropedia": {
	id: "reverse/horropedia";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/isolde": {
	id: "reverse/isolde";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/jessica": {
	id: "reverse/jessica";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/jiuniangzi": {
	id: "reverse/jiuniangzi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/johntitor": {
	id: "reverse/johntitor";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/kaalaabaunaa": {
	id: "reverse/kaalaabaunaa";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/kanjira": {
	id: "reverse/kanjira";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/lasource": {
	id: "reverse/lasource";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/leilani": {
	id: "reverse/leilani";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/lilya": {
	id: "reverse/lilya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/marcus": {
	id: "reverse/marcus";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/matilda": {
	id: "reverse/matilda";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/medicinepocket": {
	id: "reverse/medicinepocket";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/melania": {
	id: "reverse/melania";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/mesmerjr": {
	id: "reverse/mesmerjr";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/mondlicht": {
	id: "reverse/mondlicht";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/msmoissan": {
	id: "reverse/msmoissan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/msnewbabel": {
	id: "reverse/msnewbabel";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/msradio": {
	id: "reverse/msradio";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/necrologist": {
	id: "reverse/necrologist";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/nickbottom": {
	id: "reverse/nickbottom";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/oliverfog": {
	id: "reverse/oliverfog";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/onion": {
	id: "reverse/onion";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/pavia": {
	id: "reverse/pavia";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/pickles": {
	id: "reverse/pickles";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/poltergeist": {
	id: "reverse/poltergeist";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/rabies": {
	id: "reverse/rabies";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/regulus": {
	id: "reverse/regulus";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/satsuki": {
	id: "reverse/satsuki";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/schneider": {
	id: "reverse/schneider";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/shamane": {
	id: "reverse/shamane";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/sonetto": {
	id: "reverse/sonetto";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/sotheby": {
	id: "reverse/sotheby";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/spathodea": {
	id: "reverse/spathodea";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/sputnik": {
	id: "reverse/sputnik";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/sweetheart": {
	id: "reverse/sweetheart";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/tennant": {
	id: "reverse/tennant";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/thefool": {
	id: "reverse/thefool";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/toothfairy": {
	id: "reverse/toothfairy";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/ttt": {
	id: "reverse/ttt";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/twinssleep": {
	id: "reverse/twinssleep";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/ulu": {
	id: "reverse/ulu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/voyager": {
	id: "reverse/voyager";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/windsong": {
	id: "reverse/windsong";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/x": {
	id: "reverse/x";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/yenisei": {
	id: "reverse/yenisei";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"reverse/zimma": {
	id: "reverse/zimma";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/acheron": {
	id: "starrail/acheron";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/argenti": {
	id: "starrail/argenti";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/arlan": {
	id: "starrail/arlan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/asta": {
	id: "starrail/asta";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/aventurine": {
	id: "starrail/aventurine";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/bailu": {
	id: "starrail/bailu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/blackswan": {
	id: "starrail/blackswan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/blade": {
	id: "starrail/blade";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/boothill": {
	id: "starrail/boothill";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/bronya": {
	id: "starrail/bronya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/clara": {
	id: "starrail/clara";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/danheng": {
	id: "starrail/danheng";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/drratio": {
	id: "starrail/drratio";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/feixiao": {
	id: "starrail/feixiao";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/firefly": {
	id: "starrail/firefly";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/fugue": {
	id: "starrail/fugue";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/fuxuan": {
	id: "starrail/fuxuan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/gallagher": {
	id: "starrail/gallagher";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/gepard": {
	id: "starrail/gepard";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/guinaifen": {
	id: "starrail/guinaifen";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/hanya": {
	id: "starrail/hanya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/herta": {
	id: "starrail/herta";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/himeko": {
	id: "starrail/himeko";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/hook": {
	id: "starrail/hook";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/huohuo": {
	id: "starrail/huohuo";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/jade": {
	id: "starrail/jade";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/jiaoqiu": {
	id: "starrail/jiaoqiu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/jingliu": {
	id: "starrail/jingliu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/jingyuan": {
	id: "starrail/jingyuan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/kafka": {
	id: "starrail/kafka";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/lingsha": {
	id: "starrail/lingsha";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/luka": {
	id: "starrail/luka";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/luocha": {
	id: "starrail/luocha";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/lynx": {
	id: "starrail/lynx";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/march7th": {
	id: "starrail/march7th";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/misha": {
	id: "starrail/misha";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/moze": {
	id: "starrail/moze";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/natasha": {
	id: "starrail/natasha";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/pela": {
	id: "starrail/pela";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/qingque": {
	id: "starrail/qingque";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/rappa": {
	id: "starrail/rappa";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/reca": {
	id: "starrail/reca";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/robin": {
	id: "starrail/robin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/ruanmei": {
	id: "starrail/ruanmei";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/sampo": {
	id: "starrail/sampo";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/screwllum": {
	id: "starrail/screwllum";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/seele": {
	id: "starrail/seele";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/serval": {
	id: "starrail/serval";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/silverwolf": {
	id: "starrail/silverwolf";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/sparkle": {
	id: "starrail/sparkle";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/sunday": {
	id: "starrail/sunday";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/sushang": {
	id: "starrail/sushang";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/tingyun": {
	id: "starrail/tingyun";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/topaz": {
	id: "starrail/topaz";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/welt": {
	id: "starrail/welt";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/xueyi": {
	id: "starrail/xueyi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/yanqing": {
	id: "starrail/yanqing";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/yinyuejun": {
	id: "starrail/yinyuejun";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/yukong": {
	id: "starrail/yukong";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"starrail/yunli": {
	id: "starrail/yunli";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/aalto": {
	id: "wuwa/aalto";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/baizhi": {
	id: "wuwa/baizhi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/calcharo": {
	id: "wuwa/calcharo";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/camellya": {
	id: "wuwa/camellya";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/changli": {
	id: "wuwa/changli";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/chixia": {
	id: "wuwa/chixia";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/danjin": {
	id: "wuwa/danjin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/encore": {
	id: "wuwa/encore";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/geshulin": {
	id: "wuwa/geshulin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/jianxin": {
	id: "wuwa/jianxin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/jinhsi": {
	id: "wuwa/jinhsi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/jiyan": {
	id: "wuwa/jiyan";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/lingyang": {
	id: "wuwa/lingyang";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/mortefi": {
	id: "wuwa/mortefi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/sanhua": {
	id: "wuwa/sanhua";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/scar": {
	id: "wuwa/scar";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/shorekeeper": {
	id: "wuwa/shorekeeper";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/taoqi": {
	id: "wuwa/taoqi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/verina": {
	id: "wuwa/verina";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/xiangliyao": {
	id: "wuwa/xiangliyao";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/yangyang": {
	id: "wuwa/yangyang";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/yinlin": {
	id: "wuwa/yinlin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/youhu": {
	id: "wuwa/youhu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/yuanwu": {
	id: "wuwa/yuanwu";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"wuwa/zhezhi": {
	id: "wuwa/zhezhi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/anby": {
	id: "zzz/anby";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/anton": {
	id: "zzz/anton";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/ben": {
	id: "zzz/ben";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/billy": {
	id: "zzz/billy";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/burnice": {
	id: "zzz/burnice";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/caesar": {
	id: "zzz/caesar";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/corin": {
	id: "zzz/corin";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/lighter": {
	id: "zzz/lighter";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/lucy": {
	id: "zzz/lucy";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/nicole": {
	id: "zzz/nicole";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/piper": {
	id: "zzz/piper";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/seth": {
	id: "zzz/seth";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/soukaku": {
	id: "zzz/soukaku";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
"zzz/yanagi": {
	id: "zzz/yanagi";
  collection: "characters";
  data: InferEntrySchema<"characters">
};
};
"events": {
"genshin/4.7/characters/five/alhaitham": {
	id: "genshin/4.7/characters/five/alhaitham";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/five/clorinde": {
	id: "genshin/4.7/characters/five/clorinde";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/five/furina": {
	id: "genshin/4.7/characters/five/furina";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/five/sigewinne": {
	id: "genshin/4.7/characters/five/sigewinne";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/bennett": {
	id: "genshin/4.7/characters/four/bennett";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/gaming": {
	id: "genshin/4.7/characters/four/gaming";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/noelle": {
	id: "genshin/4.7/characters/four/noelle";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/rosaria": {
	id: "genshin/4.7/characters/four/rosaria";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/sethos": {
	id: "genshin/4.7/characters/four/sethos";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.7/characters/four/thoma": {
	id: "genshin/4.7/characters/four/thoma";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/five/emelie": {
	id: "genshin/4.8/characters/five/emelie";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/five/navia": {
	id: "genshin/4.8/characters/five/navia";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/five/nilou": {
	id: "genshin/4.8/characters/five/nilou";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/five/yelan": {
	id: "genshin/4.8/characters/five/yelan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/kaveh": {
	id: "genshin/4.8/characters/four/kaveh";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/kirara": {
	id: "genshin/4.8/characters/four/kirara";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/ningguang": {
	id: "genshin/4.8/characters/four/ningguang";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/razor": {
	id: "genshin/4.8/characters/four/razor";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/xiangling": {
	id: "genshin/4.8/characters/four/xiangling";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/characters/four/yanfei": {
	id: "genshin/4.8/characters/four/yanfei";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/dragonsbane": {
	id: "genshin/4.8/weapons/dragonsbane";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/eyeofperception": {
	id: "genshin/4.8/weapons/eyeofperception";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/favoniuslance": {
	id: "genshin/4.8/weapons/favoniuslance";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/favoniuswarbow": {
	id: "genshin/4.8/weapons/favoniuswarbow";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/makhairaaquamarine": {
	id: "genshin/4.8/weapons/makhairaaquamarine";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/rust": {
	id: "genshin/4.8/weapons/rust";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/thebell": {
	id: "genshin/4.8/weapons/thebell";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/theflute": {
	id: "genshin/4.8/weapons/theflute";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/waderingevenstar": {
	id: "genshin/4.8/weapons/waderingevenstar";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/4.8/weapons/xiphosmoolight": {
	id: "genshin/4.8/weapons/xiphosmoolight";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/five/kazuha": {
	id: "genshin/5.0/characters/five/kazuha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/five/kinich": {
	id: "genshin/5.0/characters/five/kinich";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/five/mualani": {
	id: "genshin/5.0/characters/five/mualani";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/five/raiden": {
	id: "genshin/5.0/characters/five/raiden";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/bennett": {
	id: "genshin/5.0/characters/four/bennett";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/chevreuse": {
	id: "genshin/5.0/characters/four/chevreuse";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/kachina": {
	id: "genshin/5.0/characters/four/kachina";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/kujousara": {
	id: "genshin/5.0/characters/four/kujousara";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/thoma": {
	id: "genshin/5.0/characters/four/thoma";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/characters/four/xinyan": {
	id: "genshin/5.0/characters/four/xinyan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/dragonsbane": {
	id: "genshin/5.0/weapons/dragonsbane";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/favoniusgreatsword": {
	id: "genshin/5.0/weapons/favoniusgreatsword";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/favoniuslance": {
	id: "genshin/5.0/weapons/favoniuslance";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/favoniussword": {
	id: "genshin/5.0/weapons/favoniussword";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/rainslasher": {
	id: "genshin/5.0/weapons/rainslasher";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/sacrificialbow": {
	id: "genshin/5.0/weapons/sacrificialbow";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/sacrificialfragments": {
	id: "genshin/5.0/weapons/sacrificialfragments";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/sacrificialsword": {
	id: "genshin/5.0/weapons/sacrificialsword";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/thestringless": {
	id: "genshin/5.0/weapons/thestringless";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.0/weapons/thewidsith": {
	id: "genshin/5.0/weapons/thewidsith";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/five/chiori": {
	id: "genshin/5.1/characters/five/chiori";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/five/hutao": {
	id: "genshin/5.1/characters/five/hutao";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/five/nahida": {
	id: "genshin/5.1/characters/five/nahida";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/five/xilonen": {
	id: "genshin/5.1/characters/five/xilonen";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/four/candace": {
	id: "genshin/5.1/characters/four/candace";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/four/collei": {
	id: "genshin/5.1/characters/four/collei";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/four/dori": {
	id: "genshin/5.1/characters/four/dori";
  collection: "events";
  data: InferEntrySchema<"events">
};
"genshin/5.1/characters/four/kukishinobu": {
	id: "genshin/5.1/characters/four/kukishinobu";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.2/boothill": {
	id: "starrail/2.2/boothill";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.2/fuxuan": {
	id: "starrail/2.2/fuxuan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.2/robin": {
	id: "starrail/2.2/robin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.2/topaz": {
	id: "starrail/2.2/topaz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/argenti": {
	id: "starrail/2.3/argenti";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/asta": {
	id: "starrail/2.3/asta";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/firefly": {
	id: "starrail/2.3/firefly";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/gallagher": {
	id: "starrail/2.3/gallagher";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/jade": {
	id: "starrail/2.3/jade";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/misha": {
	id: "starrail/2.3/misha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/natasha": {
	id: "starrail/2.3/natasha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/ruanmei": {
	id: "starrail/2.3/ruanmei";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/serval": {
	id: "starrail/2.3/serval";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.3/xueyi": {
	id: "starrail/2.3/xueyi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/five/huohuo": {
	id: "starrail/2.4/characters/five/huohuo";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/five/jiaoqiu": {
	id: "starrail/2.4/characters/five/jiaoqiu";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/five/sparkle": {
	id: "starrail/2.4/characters/five/sparkle";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/five/yunli": {
	id: "starrail/2.4/characters/five/yunli";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/arlan": {
	id: "starrail/2.4/characters/four/arlan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/guinaifen": {
	id: "starrail/2.4/characters/four/guinaifen";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/hanya": {
	id: "starrail/2.4/characters/four/hanya";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/hook": {
	id: "starrail/2.4/characters/four/hook";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/lynx": {
	id: "starrail/2.4/characters/four/lynx";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/characters/four/yukong": {
	id: "starrail/2.4/characters/four/yukong";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/eyesofprey": {
	id: "starrail/2.4/weapons/eyesofprey";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/perfecttiming": {
	id: "starrail/2.4/weapons/perfecttiming";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/poisedtobloom": {
	id: "starrail/2.4/weapons/poisedtobloom";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/secretvow": {
	id: "starrail/2.4/weapons/secretvow";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/thebirthoftheself": {
	id: "starrail/2.4/weapons/thebirthoftheself";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.4/weapons/themoleswelcomeyou": {
	id: "starrail/2.4/weapons/themoleswelcomeyou";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/blackswan": {
	id: "starrail/2.5/characters/five/blackswan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/feixiao": {
	id: "starrail/2.5/characters/five/feixiao";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/kafka": {
	id: "starrail/2.5/characters/five/kafka";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/lingsha": {
	id: "starrail/2.5/characters/five/lingsha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/robin": {
	id: "starrail/2.5/characters/five/robin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/five/topaz": {
	id: "starrail/2.5/characters/five/topaz";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/asta": {
	id: "starrail/2.5/characters/four/asta";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/guinaifen": {
	id: "starrail/2.5/characters/four/guinaifen";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/luka": {
	id: "starrail/2.5/characters/four/luka";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/misha": {
	id: "starrail/2.5/characters/four/misha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/moze": {
	id: "starrail/2.5/characters/four/moze";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/characters/four/natasha": {
	id: "starrail/2.5/characters/four/natasha";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/PlanetaryRendezvous": {
	id: "starrail/2.5/weapons/PlanetaryRendezvous";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/ResolutionShinesAsPearlsofSweat": {
	id: "starrail/2.5/weapons/ResolutionShinesAsPearlsofSweat";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/ShadowedbyNight": {
	id: "starrail/2.5/weapons/ShadowedbyNight";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/SharedFeeling": {
	id: "starrail/2.5/weapons/SharedFeeling";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/Swordplay": {
	id: "starrail/2.5/weapons/Swordplay";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.5/weapons/TheBirthoftheSelf": {
	id: "starrail/2.5/weapons/TheBirthoftheSelf";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.6/characters/five/acheron": {
	id: "starrail/2.6/characters/five/acheron";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.6/characters/five/aventurine": {
	id: "starrail/2.6/characters/five/aventurine";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.6/characters/five/rappa": {
	id: "starrail/2.6/characters/five/rappa";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.6/characters/five/yinyuejun": {
	id: "starrail/2.6/characters/five/yinyuejun";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.6/weapons/DreamsMontage": {
	id: "starrail/2.6/weapons/DreamsMontage";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.7/characters/five/fugue": {
	id: "starrail/2.7/characters/five/fugue";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.7/characters/five/sunday": {
	id: "starrail/2.7/characters/five/sunday";
  collection: "events";
  data: InferEntrySchema<"events">
};
"starrail/2.7/characters/four/reca": {
	id: "starrail/2.7/characters/four/reca";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/aalto": {
	id: "wuwa/1.0/aalto";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/chixia": {
	id: "wuwa/1.0/chixia";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/danjin": {
	id: "wuwa/1.0/danjin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/jiyan": {
	id: "wuwa/1.0/jiyan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/mortefi": {
	id: "wuwa/1.0/mortefi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/taoqi": {
	id: "wuwa/1.0/taoqi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/yinlin": {
	id: "wuwa/1.0/yinlin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.0/yuanwu": {
	id: "wuwa/1.0/yuanwu";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/baizhi": {
	id: "wuwa/1.1/baizhi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/changli": {
	id: "wuwa/1.1/changli";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/danjin": {
	id: "wuwa/1.1/danjin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/jinhsi": {
	id: "wuwa/1.1/jinhsi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/mortefi": {
	id: "wuwa/1.1/mortefi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/sanhua": {
	id: "wuwa/1.1/sanhua";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/taoqi": {
	id: "wuwa/1.1/taoqi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.1/yangyang": {
	id: "wuwa/1.1/yangyang";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.2/xiangliyao": {
	id: "wuwa/1.2/xiangliyao";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.2/zhezhi": {
	id: "wuwa/1.2/zhezhi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/five/jiyan": {
	id: "wuwa/1.3/characters/five/jiyan";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/five/shorekeeper": {
	id: "wuwa/1.3/characters/five/shorekeeper";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/chixia": {
	id: "wuwa/1.3/characters/four/chixia";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/mortefi": {
	id: "wuwa/1.3/characters/four/mortefi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/sanhua": {
	id: "wuwa/1.3/characters/four/sanhua";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/taoqi": {
	id: "wuwa/1.3/characters/four/taoqi";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/yangyang": {
	id: "wuwa/1.3/characters/four/yangyang";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.3/characters/four/youhu": {
	id: "wuwa/1.3/characters/four/youhu";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.4/characters/five/camellya": {
	id: "wuwa/1.4/characters/five/camellya";
  collection: "events";
  data: InferEntrySchema<"events">
};
"wuwa/1.4/characters/five/yinlin": {
	id: "wuwa/1.4/characters/five/yinlin";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/five/burnice": {
	id: "zzz/1.2/characters/five/burnice";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/five/caesar": {
	id: "zzz/1.2/characters/five/caesar";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/four/anton": {
	id: "zzz/1.2/characters/four/anton";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/four/lucy": {
	id: "zzz/1.2/characters/four/lucy";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/four/nicole": {
	id: "zzz/1.2/characters/four/nicole";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.2/characters/four/piper": {
	id: "zzz/1.2/characters/four/piper";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.3/characters/five/lighter": {
	id: "zzz/1.3/characters/five/lighter";
  collection: "events";
  data: InferEntrySchema<"events">
};
"zzz/1.3/characters/five/yanagi": {
	id: "zzz/1.3/characters/five/yanagi";
  collection: "events";
  data: InferEntrySchema<"events">
};
};
"games": {
"genshin": {
	id: "genshin";
  collection: "games";
  data: InferEntrySchema<"games">
};
"reverse": {
	id: "reverse";
  collection: "games";
  data: InferEntrySchema<"games">
};
"starrail": {
	id: "starrail";
  collection: "games";
  data: InferEntrySchema<"games">
};
"wuwa": {
	id: "wuwa";
  collection: "games";
  data: InferEntrySchema<"games">
};
"zzz": {
	id: "zzz";
  collection: "games";
  data: InferEntrySchema<"games">
};
};
"versions": {
"genshin/4.7": {
	id: "genshin/4.7";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"genshin/4.8": {
	id: "genshin/4.8";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"genshin/5.0": {
	id: "genshin/5.0";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"genshin/5.1": {
	id: "genshin/5.1";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"genshin/5.2": {
	id: "genshin/5.2";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"genshin/5.3": {
	id: "genshin/5.3";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.2": {
	id: "starrail/2.2";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.3": {
	id: "starrail/2.3";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.4": {
	id: "starrail/2.4";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.5": {
	id: "starrail/2.5";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.6": {
	id: "starrail/2.6";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"starrail/2.7": {
	id: "starrail/2.7";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.0": {
	id: "wuwa/1.0";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.1": {
	id: "wuwa/1.1";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.2": {
	id: "wuwa/1.2";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.3": {
	id: "wuwa/1.3";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.4": {
	id: "wuwa/1.4";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"wuwa/1.5": {
	id: "wuwa/1.5";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"zzz/1.2": {
	id: "zzz/1.2";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
"zzz/1.3": {
	id: "zzz/1.3";
  collection: "versions";
  data: InferEntrySchema<"versions">
};
};
"weapons": {
"genshin/AThousandFloatingDreams": {
	id: "genshin/AThousandFloatingDreams";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Absolution": {
	id: "genshin/Absolution";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Akuoumaru": {
	id: "genshin/Akuoumaru";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/AlleyHunter": {
	id: "genshin/AlleyHunter";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/AmenomaKageuchi": {
	id: "genshin/AmenomaKageuchi";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/AmosBow": {
	id: "genshin/AmosBow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/AquaSimulacra": {
	id: "genshin/AquaSimulacra";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/AquilaFavonia": {
	id: "genshin/AquilaFavonia";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BalladoftheBoundlessBlue": {
	id: "genshin/BalladoftheBoundlessBlue";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BalladoftheFjords": {
	id: "genshin/BalladoftheFjords";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BeaconoftheReedSea": {
	id: "genshin/BeaconoftheReedSea";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BlackcliffAgate": {
	id: "genshin/BlackcliffAgate";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BlackcliffLongsword": {
	id: "genshin/BlackcliffLongsword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BlackcliffPole": {
	id: "genshin/BlackcliffPole";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BlackcliffSlasher": {
	id: "genshin/BlackcliffSlasher";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/BlackcliffWarbow": {
	id: "genshin/BlackcliffWarbow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CalamityQueller": {
	id: "genshin/CalamityQueller";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CashflowSupervision": {
	id: "genshin/CashflowSupervision";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CinnabarSpindle": {
	id: "genshin/CinnabarSpindle";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Cloudforged": {
	id: "genshin/Cloudforged";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CompoundBow": {
	id: "genshin/CompoundBow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CranesEchoingCall": {
	id: "genshin/CranesEchoingCall";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CrescentPike": {
	id: "genshin/CrescentPike";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/CrimsonMoonsSemblance": {
	id: "genshin/CrimsonMoonsSemblance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Deathmatch": {
	id: "genshin/Deathmatch";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/DialoguesoftheDesertSages": {
	id: "genshin/DialoguesoftheDesertSages";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/DodocoTales": {
	id: "genshin/DodocoTales";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/DragonsBane": {
	id: "genshin/DragonsBane";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/DragonspineSpear": {
	id: "genshin/DragonspineSpear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ElegyfortheEnd": {
	id: "genshin/ElegyfortheEnd";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/EndoftheLine": {
	id: "genshin/EndoftheLine";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/EngulfingLightning": {
	id: "genshin/EngulfingLightning";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/EverlastingMoonglow": {
	id: "genshin/EverlastingMoonglow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/EyeofPerception": {
	id: "genshin/EyeofPerception";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FadingTwilight": {
	id: "genshin/FadingTwilight";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FangoftheMountainKing": {
	id: "genshin/FangoftheMountainKing";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FavoniusCodex": {
	id: "genshin/FavoniusCodex";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FavoniusGreatsword": {
	id: "genshin/FavoniusGreatsword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FavoniusLance": {
	id: "genshin/FavoniusLance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FavoniusSword": {
	id: "genshin/FavoniusSword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FavoniusWarbow": {
	id: "genshin/FavoniusWarbow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FesteringDesire": {
	id: "genshin/FesteringDesire";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FinaleoftheDeep": {
	id: "genshin/FinaleoftheDeep";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FleuveCendreFerryman": {
	id: "genshin/FleuveCendreFerryman";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FlowingPurity": {
	id: "genshin/FlowingPurity";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ForestRegalia": {
	id: "genshin/ForestRegalia";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FreedomSworn": {
	id: "genshin/FreedomSworn";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Frostbearer": {
	id: "genshin/Frostbearer";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/FruitofFulfillment": {
	id: "genshin/FruitofFulfillment";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/HakushinRing": {
	id: "genshin/HakushinRing";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Hamayumi": {
	id: "genshin/Hamayumi";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/HaranGeppakuFutsu": {
	id: "genshin/HaranGeppakuFutsu";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/HuntersPath": {
	id: "genshin/HuntersPath";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/IbisPiercer": {
	id: "genshin/IbisPiercer";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/IronSting": {
	id: "genshin/IronSting";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/JadefallsSplendor": {
	id: "genshin/JadefallsSplendor";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KagotsurubeIsshin": {
	id: "genshin/KagotsurubeIsshin";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KagurasVerity": {
	id: "genshin/KagurasVerity";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KatsuragikiriNagamasa": {
	id: "genshin/KatsuragikiriNagamasa";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KeyofKhajNisut": {
	id: "genshin/KeyofKhajNisut";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KingsSquire": {
	id: "genshin/KingsSquire";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/KitainCrossSpear": {
	id: "genshin/KitainCrossSpear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LightofFoliarIncision": {
	id: "genshin/LightofFoliarIncision";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LionsRoar": {
	id: "genshin/LionsRoar";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LithicBlade": {
	id: "genshin/LithicBlade";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LithicSpear": {
	id: "genshin/LithicSpear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LostPrayertotheSacredWinds": {
	id: "genshin/LostPrayertotheSacredWinds";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LumidouceElegy": {
	id: "genshin/LumidouceElegy";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/LuxuriousSeaLord": {
	id: "genshin/LuxuriousSeaLord";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MailedFlower": {
	id: "genshin/MailedFlower";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MakhairaAquamarine": {
	id: "genshin/MakhairaAquamarine";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MappaMare": {
	id: "genshin/MappaMare";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MemoryofDust": {
	id: "genshin/MemoryofDust";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MissiveWindspear": {
	id: "genshin/MissiveWindspear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MistsplitterReforged": {
	id: "genshin/MistsplitterReforged";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MitternachtsWaltz": {
	id: "genshin/MitternachtsWaltz";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Moonpiercer": {
	id: "genshin/Moonpiercer";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/MouunsMoon": {
	id: "genshin/MouunsMoon";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/OathswornEye": {
	id: "genshin/OathswornEye";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PeakPatrolSong": {
	id: "genshin/PeakPatrolSong";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PolarStar": {
	id: "genshin/PolarStar";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PortablePowerSaw": {
	id: "genshin/PortablePowerSaw";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Predator": {
	id: "genshin/Predator";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrimordialJadeCutter": {
	id: "genshin/PrimordialJadeCutter";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrimordialJadeWingedSpear": {
	id: "genshin/PrimordialJadeWingedSpear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ProspectorsDrill": {
	id: "genshin/ProspectorsDrill";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrototypeAmber": {
	id: "genshin/PrototypeAmber";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrototypeArchaic": {
	id: "genshin/PrototypeArchaic";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrototypeCrescent": {
	id: "genshin/PrototypeCrescent";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrototypeRancour": {
	id: "genshin/PrototypeRancour";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/PrototypeStarglitter": {
	id: "genshin/PrototypeStarglitter";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Rainslasher": {
	id: "genshin/Rainslasher";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RangeGauge": {
	id: "genshin/RangeGauge";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RedhornStonethresher": {
	id: "genshin/RedhornStonethresher";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RightfulReward": {
	id: "genshin/RightfulReward";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RoyalBow": {
	id: "genshin/RoyalBow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RoyalGreatsword": {
	id: "genshin/RoyalGreatsword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RoyalGrimoire": {
	id: "genshin/RoyalGrimoire";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RoyalLongsword": {
	id: "genshin/RoyalLongsword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/RoyalSpear": {
	id: "genshin/RoyalSpear";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Rust": {
	id: "genshin/Rust";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SacrificialBow": {
	id: "genshin/SacrificialBow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SacrificialFragments": {
	id: "genshin/SacrificialFragments";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SacrificialGreatsword": {
	id: "genshin/SacrificialGreatsword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SacrificialJade": {
	id: "genshin/SacrificialJade";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SacrificialSword": {
	id: "genshin/SacrificialSword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SapwoodBlade": {
	id: "genshin/SapwoodBlade";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ScionoftheBlazingSun": {
	id: "genshin/ScionoftheBlazingSun";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SerpentSpine": {
	id: "genshin/SerpentSpine";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SilvershowerHeartstrings": {
	id: "genshin/SilvershowerHeartstrings";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SkywardAtlas": {
	id: "genshin/SkywardAtlas";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SkywardBlade": {
	id: "genshin/SkywardBlade";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SkywardHarp": {
	id: "genshin/SkywardHarp";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SkywardPride": {
	id: "genshin/SkywardPride";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SkywardSpine": {
	id: "genshin/SkywardSpine";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SnowTombedStarsilver": {
	id: "genshin/SnowTombedStarsilver";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SolarPearl": {
	id: "genshin/SolarPearl";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SongofBrokenPines": {
	id: "genshin/SongofBrokenPines";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SongofStillness": {
	id: "genshin/SongofStillness";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SplendorofTranquilWaters": {
	id: "genshin/SplendorofTranquilWaters";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/StaffofHoma": {
	id: "genshin/StaffofHoma";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/StaffoftheScarletSands": {
	id: "genshin/StaffoftheScarletSands";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SummitShaper": {
	id: "genshin/SummitShaper";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SurfsUp": {
	id: "genshin/SurfsUp";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SwordofDescension": {
	id: "genshin/SwordofDescension";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/SwordofNarzissenkreuz": {
	id: "genshin/SwordofNarzissenkreuz";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TalkingStick": {
	id: "genshin/TalkingStick";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheAlleyFlash": {
	id: "genshin/TheAlleyFlash";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheBell": {
	id: "genshin/TheBell";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheBlackSword": {
	id: "genshin/TheBlackSword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheCatch": {
	id: "genshin/TheCatch";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheDockhandsAssistant": {
	id: "genshin/TheDockhandsAssistant";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheFirstGreatMagic": {
	id: "genshin/TheFirstGreatMagic";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheFlute": {
	id: "genshin/TheFlute";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheStringless": {
	id: "genshin/TheStringless";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheUnforged": {
	id: "genshin/TheUnforged";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheViridescentHunt": {
	id: "genshin/TheViridescentHunt";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TheWidsith": {
	id: "genshin/TheWidsith";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ThunderingPulse": {
	id: "genshin/ThunderingPulse";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TidalShadow": {
	id: "genshin/TidalShadow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TomeoftheEternalFlow": {
	id: "genshin/TomeoftheEternalFlow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/ToukabouShigure": {
	id: "genshin/ToukabouShigure";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/TulaytullahsRemembrance": {
	id: "genshin/TulaytullahsRemembrance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/UltimateOverlordsMegaMagicSword": {
	id: "genshin/UltimateOverlordsMegaMagicSword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/UrakuMisugiri": {
	id: "genshin/UrakuMisugiri";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Verdict": {
	id: "genshin/Verdict";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/VortexVanquisher": {
	id: "genshin/VortexVanquisher";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WanderingEvenstar": {
	id: "genshin/WanderingEvenstar";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WavebreakersFin": {
	id: "genshin/WavebreakersFin";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/Whiteblind": {
	id: "genshin/Whiteblind";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WindblumeOde": {
	id: "genshin/WindblumeOde";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WineandSong": {
	id: "genshin/WineandSong";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WolfFang": {
	id: "genshin/WolfFang";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/WolfsGravestone": {
	id: "genshin/WolfsGravestone";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"genshin/XiphosMoonlight": {
	id: "genshin/XiphosMoonlight";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ASecretVow": {
	id: "starrail/ASecretVow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/AftertheCharmonyFall": {
	id: "starrail/AftertheCharmonyFall";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/AlongthePassingShore": {
	id: "starrail/AlongthePassingShore";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/AnInstantBeforeAGaze": {
	id: "starrail/AnInstantBeforeAGaze";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/BaptismofPureThought": {
	id: "starrail/BaptismofPureThought";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/BeforeDawn": {
	id: "starrail/BeforeDawn";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/BeforetheTutorialMissionStarts": {
	id: "starrail/BeforetheTutorialMissionStarts";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/BoundlessChoreo": {
	id: "starrail/BoundlessChoreo";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/BrighterThantheSun": {
	id: "starrail/BrighterThantheSun";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ButtheBattleIsntOver": {
	id: "starrail/ButtheBattleIsntOver";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/CarvetheMoonWeavetheClouds": {
	id: "starrail/CarvetheMoonWeavetheClouds";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ConcertforTwo": {
	id: "starrail/ConcertforTwo";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/CruisingintheStellarSea": {
	id: "starrail/CruisingintheStellarSea";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DanceDanceDance": {
	id: "starrail/DanceDanceDance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DanceatSunset": {
	id: "starrail/DanceatSunset";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DayOneofMyNewLife": {
	id: "starrail/DayOneofMyNewLife";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DestinysThreadsForewoven": {
	id: "starrail/DestinysThreadsForewoven";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DreamsMontage": {
	id: "starrail/DreamsMontage";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/DreamvilleAdventure": {
	id: "starrail/DreamvilleAdventure";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/EarthlyEscapade": {
	id: "starrail/EarthlyEscapade";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/EchoesoftheCoffin": {
	id: "starrail/EchoesoftheCoffin";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/EternalCalculus": {
	id: "starrail/EternalCalculus";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/EyesofthePrey": {
	id: "starrail/EyesofthePrey";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/Fermata": {
	id: "starrail/Fermata";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/FinalVictor": {
	id: "starrail/FinalVictor";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/FlamesAfar": {
	id: "starrail/FlamesAfar";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/FlowingNightglow": {
	id: "starrail/FlowingNightglow";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ForTomorrowsJourney": {
	id: "starrail/ForTomorrowsJourney";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/GeniusesRepose": {
	id: "starrail/GeniusesRepose";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/GoodNightandSleepWell": {
	id: "starrail/GoodNightandSleepWell";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/HeyOverHere": {
	id: "starrail/HeyOverHere";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IShallBeMyOwnSword": {
	id: "starrail/IShallBeMyOwnSword";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IVentureForthtoHunt": {
	id: "starrail/IVentureForthtoHunt";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IncessantRain": {
	id: "starrail/IncessantRain";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IndeliblePromise": {
	id: "starrail/IndeliblePromise";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/InherentlyUnjustDestiny": {
	id: "starrail/InherentlyUnjustDestiny";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IntheNameoftheWorld": {
	id: "starrail/IntheNameoftheWorld";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/IntheNight": {
	id: "starrail/IntheNight";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ItsShowtime": {
	id: "starrail/ItsShowtime";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/LandausChoice": {
	id: "starrail/LandausChoice";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/MaketheWorldClamor": {
	id: "starrail/MaketheWorldClamor";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/MemoriesofthePast": {
	id: "starrail/MemoriesofthePast";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/MomentofVictory": {
	id: "starrail/MomentofVictory";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/NightofFright": {
	id: "starrail/NightofFright";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/NightontheMilkyWay": {
	id: "starrail/NightontheMilkyWay";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/NinjaRecordSoundHunt": {
	id: "starrail/NinjaRecordSoundHunt";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/NinjutsuInscriptionDazzlingEvilbreaker": {
	id: "starrail/NinjutsuInscriptionDazzlingEvilbreaker";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/NowheretoRun": {
	id: "starrail/NowheretoRun";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/OnlySilenceRemains": {
	id: "starrail/OnlySilenceRemains";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/OntheFallofanAeon": {
	id: "starrail/OntheFallofanAeon";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PastSelfinMirror": {
	id: "starrail/PastSelfinMirror";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PastandFuture": {
	id: "starrail/PastandFuture";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PatienceIsAllYouNeed": {
	id: "starrail/PatienceIsAllYouNeed";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PerfectTiming": {
	id: "starrail/PerfectTiming";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PlanetaryRendezvous": {
	id: "starrail/PlanetaryRendezvous";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PoisedtoBloom": {
	id: "starrail/PoisedtoBloom";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/PostOpConversation": {
	id: "starrail/PostOpConversation";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/QuidProQuo": {
	id: "starrail/QuidProQuo";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ReforgedRemembrance": {
	id: "starrail/ReforgedRemembrance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ResolutionShinesAsPearlsofSweat": {
	id: "starrail/ResolutionShinesAsPearlsofSweat";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ReturntoDarkness": {
	id: "starrail/ReturntoDarkness";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/RiverFlowsinSpring": {
	id: "starrail/RiverFlowsinSpring";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SailingTowardsaSecondLife": {
	id: "starrail/SailingTowardsaSecondLife";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ScentAloneStaysTrue": {
	id: "starrail/ScentAloneStaysTrue";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ShadowedbyNight": {
	id: "starrail/ShadowedbyNight";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SharedFeeling": {
	id: "starrail/SharedFeeling";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SheAlreadyShutHerEyes": {
	id: "starrail/SheAlreadyShutHerEyes";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SleepLiketheDead": {
	id: "starrail/SleepLiketheDead";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SolitaryHealing": {
	id: "starrail/SolitaryHealing";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SomethingIrreplaceable": {
	id: "starrail/SomethingIrreplaceable";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/SubscribeforMore": {
	id: "starrail/SubscribeforMore";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/Swordplay": {
	id: "starrail/Swordplay";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TextureofMemories": {
	id: "starrail/TextureofMemories";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TheBirthoftheSelf": {
	id: "starrail/TheBirthoftheSelf";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TheDayTheCosmosFell": {
	id: "starrail/TheDayTheCosmosFell";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TheMolesWelcomeYou": {
	id: "starrail/TheMolesWelcomeYou";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TheSeriousnessofBreakfast": {
	id: "starrail/TheSeriousnessofBreakfast";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TheUnreachableSide": {
	id: "starrail/TheUnreachableSide";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ThisIsMe": {
	id: "starrail/ThisIsMe";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/ThoseManySprings": {
	id: "starrail/ThoseManySprings";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TimeWaitsforNoOne": {
	id: "starrail/TimeWaitsforNoOne";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TodayIsAnotherPeacefulDay": {
	id: "starrail/TodayIsAnotherPeacefulDay";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/TrendoftheUniversalMarket": {
	id: "starrail/TrendoftheUniversalMarket";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/UndertheBlueSky": {
	id: "starrail/UndertheBlueSky";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WarmthShortensColdNights": {
	id: "starrail/WarmthShortensColdNights";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WeAreWildfire": {
	id: "starrail/WeAreWildfire";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WeWillMeetAgain": {
	id: "starrail/WeWillMeetAgain";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WhatIsReal": {
	id: "starrail/WhatIsReal";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WhereaboutsShouldDreamsRest": {
	id: "starrail/WhereaboutsShouldDreamsRest";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WoofWalkTime": {
	id: "starrail/WoofWalkTime";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/WorrisomeBlissful": {
	id: "starrail/WorrisomeBlissful";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/YetHopeIsPriceless": {
	id: "starrail/YetHopeIsPriceless";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"starrail/fiveStar_default": {
	id: "starrail/fiveStar_default";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/AbyssSurges": {
	id: "wuwa/AbyssSurges";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/AgesofHarvest": {
	id: "wuwa/AgesofHarvest";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/AmityAccord": {
	id: "wuwa/AmityAccord";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Augment": {
	id: "wuwa/Augment";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Autumntrace": {
	id: "wuwa/Autumntrace";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/BlazingBrilliance": {
	id: "wuwa/BlazingBrilliance";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Broadblade41": {
	id: "wuwa/Broadblade41";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Cadenza": {
	id: "wuwa/Cadenza";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/CometFlare": {
	id: "wuwa/CometFlare";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/CommandoofConviction": {
	id: "wuwa/CommandoofConviction";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/CosmicRipples": {
	id: "wuwa/CosmicRipples";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/DauntlessEvernight": {
	id: "wuwa/DauntlessEvernight";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Discord": {
	id: "wuwa/Discord";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/EmeraldofGenesis": {
	id: "wuwa/EmeraldofGenesis";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Gauntlets21D": {
	id: "wuwa/Gauntlets21D";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/HeliosCleaver": {
	id: "wuwa/HeliosCleaver";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/HollowMirage": {
	id: "wuwa/HollowMirage";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/JinzhouKeeper": {
	id: "wuwa/JinzhouKeeper";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Lumingloss": {
	id: "wuwa/Lumingloss";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/LunarCutter": {
	id: "wuwa/LunarCutter";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/LustrousRazor": {
	id: "wuwa/LustrousRazor";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Marcato": {
	id: "wuwa/Marcato";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Novaburst": {
	id: "wuwa/Novaburst";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Pistols26": {
	id: "wuwa/Pistols26";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Rectifier25": {
	id: "wuwa/Rectifier25";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Rime-DrapedSprouts": {
	id: "wuwa/Rime-DrapedSprouts";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/ScaleSlasher": {
	id: "wuwa/ScaleSlasher";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/StaticMist": {
	id: "wuwa/StaticMist";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/StellarSymphony": {
	id: "wuwa/StellarSymphony";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Stonard": {
	id: "wuwa/Stonard";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Stringmaster": {
	id: "wuwa/Stringmaster";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Sword18": {
	id: "wuwa/Sword18";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Thunderbolt": {
	id: "wuwa/Thunderbolt";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/UndyingFlame": {
	id: "wuwa/UndyingFlame";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/Variation": {
	id: "wuwa/Variation";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/VerdantSummit": {
	id: "wuwa/VerdantSummit";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"wuwa/VeritysHandle": {
	id: "wuwa/VeritysHandle";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"zzz/FlamemakerShaker": {
	id: "zzz/FlamemakerShaker";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"zzz/StreetSuperstar": {
	id: "zzz/StreetSuperstar";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
"zzz/TusksofFury": {
	id: "zzz/TusksofFury";
  collection: "weapons";
  data: InferEntrySchema<"weapons">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
