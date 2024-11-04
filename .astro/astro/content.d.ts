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
  data: any
};
"genshin/alhaitham": {
	id: "genshin/alhaitham";
  collection: "characters";
  data: any
};
"genshin/amber": {
	id: "genshin/amber";
  collection: "characters";
  data: any
};
"genshin/aratakiitto": {
	id: "genshin/aratakiitto";
  collection: "characters";
  data: any
};
"genshin/arlecchino": {
	id: "genshin/arlecchino";
  collection: "characters";
  data: any
};
"genshin/baizhu": {
	id: "genshin/baizhu";
  collection: "characters";
  data: any
};
"genshin/barbara": {
	id: "genshin/barbara";
  collection: "characters";
  data: any
};
"genshin/beidou": {
	id: "genshin/beidou";
  collection: "characters";
  data: any
};
"genshin/bennett": {
	id: "genshin/bennett";
  collection: "characters";
  data: any
};
"genshin/candace": {
	id: "genshin/candace";
  collection: "characters";
  data: any
};
"genshin/charlotte": {
	id: "genshin/charlotte";
  collection: "characters";
  data: any
};
"genshin/chasca": {
	id: "genshin/chasca";
  collection: "characters";
  data: any
};
"genshin/chevreuse": {
	id: "genshin/chevreuse";
  collection: "characters";
  data: any
};
"genshin/chiori": {
	id: "genshin/chiori";
  collection: "characters";
  data: any
};
"genshin/chongyun": {
	id: "genshin/chongyun";
  collection: "characters";
  data: any
};
"genshin/citlali": {
	id: "genshin/citlali";
  collection: "characters";
  data: any
};
"genshin/clorinde": {
	id: "genshin/clorinde";
  collection: "characters";
  data: any
};
"genshin/collei": {
	id: "genshin/collei";
  collection: "characters";
  data: any
};
"genshin/cyno": {
	id: "genshin/cyno";
  collection: "characters";
  data: any
};
"genshin/dehya": {
	id: "genshin/dehya";
  collection: "characters";
  data: any
};
"genshin/diluc": {
	id: "genshin/diluc";
  collection: "characters";
  data: any
};
"genshin/diona": {
	id: "genshin/diona";
  collection: "characters";
  data: any
};
"genshin/dori": {
	id: "genshin/dori";
  collection: "characters";
  data: any
};
"genshin/emelie": {
	id: "genshin/emelie";
  collection: "characters";
  data: any
};
"genshin/eula": {
	id: "genshin/eula";
  collection: "characters";
  data: any
};
"genshin/faruzan": {
	id: "genshin/faruzan";
  collection: "characters";
  data: any
};
"genshin/fischl": {
	id: "genshin/fischl";
  collection: "characters";
  data: any
};
"genshin/freminet": {
	id: "genshin/freminet";
  collection: "characters";
  data: any
};
"genshin/furina": {
	id: "genshin/furina";
  collection: "characters";
  data: any
};
"genshin/gaming": {
	id: "genshin/gaming";
  collection: "characters";
  data: any
};
"genshin/ganyu": {
	id: "genshin/ganyu";
  collection: "characters";
  data: any
};
"genshin/gorou": {
	id: "genshin/gorou";
  collection: "characters";
  data: any
};
"genshin/hutao": {
	id: "genshin/hutao";
  collection: "characters";
  data: any
};
"genshin/jean": {
	id: "genshin/jean";
  collection: "characters";
  data: any
};
"genshin/kachina": {
	id: "genshin/kachina";
  collection: "characters";
  data: any
};
"genshin/kaedeharakazuha": {
	id: "genshin/kaedeharakazuha";
  collection: "characters";
  data: any
};
"genshin/kaeya": {
	id: "genshin/kaeya";
  collection: "characters";
  data: any
};
"genshin/kamisatoayaka": {
	id: "genshin/kamisatoayaka";
  collection: "characters";
  data: any
};
"genshin/kamisatoayato": {
	id: "genshin/kamisatoayato";
  collection: "characters";
  data: any
};
"genshin/kaveh": {
	id: "genshin/kaveh";
  collection: "characters";
  data: any
};
"genshin/keqing": {
	id: "genshin/keqing";
  collection: "characters";
  data: any
};
"genshin/kinich": {
	id: "genshin/kinich";
  collection: "characters";
  data: any
};
"genshin/kirara": {
	id: "genshin/kirara";
  collection: "characters";
  data: any
};
"genshin/klee": {
	id: "genshin/klee";
  collection: "characters";
  data: any
};
"genshin/kujousara": {
	id: "genshin/kujousara";
  collection: "characters";
  data: any
};
"genshin/kukishinobu": {
	id: "genshin/kukishinobu";
  collection: "characters";
  data: any
};
"genshin/layla": {
	id: "genshin/layla";
  collection: "characters";
  data: any
};
"genshin/lisa": {
	id: "genshin/lisa";
  collection: "characters";
  data: any
};
"genshin/lynette": {
	id: "genshin/lynette";
  collection: "characters";
  data: any
};
"genshin/lyney": {
	id: "genshin/lyney";
  collection: "characters";
  data: any
};
"genshin/mavuika": {
	id: "genshin/mavuika";
  collection: "characters";
  data: any
};
"genshin/mika": {
	id: "genshin/mika";
  collection: "characters";
  data: any
};
"genshin/mona": {
	id: "genshin/mona";
  collection: "characters";
  data: any
};
"genshin/mualani": {
	id: "genshin/mualani";
  collection: "characters";
  data: any
};
"genshin/nahida": {
	id: "genshin/nahida";
  collection: "characters";
  data: any
};
"genshin/navia": {
	id: "genshin/navia";
  collection: "characters";
  data: any
};
"genshin/neuvillette": {
	id: "genshin/neuvillette";
  collection: "characters";
  data: any
};
"genshin/nilou": {
	id: "genshin/nilou";
  collection: "characters";
  data: any
};
"genshin/ningguang": {
	id: "genshin/ningguang";
  collection: "characters";
  data: any
};
"genshin/noelle": {
	id: "genshin/noelle";
  collection: "characters";
  data: any
};
"genshin/ororon": {
	id: "genshin/ororon";
  collection: "characters";
  data: any
};
"genshin/qiqi": {
	id: "genshin/qiqi";
  collection: "characters";
  data: any
};
"genshin/raidenshogun": {
	id: "genshin/raidenshogun";
  collection: "characters";
  data: any
};
"genshin/razor": {
	id: "genshin/razor";
  collection: "characters";
  data: any
};
"genshin/rosaria": {
	id: "genshin/rosaria";
  collection: "characters";
  data: any
};
"genshin/sangonomiyakokomi": {
	id: "genshin/sangonomiyakokomi";
  collection: "characters";
  data: any
};
"genshin/sayu": {
	id: "genshin/sayu";
  collection: "characters";
  data: any
};
"genshin/sethos": {
	id: "genshin/sethos";
  collection: "characters";
  data: any
};
"genshin/shenhe": {
	id: "genshin/shenhe";
  collection: "characters";
  data: any
};
"genshin/shikanoinheizou": {
	id: "genshin/shikanoinheizou";
  collection: "characters";
  data: any
};
"genshin/sigewinne": {
	id: "genshin/sigewinne";
  collection: "characters";
  data: any
};
"genshin/sucrose": {
	id: "genshin/sucrose";
  collection: "characters";
  data: any
};
"genshin/tartaglia": {
	id: "genshin/tartaglia";
  collection: "characters";
  data: any
};
"genshin/thoma": {
	id: "genshin/thoma";
  collection: "characters";
  data: any
};
"genshin/tighnari": {
	id: "genshin/tighnari";
  collection: "characters";
  data: any
};
"genshin/venti": {
	id: "genshin/venti";
  collection: "characters";
  data: any
};
"genshin/wanderer": {
	id: "genshin/wanderer";
  collection: "characters";
  data: any
};
"genshin/wriothesley": {
	id: "genshin/wriothesley";
  collection: "characters";
  data: any
};
"genshin/xiangling": {
	id: "genshin/xiangling";
  collection: "characters";
  data: any
};
"genshin/xianyun": {
	id: "genshin/xianyun";
  collection: "characters";
  data: any
};
"genshin/xiao": {
	id: "genshin/xiao";
  collection: "characters";
  data: any
};
"genshin/xilonen": {
	id: "genshin/xilonen";
  collection: "characters";
  data: any
};
"genshin/xingqiu": {
	id: "genshin/xingqiu";
  collection: "characters";
  data: any
};
"genshin/xinyan": {
	id: "genshin/xinyan";
  collection: "characters";
  data: any
};
"genshin/yaemiko": {
	id: "genshin/yaemiko";
  collection: "characters";
  data: any
};
"genshin/yanfei": {
	id: "genshin/yanfei";
  collection: "characters";
  data: any
};
"genshin/yaoyao": {
	id: "genshin/yaoyao";
  collection: "characters";
  data: any
};
"genshin/yelan": {
	id: "genshin/yelan";
  collection: "characters";
  data: any
};
"genshin/yoimiya": {
	id: "genshin/yoimiya";
  collection: "characters";
  data: any
};
"genshin/yunjin": {
	id: "genshin/yunjin";
  collection: "characters";
  data: any
};
"genshin/zhongli": {
	id: "genshin/zhongli";
  collection: "characters";
  data: any
};
"reverse/37": {
	id: "reverse/37";
  collection: "characters";
  data: any
};
"reverse/6": {
	id: "reverse/6";
  collection: "characters";
  data: any
};
"reverse/aknight": {
	id: "reverse/aknight";
  collection: "characters";
  data: any
};
"reverse/alient": {
	id: "reverse/alient";
  collection: "characters";
  data: any
};
"reverse/ananlee": {
	id: "reverse/ananlee";
  collection: "characters";
  data: any
};
"reverse/apple": {
	id: "reverse/apple";
  collection: "characters";
  data: any
};
"reverse/babyblue": {
	id: "reverse/babyblue";
  collection: "characters";
  data: any
};
"reverse/balloonparty": {
	id: "reverse/balloonparty";
  collection: "characters";
  data: any
};
"reverse/bette": {
	id: "reverse/bette";
  collection: "characters";
  data: any
};
"reverse/bkornblume": {
	id: "reverse/bkornblume";
  collection: "characters";
  data: any
};
"reverse/blonney": {
	id: "reverse/blonney";
  collection: "characters";
  data: any
};
"reverse/bunnybunny": {
	id: "reverse/bunnybunny";
  collection: "characters";
  data: any
};
"reverse/centurion": {
	id: "reverse/centurion";
  collection: "characters";
  data: any
};
"reverse/charlie": {
	id: "reverse/charlie";
  collection: "characters";
  data: any
};
"reverse/click": {
	id: "reverse/click";
  collection: "characters";
  data: any
};
"reverse/cristallo": {
	id: "reverse/cristallo";
  collection: "characters";
  data: any
};
"reverse/darleyclatter": {
	id: "reverse/darleyclatter";
  collection: "characters";
  data: any
};
"reverse/desertflannel": {
	id: "reverse/desertflannel";
  collection: "characters";
  data: any
};
"reverse/diggers": {
	id: "reverse/diggers";
  collection: "characters";
  data: any
};
"reverse/dikke": {
	id: "reverse/dikke";
  collection: "characters";
  data: any
};
"reverse/door": {
	id: "reverse/door";
  collection: "characters";
  data: any
};
"reverse/druvisiii": {
	id: "reverse/druvisiii";
  collection: "characters";
  data: any
};
"reverse/eagle": {
	id: "reverse/eagle";
  collection: "characters";
  data: any
};
"reverse/erick": {
	id: "reverse/erick";
  collection: "characters";
  data: any
};
"reverse/eternity": {
	id: "reverse/eternity";
  collection: "characters";
  data: any
};
"reverse/ezra": {
	id: "reverse/ezra";
  collection: "characters";
  data: any
};
"reverse/getian": {
	id: "reverse/getian";
  collection: "characters";
  data: any
};
"reverse/horropedia": {
	id: "reverse/horropedia";
  collection: "characters";
  data: any
};
"reverse/isolde": {
	id: "reverse/isolde";
  collection: "characters";
  data: any
};
"reverse/jessica": {
	id: "reverse/jessica";
  collection: "characters";
  data: any
};
"reverse/jiuniangzi": {
	id: "reverse/jiuniangzi";
  collection: "characters";
  data: any
};
"reverse/johntitor": {
	id: "reverse/johntitor";
  collection: "characters";
  data: any
};
"reverse/kaalaabaunaa": {
	id: "reverse/kaalaabaunaa";
  collection: "characters";
  data: any
};
"reverse/kanjira": {
	id: "reverse/kanjira";
  collection: "characters";
  data: any
};
"reverse/lasource": {
	id: "reverse/lasource";
  collection: "characters";
  data: any
};
"reverse/leilani": {
	id: "reverse/leilani";
  collection: "characters";
  data: any
};
"reverse/lilya": {
	id: "reverse/lilya";
  collection: "characters";
  data: any
};
"reverse/marcus": {
	id: "reverse/marcus";
  collection: "characters";
  data: any
};
"reverse/matilda": {
	id: "reverse/matilda";
  collection: "characters";
  data: any
};
"reverse/medicinepocket": {
	id: "reverse/medicinepocket";
  collection: "characters";
  data: any
};
"reverse/melania": {
	id: "reverse/melania";
  collection: "characters";
  data: any
};
"reverse/mesmerjr": {
	id: "reverse/mesmerjr";
  collection: "characters";
  data: any
};
"reverse/mondlicht": {
	id: "reverse/mondlicht";
  collection: "characters";
  data: any
};
"reverse/msmoissan": {
	id: "reverse/msmoissan";
  collection: "characters";
  data: any
};
"reverse/msnewbabel": {
	id: "reverse/msnewbabel";
  collection: "characters";
  data: any
};
"reverse/msradio": {
	id: "reverse/msradio";
  collection: "characters";
  data: any
};
"reverse/necrologist": {
	id: "reverse/necrologist";
  collection: "characters";
  data: any
};
"reverse/nickbottom": {
	id: "reverse/nickbottom";
  collection: "characters";
  data: any
};
"reverse/oliverfog": {
	id: "reverse/oliverfog";
  collection: "characters";
  data: any
};
"reverse/onion": {
	id: "reverse/onion";
  collection: "characters";
  data: any
};
"reverse/pavia": {
	id: "reverse/pavia";
  collection: "characters";
  data: any
};
"reverse/pickles": {
	id: "reverse/pickles";
  collection: "characters";
  data: any
};
"reverse/poltergeist": {
	id: "reverse/poltergeist";
  collection: "characters";
  data: any
};
"reverse/rabies": {
	id: "reverse/rabies";
  collection: "characters";
  data: any
};
"reverse/regulus": {
	id: "reverse/regulus";
  collection: "characters";
  data: any
};
"reverse/satsuki": {
	id: "reverse/satsuki";
  collection: "characters";
  data: any
};
"reverse/schneider": {
	id: "reverse/schneider";
  collection: "characters";
  data: any
};
"reverse/shamane": {
	id: "reverse/shamane";
  collection: "characters";
  data: any
};
"reverse/sonetto": {
	id: "reverse/sonetto";
  collection: "characters";
  data: any
};
"reverse/sotheby": {
	id: "reverse/sotheby";
  collection: "characters";
  data: any
};
"reverse/spathodea": {
	id: "reverse/spathodea";
  collection: "characters";
  data: any
};
"reverse/sputnik": {
	id: "reverse/sputnik";
  collection: "characters";
  data: any
};
"reverse/sweetheart": {
	id: "reverse/sweetheart";
  collection: "characters";
  data: any
};
"reverse/tennant": {
	id: "reverse/tennant";
  collection: "characters";
  data: any
};
"reverse/thefool": {
	id: "reverse/thefool";
  collection: "characters";
  data: any
};
"reverse/toothfairy": {
	id: "reverse/toothfairy";
  collection: "characters";
  data: any
};
"reverse/ttt": {
	id: "reverse/ttt";
  collection: "characters";
  data: any
};
"reverse/twinssleep": {
	id: "reverse/twinssleep";
  collection: "characters";
  data: any
};
"reverse/ulu": {
	id: "reverse/ulu";
  collection: "characters";
  data: any
};
"reverse/voyager": {
	id: "reverse/voyager";
  collection: "characters";
  data: any
};
"reverse/windsong": {
	id: "reverse/windsong";
  collection: "characters";
  data: any
};
"reverse/x": {
	id: "reverse/x";
  collection: "characters";
  data: any
};
"reverse/yenisei": {
	id: "reverse/yenisei";
  collection: "characters";
  data: any
};
"reverse/zimma": {
	id: "reverse/zimma";
  collection: "characters";
  data: any
};
"starrail/acheron": {
	id: "starrail/acheron";
  collection: "characters";
  data: any
};
"starrail/aglaea": {
	id: "starrail/aglaea";
  collection: "characters";
  data: any
};
"starrail/argenti": {
	id: "starrail/argenti";
  collection: "characters";
  data: any
};
"starrail/arlan": {
	id: "starrail/arlan";
  collection: "characters";
  data: any
};
"starrail/asta": {
	id: "starrail/asta";
  collection: "characters";
  data: any
};
"starrail/aventurine": {
	id: "starrail/aventurine";
  collection: "characters";
  data: any
};
"starrail/bailu": {
	id: "starrail/bailu";
  collection: "characters";
  data: any
};
"starrail/blackswan": {
	id: "starrail/blackswan";
  collection: "characters";
  data: any
};
"starrail/blade": {
	id: "starrail/blade";
  collection: "characters";
  data: any
};
"starrail/boothill": {
	id: "starrail/boothill";
  collection: "characters";
  data: any
};
"starrail/bronya": {
	id: "starrail/bronya";
  collection: "characters";
  data: any
};
"starrail/clara": {
	id: "starrail/clara";
  collection: "characters";
  data: any
};
"starrail/danheng": {
	id: "starrail/danheng";
  collection: "characters";
  data: any
};
"starrail/drratio": {
	id: "starrail/drratio";
  collection: "characters";
  data: any
};
"starrail/feixiao": {
	id: "starrail/feixiao";
  collection: "characters";
  data: any
};
"starrail/firefly": {
	id: "starrail/firefly";
  collection: "characters";
  data: any
};
"starrail/fugue": {
	id: "starrail/fugue";
  collection: "characters";
  data: any
};
"starrail/fuxuan": {
	id: "starrail/fuxuan";
  collection: "characters";
  data: any
};
"starrail/gallagher": {
	id: "starrail/gallagher";
  collection: "characters";
  data: any
};
"starrail/gepard": {
	id: "starrail/gepard";
  collection: "characters";
  data: any
};
"starrail/guinaifen": {
	id: "starrail/guinaifen";
  collection: "characters";
  data: any
};
"starrail/hanya": {
	id: "starrail/hanya";
  collection: "characters";
  data: any
};
"starrail/herta": {
	id: "starrail/herta";
  collection: "characters";
  data: any
};
"starrail/hertasp": {
	id: "starrail/hertasp";
  collection: "characters";
  data: any
};
"starrail/himeko": {
	id: "starrail/himeko";
  collection: "characters";
  data: any
};
"starrail/hook": {
	id: "starrail/hook";
  collection: "characters";
  data: any
};
"starrail/huohuo": {
	id: "starrail/huohuo";
  collection: "characters";
  data: any
};
"starrail/jade": {
	id: "starrail/jade";
  collection: "characters";
  data: any
};
"starrail/jiaoqiu": {
	id: "starrail/jiaoqiu";
  collection: "characters";
  data: any
};
"starrail/jingliu": {
	id: "starrail/jingliu";
  collection: "characters";
  data: any
};
"starrail/jingyuan": {
	id: "starrail/jingyuan";
  collection: "characters";
  data: any
};
"starrail/kafka": {
	id: "starrail/kafka";
  collection: "characters";
  data: any
};
"starrail/lingsha": {
	id: "starrail/lingsha";
  collection: "characters";
  data: any
};
"starrail/luka": {
	id: "starrail/luka";
  collection: "characters";
  data: any
};
"starrail/luocha": {
	id: "starrail/luocha";
  collection: "characters";
  data: any
};
"starrail/lynx": {
	id: "starrail/lynx";
  collection: "characters";
  data: any
};
"starrail/march7th": {
	id: "starrail/march7th";
  collection: "characters";
  data: any
};
"starrail/misha": {
	id: "starrail/misha";
  collection: "characters";
  data: any
};
"starrail/moze": {
	id: "starrail/moze";
  collection: "characters";
  data: any
};
"starrail/natasha": {
	id: "starrail/natasha";
  collection: "characters";
  data: any
};
"starrail/pela": {
	id: "starrail/pela";
  collection: "characters";
  data: any
};
"starrail/qingque": {
	id: "starrail/qingque";
  collection: "characters";
  data: any
};
"starrail/rappa": {
	id: "starrail/rappa";
  collection: "characters";
  data: any
};
"starrail/reca": {
	id: "starrail/reca";
  collection: "characters";
  data: any
};
"starrail/robin": {
	id: "starrail/robin";
  collection: "characters";
  data: any
};
"starrail/ruanmei": {
	id: "starrail/ruanmei";
  collection: "characters";
  data: any
};
"starrail/sampo": {
	id: "starrail/sampo";
  collection: "characters";
  data: any
};
"starrail/screwllum": {
	id: "starrail/screwllum";
  collection: "characters";
  data: any
};
"starrail/seele": {
	id: "starrail/seele";
  collection: "characters";
  data: any
};
"starrail/serval": {
	id: "starrail/serval";
  collection: "characters";
  data: any
};
"starrail/silverwolf": {
	id: "starrail/silverwolf";
  collection: "characters";
  data: any
};
"starrail/sparkle": {
	id: "starrail/sparkle";
  collection: "characters";
  data: any
};
"starrail/sunday": {
	id: "starrail/sunday";
  collection: "characters";
  data: any
};
"starrail/sushang": {
	id: "starrail/sushang";
  collection: "characters";
  data: any
};
"starrail/tingyun": {
	id: "starrail/tingyun";
  collection: "characters";
  data: any
};
"starrail/topaz": {
	id: "starrail/topaz";
  collection: "characters";
  data: any
};
"starrail/welt": {
	id: "starrail/welt";
  collection: "characters";
  data: any
};
"starrail/xueyi": {
	id: "starrail/xueyi";
  collection: "characters";
  data: any
};
"starrail/yanqing": {
	id: "starrail/yanqing";
  collection: "characters";
  data: any
};
"starrail/yinyuejun": {
	id: "starrail/yinyuejun";
  collection: "characters";
  data: any
};
"starrail/yukong": {
	id: "starrail/yukong";
  collection: "characters";
  data: any
};
"starrail/yunli": {
	id: "starrail/yunli";
  collection: "characters";
  data: any
};
"wuwa/aalto": {
	id: "wuwa/aalto";
  collection: "characters";
  data: any
};
"wuwa/baizhi": {
	id: "wuwa/baizhi";
  collection: "characters";
  data: any
};
"wuwa/calcharo": {
	id: "wuwa/calcharo";
  collection: "characters";
  data: any
};
"wuwa/camellya": {
	id: "wuwa/camellya";
  collection: "characters";
  data: any
};
"wuwa/changli": {
	id: "wuwa/changli";
  collection: "characters";
  data: any
};
"wuwa/chixia": {
	id: "wuwa/chixia";
  collection: "characters";
  data: any
};
"wuwa/danjin": {
	id: "wuwa/danjin";
  collection: "characters";
  data: any
};
"wuwa/encore": {
	id: "wuwa/encore";
  collection: "characters";
  data: any
};
"wuwa/geshulin": {
	id: "wuwa/geshulin";
  collection: "characters";
  data: any
};
"wuwa/jianxin": {
	id: "wuwa/jianxin";
  collection: "characters";
  data: any
};
"wuwa/jinhsi": {
	id: "wuwa/jinhsi";
  collection: "characters";
  data: any
};
"wuwa/jiyan": {
	id: "wuwa/jiyan";
  collection: "characters";
  data: any
};
"wuwa/lingyang": {
	id: "wuwa/lingyang";
  collection: "characters";
  data: any
};
"wuwa/lumi": {
	id: "wuwa/lumi";
  collection: "characters";
  data: any
};
"wuwa/mortefi": {
	id: "wuwa/mortefi";
  collection: "characters";
  data: any
};
"wuwa/sanhua": {
	id: "wuwa/sanhua";
  collection: "characters";
  data: any
};
"wuwa/scar": {
	id: "wuwa/scar";
  collection: "characters";
  data: any
};
"wuwa/shorekeeper": {
	id: "wuwa/shorekeeper";
  collection: "characters";
  data: any
};
"wuwa/taoqi": {
	id: "wuwa/taoqi";
  collection: "characters";
  data: any
};
"wuwa/verina": {
	id: "wuwa/verina";
  collection: "characters";
  data: any
};
"wuwa/xiangliyao": {
	id: "wuwa/xiangliyao";
  collection: "characters";
  data: any
};
"wuwa/yangyang": {
	id: "wuwa/yangyang";
  collection: "characters";
  data: any
};
"wuwa/yinlin": {
	id: "wuwa/yinlin";
  collection: "characters";
  data: any
};
"wuwa/youhu": {
	id: "wuwa/youhu";
  collection: "characters";
  data: any
};
"wuwa/yuanwu": {
	id: "wuwa/yuanwu";
  collection: "characters";
  data: any
};
"wuwa/zhezhi": {
	id: "wuwa/zhezhi";
  collection: "characters";
  data: any
};
"zzz/anby": {
	id: "zzz/anby";
  collection: "characters";
  data: any
};
"zzz/anton": {
	id: "zzz/anton";
  collection: "characters";
  data: any
};
"zzz/ben": {
	id: "zzz/ben";
  collection: "characters";
  data: any
};
"zzz/billy": {
	id: "zzz/billy";
  collection: "characters";
  data: any
};
"zzz/burnice": {
	id: "zzz/burnice";
  collection: "characters";
  data: any
};
"zzz/caesar": {
	id: "zzz/caesar";
  collection: "characters";
  data: any
};
"zzz/corin": {
	id: "zzz/corin";
  collection: "characters";
  data: any
};
"zzz/harumasa": {
	id: "zzz/harumasa";
  collection: "characters";
  data: any
};
"zzz/lighter": {
	id: "zzz/lighter";
  collection: "characters";
  data: any
};
"zzz/lucy": {
	id: "zzz/lucy";
  collection: "characters";
  data: any
};
"zzz/miyabi": {
	id: "zzz/miyabi";
  collection: "characters";
  data: any
};
"zzz/nicole": {
	id: "zzz/nicole";
  collection: "characters";
  data: any
};
"zzz/piper": {
	id: "zzz/piper";
  collection: "characters";
  data: any
};
"zzz/seth": {
	id: "zzz/seth";
  collection: "characters";
  data: any
};
"zzz/soukaku": {
	id: "zzz/soukaku";
  collection: "characters";
  data: any
};
"zzz/yanagi": {
	id: "zzz/yanagi";
  collection: "characters";
  data: any
};
};
"events": {
"genshin/4.7/characters/five/alhaitham": {
	id: "genshin/4.7/characters/five/alhaitham";
  collection: "events";
  data: any
};
"genshin/4.7/characters/five/clorinde": {
	id: "genshin/4.7/characters/five/clorinde";
  collection: "events";
  data: any
};
"genshin/4.7/characters/five/furina": {
	id: "genshin/4.7/characters/five/furina";
  collection: "events";
  data: any
};
"genshin/4.7/characters/five/sigewinne": {
	id: "genshin/4.7/characters/five/sigewinne";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/bennett": {
	id: "genshin/4.7/characters/four/bennett";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/gaming": {
	id: "genshin/4.7/characters/four/gaming";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/noelle": {
	id: "genshin/4.7/characters/four/noelle";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/rosaria": {
	id: "genshin/4.7/characters/four/rosaria";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/sethos": {
	id: "genshin/4.7/characters/four/sethos";
  collection: "events";
  data: any
};
"genshin/4.7/characters/four/thoma": {
	id: "genshin/4.7/characters/four/thoma";
  collection: "events";
  data: any
};
"genshin/4.8/characters/five/emelie": {
	id: "genshin/4.8/characters/five/emelie";
  collection: "events";
  data: any
};
"genshin/4.8/characters/five/navia": {
	id: "genshin/4.8/characters/five/navia";
  collection: "events";
  data: any
};
"genshin/4.8/characters/five/nilou": {
	id: "genshin/4.8/characters/five/nilou";
  collection: "events";
  data: any
};
"genshin/4.8/characters/five/yelan": {
	id: "genshin/4.8/characters/five/yelan";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/kaveh": {
	id: "genshin/4.8/characters/four/kaveh";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/kirara": {
	id: "genshin/4.8/characters/four/kirara";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/ningguang": {
	id: "genshin/4.8/characters/four/ningguang";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/razor": {
	id: "genshin/4.8/characters/four/razor";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/xiangling": {
	id: "genshin/4.8/characters/four/xiangling";
  collection: "events";
  data: any
};
"genshin/4.8/characters/four/yanfei": {
	id: "genshin/4.8/characters/four/yanfei";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/dragonsbane": {
	id: "genshin/4.8/weapons/dragonsbane";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/eyeofperception": {
	id: "genshin/4.8/weapons/eyeofperception";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/favoniuslance": {
	id: "genshin/4.8/weapons/favoniuslance";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/favoniuswarbow": {
	id: "genshin/4.8/weapons/favoniuswarbow";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/makhairaaquamarine": {
	id: "genshin/4.8/weapons/makhairaaquamarine";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/rust": {
	id: "genshin/4.8/weapons/rust";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/thebell": {
	id: "genshin/4.8/weapons/thebell";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/theflute": {
	id: "genshin/4.8/weapons/theflute";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/waderingevenstar": {
	id: "genshin/4.8/weapons/waderingevenstar";
  collection: "events";
  data: any
};
"genshin/4.8/weapons/xiphosmoolight": {
	id: "genshin/4.8/weapons/xiphosmoolight";
  collection: "events";
  data: any
};
"genshin/5.0/characters/five/kazuha": {
	id: "genshin/5.0/characters/five/kazuha";
  collection: "events";
  data: any
};
"genshin/5.0/characters/five/kinich": {
	id: "genshin/5.0/characters/five/kinich";
  collection: "events";
  data: any
};
"genshin/5.0/characters/five/mualani": {
	id: "genshin/5.0/characters/five/mualani";
  collection: "events";
  data: any
};
"genshin/5.0/characters/five/raiden": {
	id: "genshin/5.0/characters/five/raiden";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/bennett": {
	id: "genshin/5.0/characters/four/bennett";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/chevreuse": {
	id: "genshin/5.0/characters/four/chevreuse";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/kachina": {
	id: "genshin/5.0/characters/four/kachina";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/kujousara": {
	id: "genshin/5.0/characters/four/kujousara";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/thoma": {
	id: "genshin/5.0/characters/four/thoma";
  collection: "events";
  data: any
};
"genshin/5.0/characters/four/xinyan": {
	id: "genshin/5.0/characters/four/xinyan";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/dragonsbane": {
	id: "genshin/5.0/weapons/dragonsbane";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/favoniusgreatsword": {
	id: "genshin/5.0/weapons/favoniusgreatsword";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/favoniuslance": {
	id: "genshin/5.0/weapons/favoniuslance";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/favoniussword": {
	id: "genshin/5.0/weapons/favoniussword";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/rainslasher": {
	id: "genshin/5.0/weapons/rainslasher";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/sacrificialbow": {
	id: "genshin/5.0/weapons/sacrificialbow";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/sacrificialfragments": {
	id: "genshin/5.0/weapons/sacrificialfragments";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/sacrificialsword": {
	id: "genshin/5.0/weapons/sacrificialsword";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/thestringless": {
	id: "genshin/5.0/weapons/thestringless";
  collection: "events";
  data: any
};
"genshin/5.0/weapons/thewidsith": {
	id: "genshin/5.0/weapons/thewidsith";
  collection: "events";
  data: any
};
"genshin/5.1/characters/five/chiori": {
	id: "genshin/5.1/characters/five/chiori";
  collection: "events";
  data: any
};
"genshin/5.1/characters/five/hutao": {
	id: "genshin/5.1/characters/five/hutao";
  collection: "events";
  data: any
};
"genshin/5.1/characters/five/nahida": {
	id: "genshin/5.1/characters/five/nahida";
  collection: "events";
  data: any
};
"genshin/5.1/characters/five/xilonen": {
	id: "genshin/5.1/characters/five/xilonen";
  collection: "events";
  data: any
};
"genshin/5.1/characters/four/candace": {
	id: "genshin/5.1/characters/four/candace";
  collection: "events";
  data: any
};
"genshin/5.1/characters/four/collei": {
	id: "genshin/5.1/characters/four/collei";
  collection: "events";
  data: any
};
"genshin/5.1/characters/four/dori": {
	id: "genshin/5.1/characters/four/dori";
  collection: "events";
  data: any
};
"genshin/5.1/characters/four/kukishinobu": {
	id: "genshin/5.1/characters/four/kukishinobu";
  collection: "events";
  data: any
};
"genshin/5.2/characters/five/chasca": {
	id: "genshin/5.2/characters/five/chasca";
  collection: "events";
  data: any
};
"genshin/5.2/characters/five/lyney": {
	id: "genshin/5.2/characters/five/lyney";
  collection: "events";
  data: any
};
"genshin/5.2/characters/five/neuvillette": {
	id: "genshin/5.2/characters/five/neuvillette";
  collection: "events";
  data: any
};
"genshin/5.2/characters/five/zhongli": {
	id: "genshin/5.2/characters/five/zhongli";
  collection: "events";
  data: any
};
"genshin/5.2/characters/four/ororon": {
	id: "genshin/5.2/characters/four/ororon";
  collection: "events";
  data: any
};
"genshin/5.3/characters/five/wriothesley": {
	id: "genshin/5.3/characters/five/wriothesley";
  collection: "events";
  data: any
};
"starrail/2.2/boothill": {
	id: "starrail/2.2/boothill";
  collection: "events";
  data: any
};
"starrail/2.2/fuxuan": {
	id: "starrail/2.2/fuxuan";
  collection: "events";
  data: any
};
"starrail/2.2/robin": {
	id: "starrail/2.2/robin";
  collection: "events";
  data: any
};
"starrail/2.2/topaz": {
	id: "starrail/2.2/topaz";
  collection: "events";
  data: any
};
"starrail/2.3/argenti": {
	id: "starrail/2.3/argenti";
  collection: "events";
  data: any
};
"starrail/2.3/asta": {
	id: "starrail/2.3/asta";
  collection: "events";
  data: any
};
"starrail/2.3/firefly": {
	id: "starrail/2.3/firefly";
  collection: "events";
  data: any
};
"starrail/2.3/gallagher": {
	id: "starrail/2.3/gallagher";
  collection: "events";
  data: any
};
"starrail/2.3/jade": {
	id: "starrail/2.3/jade";
  collection: "events";
  data: any
};
"starrail/2.3/misha": {
	id: "starrail/2.3/misha";
  collection: "events";
  data: any
};
"starrail/2.3/natasha": {
	id: "starrail/2.3/natasha";
  collection: "events";
  data: any
};
"starrail/2.3/ruanmei": {
	id: "starrail/2.3/ruanmei";
  collection: "events";
  data: any
};
"starrail/2.3/serval": {
	id: "starrail/2.3/serval";
  collection: "events";
  data: any
};
"starrail/2.3/xueyi": {
	id: "starrail/2.3/xueyi";
  collection: "events";
  data: any
};
"starrail/2.4/characters/five/huohuo": {
	id: "starrail/2.4/characters/five/huohuo";
  collection: "events";
  data: any
};
"starrail/2.4/characters/five/jiaoqiu": {
	id: "starrail/2.4/characters/five/jiaoqiu";
  collection: "events";
  data: any
};
"starrail/2.4/characters/five/sparkle": {
	id: "starrail/2.4/characters/five/sparkle";
  collection: "events";
  data: any
};
"starrail/2.4/characters/five/yunli": {
	id: "starrail/2.4/characters/five/yunli";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/arlan": {
	id: "starrail/2.4/characters/four/arlan";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/guinaifen": {
	id: "starrail/2.4/characters/four/guinaifen";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/hanya": {
	id: "starrail/2.4/characters/four/hanya";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/hook": {
	id: "starrail/2.4/characters/four/hook";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/lynx": {
	id: "starrail/2.4/characters/four/lynx";
  collection: "events";
  data: any
};
"starrail/2.4/characters/four/yukong": {
	id: "starrail/2.4/characters/four/yukong";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/eyesofprey": {
	id: "starrail/2.4/weapons/eyesofprey";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/perfecttiming": {
	id: "starrail/2.4/weapons/perfecttiming";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/poisedtobloom": {
	id: "starrail/2.4/weapons/poisedtobloom";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/secretvow": {
	id: "starrail/2.4/weapons/secretvow";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/thebirthoftheself": {
	id: "starrail/2.4/weapons/thebirthoftheself";
  collection: "events";
  data: any
};
"starrail/2.4/weapons/themoleswelcomeyou": {
	id: "starrail/2.4/weapons/themoleswelcomeyou";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/blackswan": {
	id: "starrail/2.5/characters/five/blackswan";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/feixiao": {
	id: "starrail/2.5/characters/five/feixiao";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/kafka": {
	id: "starrail/2.5/characters/five/kafka";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/lingsha": {
	id: "starrail/2.5/characters/five/lingsha";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/robin": {
	id: "starrail/2.5/characters/five/robin";
  collection: "events";
  data: any
};
"starrail/2.5/characters/five/topaz": {
	id: "starrail/2.5/characters/five/topaz";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/asta": {
	id: "starrail/2.5/characters/four/asta";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/guinaifen": {
	id: "starrail/2.5/characters/four/guinaifen";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/luka": {
	id: "starrail/2.5/characters/four/luka";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/misha": {
	id: "starrail/2.5/characters/four/misha";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/moze": {
	id: "starrail/2.5/characters/four/moze";
  collection: "events";
  data: any
};
"starrail/2.5/characters/four/natasha": {
	id: "starrail/2.5/characters/four/natasha";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/PlanetaryRendezvous": {
	id: "starrail/2.5/weapons/PlanetaryRendezvous";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/ResolutionShinesAsPearlsofSweat": {
	id: "starrail/2.5/weapons/ResolutionShinesAsPearlsofSweat";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/ShadowedbyNight": {
	id: "starrail/2.5/weapons/ShadowedbyNight";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/SharedFeeling": {
	id: "starrail/2.5/weapons/SharedFeeling";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/Swordplay": {
	id: "starrail/2.5/weapons/Swordplay";
  collection: "events";
  data: any
};
"starrail/2.5/weapons/TheBirthoftheSelf": {
	id: "starrail/2.5/weapons/TheBirthoftheSelf";
  collection: "events";
  data: any
};
"starrail/2.6/characters/five/acheron": {
	id: "starrail/2.6/characters/five/acheron";
  collection: "events";
  data: any
};
"starrail/2.6/characters/five/aventurine": {
	id: "starrail/2.6/characters/five/aventurine";
  collection: "events";
  data: any
};
"starrail/2.6/characters/five/rappa": {
	id: "starrail/2.6/characters/five/rappa";
  collection: "events";
  data: any
};
"starrail/2.6/characters/five/yinyuejun": {
	id: "starrail/2.6/characters/five/yinyuejun";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/lynx": {
	id: "starrail/2.6/characters/four/lynx";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/march7th": {
	id: "starrail/2.6/characters/four/march7th";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/pela": {
	id: "starrail/2.6/characters/four/pela";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/sampo": {
	id: "starrail/2.6/characters/four/sampo";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/xueyi": {
	id: "starrail/2.6/characters/four/xueyi";
  collection: "events";
  data: any
};
"starrail/2.6/characters/four/yukong": {
	id: "starrail/2.6/characters/four/yukong";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/AftertheCharmonyFall": {
	id: "starrail/2.6/weapons/AftertheCharmonyFall";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/BoundlessChoreo": {
	id: "starrail/2.6/weapons/BoundlessChoreo";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/DayOneofMyNewLife": {
	id: "starrail/2.6/weapons/DayOneofMyNewLife";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/DreamsMontage": {
	id: "starrail/2.6/weapons/DreamsMontage";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/MaketheWorldClamor": {
	id: "starrail/2.6/weapons/MaketheWorldClamor";
  collection: "events";
  data: any
};
"starrail/2.6/weapons/UndertheBlueSky": {
	id: "starrail/2.6/weapons/UndertheBlueSky";
  collection: "events";
  data: any
};
"starrail/2.7/characters/five/fugue": {
	id: "starrail/2.7/characters/five/fugue";
  collection: "events";
  data: any
};
"starrail/2.7/characters/five/sunday": {
	id: "starrail/2.7/characters/five/sunday";
  collection: "events";
  data: any
};
"starrail/2.7/characters/four/reca": {
	id: "starrail/2.7/characters/four/reca";
  collection: "events";
  data: any
};
"wuwa/1.0/aalto": {
	id: "wuwa/1.0/aalto";
  collection: "events";
  data: any
};
"wuwa/1.0/chixia": {
	id: "wuwa/1.0/chixia";
  collection: "events";
  data: any
};
"wuwa/1.0/danjin": {
	id: "wuwa/1.0/danjin";
  collection: "events";
  data: any
};
"wuwa/1.0/jiyan": {
	id: "wuwa/1.0/jiyan";
  collection: "events";
  data: any
};
"wuwa/1.0/mortefi": {
	id: "wuwa/1.0/mortefi";
  collection: "events";
  data: any
};
"wuwa/1.0/taoqi": {
	id: "wuwa/1.0/taoqi";
  collection: "events";
  data: any
};
"wuwa/1.0/yinlin": {
	id: "wuwa/1.0/yinlin";
  collection: "events";
  data: any
};
"wuwa/1.0/yuanwu": {
	id: "wuwa/1.0/yuanwu";
  collection: "events";
  data: any
};
"wuwa/1.1/baizhi": {
	id: "wuwa/1.1/baizhi";
  collection: "events";
  data: any
};
"wuwa/1.1/changli": {
	id: "wuwa/1.1/changli";
  collection: "events";
  data: any
};
"wuwa/1.1/danjin": {
	id: "wuwa/1.1/danjin";
  collection: "events";
  data: any
};
"wuwa/1.1/jinhsi": {
	id: "wuwa/1.1/jinhsi";
  collection: "events";
  data: any
};
"wuwa/1.1/mortefi": {
	id: "wuwa/1.1/mortefi";
  collection: "events";
  data: any
};
"wuwa/1.1/sanhua": {
	id: "wuwa/1.1/sanhua";
  collection: "events";
  data: any
};
"wuwa/1.1/taoqi": {
	id: "wuwa/1.1/taoqi";
  collection: "events";
  data: any
};
"wuwa/1.1/yangyang": {
	id: "wuwa/1.1/yangyang";
  collection: "events";
  data: any
};
"wuwa/1.2/xiangliyao": {
	id: "wuwa/1.2/xiangliyao";
  collection: "events";
  data: any
};
"wuwa/1.2/zhezhi": {
	id: "wuwa/1.2/zhezhi";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/five/jiyan": {
	id: "wuwa/1.3/characters/five/jiyan";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/five/shorekeeper": {
	id: "wuwa/1.3/characters/five/shorekeeper";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/chixia": {
	id: "wuwa/1.3/characters/four/chixia";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/mortefi": {
	id: "wuwa/1.3/characters/four/mortefi";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/sanhua": {
	id: "wuwa/1.3/characters/four/sanhua";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/taoqi": {
	id: "wuwa/1.3/characters/four/taoqi";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/yangyang": {
	id: "wuwa/1.3/characters/four/yangyang";
  collection: "events";
  data: any
};
"wuwa/1.3/characters/four/youhu": {
	id: "wuwa/1.3/characters/four/youhu";
  collection: "events";
  data: any
};
"wuwa/1.4/characters/five/camellya": {
	id: "wuwa/1.4/characters/five/camellya";
  collection: "events";
  data: any
};
"wuwa/1.4/characters/five/xiangliyao": {
	id: "wuwa/1.4/characters/five/xiangliyao";
  collection: "events";
  data: any
};
"wuwa/1.4/characters/five/yinlin": {
	id: "wuwa/1.4/characters/five/yinlin";
  collection: "events";
  data: any
};
"wuwa/1.4/characters/four/lumi": {
	id: "wuwa/1.4/characters/four/lumi";
  collection: "events";
  data: any
};
"zzz/1.2/characters/five/burnice": {
	id: "zzz/1.2/characters/five/burnice";
  collection: "events";
  data: any
};
"zzz/1.2/characters/five/caesar": {
	id: "zzz/1.2/characters/five/caesar";
  collection: "events";
  data: any
};
"zzz/1.2/characters/four/anton": {
	id: "zzz/1.2/characters/four/anton";
  collection: "events";
  data: any
};
"zzz/1.2/characters/four/lucy": {
	id: "zzz/1.2/characters/four/lucy";
  collection: "events";
  data: any
};
"zzz/1.2/characters/four/nicole": {
	id: "zzz/1.2/characters/four/nicole";
  collection: "events";
  data: any
};
"zzz/1.2/characters/four/piper": {
	id: "zzz/1.2/characters/four/piper";
  collection: "events";
  data: any
};
"zzz/1.3/characters/five/lighter": {
	id: "zzz/1.3/characters/five/lighter";
  collection: "events";
  data: any
};
"zzz/1.3/characters/five/yanagi": {
	id: "zzz/1.3/characters/five/yanagi";
  collection: "events";
  data: any
};
"zzz/1.3/characters/four/anby": {
	id: "zzz/1.3/characters/four/anby";
  collection: "events";
  data: any
};
"zzz/1.3/characters/four/ben": {
	id: "zzz/1.3/characters/four/ben";
  collection: "events";
  data: any
};
"zzz/1.3/characters/four/billy": {
	id: "zzz/1.3/characters/four/billy";
  collection: "events";
  data: any
};
"zzz/1.3/characters/four/corin": {
	id: "zzz/1.3/characters/four/corin";
  collection: "events";
  data: any
};
"zzz/1.4/characters/five/harumasa": {
	id: "zzz/1.4/characters/five/harumasa";
  collection: "events";
  data: any
};
"zzz/1.4/characters/five/miyabi": {
	id: "zzz/1.4/characters/five/miyabi";
  collection: "events";
  data: any
};
};
"games": {
"genshin": {
	id: "genshin";
  collection: "games";
  data: any
};
"starrail": {
	id: "starrail";
  collection: "games";
  data: any
};
"wuwa": {
	id: "wuwa";
  collection: "games";
  data: any
};
"zzz": {
	id: "zzz";
  collection: "games";
  data: any
};
};
"versions": {
"genshin/4.7": {
	id: "genshin/4.7";
  collection: "versions";
  data: any
};
"genshin/4.8": {
	id: "genshin/4.8";
  collection: "versions";
  data: any
};
"genshin/5.0": {
	id: "genshin/5.0";
  collection: "versions";
  data: any
};
"genshin/5.1": {
	id: "genshin/5.1";
  collection: "versions";
  data: any
};
"genshin/5.2": {
	id: "genshin/5.2";
  collection: "versions";
  data: any
};
"genshin/5.3": {
	id: "genshin/5.3";
  collection: "versions";
  data: any
};
"genshin/5.4": {
	id: "genshin/5.4";
  collection: "versions";
  data: any
};
"starrail/2.2": {
	id: "starrail/2.2";
  collection: "versions";
  data: any
};
"starrail/2.3": {
	id: "starrail/2.3";
  collection: "versions";
  data: any
};
"starrail/2.4": {
	id: "starrail/2.4";
  collection: "versions";
  data: any
};
"starrail/2.5": {
	id: "starrail/2.5";
  collection: "versions";
  data: any
};
"starrail/2.6": {
	id: "starrail/2.6";
  collection: "versions";
  data: any
};
"starrail/2.7": {
	id: "starrail/2.7";
  collection: "versions";
  data: any
};
"wuwa/1.0": {
	id: "wuwa/1.0";
  collection: "versions";
  data: any
};
"wuwa/1.1": {
	id: "wuwa/1.1";
  collection: "versions";
  data: any
};
"wuwa/1.2": {
	id: "wuwa/1.2";
  collection: "versions";
  data: any
};
"wuwa/1.3": {
	id: "wuwa/1.3";
  collection: "versions";
  data: any
};
"wuwa/1.4": {
	id: "wuwa/1.4";
  collection: "versions";
  data: any
};
"wuwa/1.5": {
	id: "wuwa/1.5";
  collection: "versions";
  data: any
};
"zzz/1.2": {
	id: "zzz/1.2";
  collection: "versions";
  data: any
};
"zzz/1.3": {
	id: "zzz/1.3";
  collection: "versions";
  data: any
};
"zzz/1.4": {
	id: "zzz/1.4";
  collection: "versions";
  data: any
};
};
"weapons": {
"genshin/AThousandFloatingDreams": {
	id: "genshin/AThousandFloatingDreams";
  collection: "weapons";
  data: any
};
"genshin/Absolution": {
	id: "genshin/Absolution";
  collection: "weapons";
  data: any
};
"genshin/Akuoumaru": {
	id: "genshin/Akuoumaru";
  collection: "weapons";
  data: any
};
"genshin/AlleyHunter": {
	id: "genshin/AlleyHunter";
  collection: "weapons";
  data: any
};
"genshin/AmenomaKageuchi": {
	id: "genshin/AmenomaKageuchi";
  collection: "weapons";
  data: any
};
"genshin/AmosBow": {
	id: "genshin/AmosBow";
  collection: "weapons";
  data: any
};
"genshin/AquaSimulacra": {
	id: "genshin/AquaSimulacra";
  collection: "weapons";
  data: any
};
"genshin/AquilaFavonia": {
	id: "genshin/AquilaFavonia";
  collection: "weapons";
  data: any
};
"genshin/AstralVulturesCrimsonPlumage": {
	id: "genshin/AstralVulturesCrimsonPlumage";
  collection: "weapons";
  data: any
};
"genshin/BalladoftheBoundlessBlue": {
	id: "genshin/BalladoftheBoundlessBlue";
  collection: "weapons";
  data: any
};
"genshin/BalladoftheFjords": {
	id: "genshin/BalladoftheFjords";
  collection: "weapons";
  data: any
};
"genshin/BeaconoftheReedSea": {
	id: "genshin/BeaconoftheReedSea";
  collection: "weapons";
  data: any
};
"genshin/BlackcliffAgate": {
	id: "genshin/BlackcliffAgate";
  collection: "weapons";
  data: any
};
"genshin/BlackcliffLongsword": {
	id: "genshin/BlackcliffLongsword";
  collection: "weapons";
  data: any
};
"genshin/BlackcliffPole": {
	id: "genshin/BlackcliffPole";
  collection: "weapons";
  data: any
};
"genshin/BlackcliffSlasher": {
	id: "genshin/BlackcliffSlasher";
  collection: "weapons";
  data: any
};
"genshin/BlackcliffWarbow": {
	id: "genshin/BlackcliffWarbow";
  collection: "weapons";
  data: any
};
"genshin/CalamityQueller": {
	id: "genshin/CalamityQueller";
  collection: "weapons";
  data: any
};
"genshin/CalamityofEshu": {
	id: "genshin/CalamityofEshu";
  collection: "weapons";
  data: any
};
"genshin/CashflowSupervision": {
	id: "genshin/CashflowSupervision";
  collection: "weapons";
  data: any
};
"genshin/CinnabarSpindle": {
	id: "genshin/CinnabarSpindle";
  collection: "weapons";
  data: any
};
"genshin/Cloudforged": {
	id: "genshin/Cloudforged";
  collection: "weapons";
  data: any
};
"genshin/CompoundBow": {
	id: "genshin/CompoundBow";
  collection: "weapons";
  data: any
};
"genshin/CranesEchoingCall": {
	id: "genshin/CranesEchoingCall";
  collection: "weapons";
  data: any
};
"genshin/CrescentPike": {
	id: "genshin/CrescentPike";
  collection: "weapons";
  data: any
};
"genshin/CrimsonMoonsSemblance": {
	id: "genshin/CrimsonMoonsSemblance";
  collection: "weapons";
  data: any
};
"genshin/Deathmatch": {
	id: "genshin/Deathmatch";
  collection: "weapons";
  data: any
};
"genshin/DialoguesoftheDesertSages": {
	id: "genshin/DialoguesoftheDesertSages";
  collection: "weapons";
  data: any
};
"genshin/DodocoTales": {
	id: "genshin/DodocoTales";
  collection: "weapons";
  data: any
};
"genshin/DragonsBane": {
	id: "genshin/DragonsBane";
  collection: "weapons";
  data: any
};
"genshin/DragonspineSpear": {
	id: "genshin/DragonspineSpear";
  collection: "weapons";
  data: any
};
"genshin/ElegyfortheEnd": {
	id: "genshin/ElegyfortheEnd";
  collection: "weapons";
  data: any
};
"genshin/EndoftheLine": {
	id: "genshin/EndoftheLine";
  collection: "weapons";
  data: any
};
"genshin/EngulfingLightning": {
	id: "genshin/EngulfingLightning";
  collection: "weapons";
  data: any
};
"genshin/EverlastingMoonglow": {
	id: "genshin/EverlastingMoonglow";
  collection: "weapons";
  data: any
};
"genshin/EyeofPerception": {
	id: "genshin/EyeofPerception";
  collection: "weapons";
  data: any
};
"genshin/FadingTwilight": {
	id: "genshin/FadingTwilight";
  collection: "weapons";
  data: any
};
"genshin/FangoftheMountainKing": {
	id: "genshin/FangoftheMountainKing";
  collection: "weapons";
  data: any
};
"genshin/FavoniusCodex": {
	id: "genshin/FavoniusCodex";
  collection: "weapons";
  data: any
};
"genshin/FavoniusGreatsword": {
	id: "genshin/FavoniusGreatsword";
  collection: "weapons";
  data: any
};
"genshin/FavoniusLance": {
	id: "genshin/FavoniusLance";
  collection: "weapons";
  data: any
};
"genshin/FavoniusSword": {
	id: "genshin/FavoniusSword";
  collection: "weapons";
  data: any
};
"genshin/FavoniusWarbow": {
	id: "genshin/FavoniusWarbow";
  collection: "weapons";
  data: any
};
"genshin/FesteringDesire": {
	id: "genshin/FesteringDesire";
  collection: "weapons";
  data: any
};
"genshin/FinaleoftheDeep": {
	id: "genshin/FinaleoftheDeep";
  collection: "weapons";
  data: any
};
"genshin/FleuveCendreFerryman": {
	id: "genshin/FleuveCendreFerryman";
  collection: "weapons";
  data: any
};
"genshin/FlowerWreathedFeather": {
	id: "genshin/FlowerWreathedFeather";
  collection: "weapons";
  data: any
};
"genshin/FlowingPurity": {
	id: "genshin/FlowingPurity";
  collection: "weapons";
  data: any
};
"genshin/ForestRegalia": {
	id: "genshin/ForestRegalia";
  collection: "weapons";
  data: any
};
"genshin/FreedomSworn": {
	id: "genshin/FreedomSworn";
  collection: "weapons";
  data: any
};
"genshin/Frostbearer": {
	id: "genshin/Frostbearer";
  collection: "weapons";
  data: any
};
"genshin/FruitofFulfillment": {
	id: "genshin/FruitofFulfillment";
  collection: "weapons";
  data: any
};
"genshin/HakushinRing": {
	id: "genshin/HakushinRing";
  collection: "weapons";
  data: any
};
"genshin/Hamayumi": {
	id: "genshin/Hamayumi";
  collection: "weapons";
  data: any
};
"genshin/HaranGeppakuFutsu": {
	id: "genshin/HaranGeppakuFutsu";
  collection: "weapons";
  data: any
};
"genshin/HuntersPath": {
	id: "genshin/HuntersPath";
  collection: "weapons";
  data: any
};
"genshin/IbisPiercer": {
	id: "genshin/IbisPiercer";
  collection: "weapons";
  data: any
};
"genshin/IronSting": {
	id: "genshin/IronSting";
  collection: "weapons";
  data: any
};
"genshin/JadefallsSplendor": {
	id: "genshin/JadefallsSplendor";
  collection: "weapons";
  data: any
};
"genshin/KagotsurubeIsshin": {
	id: "genshin/KagotsurubeIsshin";
  collection: "weapons";
  data: any
};
"genshin/KagurasVerity": {
	id: "genshin/KagurasVerity";
  collection: "weapons";
  data: any
};
"genshin/KatsuragikiriNagamasa": {
	id: "genshin/KatsuragikiriNagamasa";
  collection: "weapons";
  data: any
};
"genshin/KeyofKhajNisut": {
	id: "genshin/KeyofKhajNisut";
  collection: "weapons";
  data: any
};
"genshin/KingsSquire": {
	id: "genshin/KingsSquire";
  collection: "weapons";
  data: any
};
"genshin/KitainCrossSpear": {
	id: "genshin/KitainCrossSpear";
  collection: "weapons";
  data: any
};
"genshin/LightofFoliarIncision": {
	id: "genshin/LightofFoliarIncision";
  collection: "weapons";
  data: any
};
"genshin/LionsRoar": {
	id: "genshin/LionsRoar";
  collection: "weapons";
  data: any
};
"genshin/LithicBlade": {
	id: "genshin/LithicBlade";
  collection: "weapons";
  data: any
};
"genshin/LithicSpear": {
	id: "genshin/LithicSpear";
  collection: "weapons";
  data: any
};
"genshin/LostPrayertotheSacredWinds": {
	id: "genshin/LostPrayertotheSacredWinds";
  collection: "weapons";
  data: any
};
"genshin/LumidouceElegy": {
	id: "genshin/LumidouceElegy";
  collection: "weapons";
  data: any
};
"genshin/LuxuriousSeaLord": {
	id: "genshin/LuxuriousSeaLord";
  collection: "weapons";
  data: any
};
"genshin/MailedFlower": {
	id: "genshin/MailedFlower";
  collection: "weapons";
  data: any
};
"genshin/MakhairaAquamarine": {
	id: "genshin/MakhairaAquamarine";
  collection: "weapons";
  data: any
};
"genshin/MappaMare": {
	id: "genshin/MappaMare";
  collection: "weapons";
  data: any
};
"genshin/MemoryofDust": {
	id: "genshin/MemoryofDust";
  collection: "weapons";
  data: any
};
"genshin/MissiveWindspear": {
	id: "genshin/MissiveWindspear";
  collection: "weapons";
  data: any
};
"genshin/MistsplitterReforged": {
	id: "genshin/MistsplitterReforged";
  collection: "weapons";
  data: any
};
"genshin/MitternachtsWaltz": {
	id: "genshin/MitternachtsWaltz";
  collection: "weapons";
  data: any
};
"genshin/Moonpiercer": {
	id: "genshin/Moonpiercer";
  collection: "weapons";
  data: any
};
"genshin/MouunsMoon": {
	id: "genshin/MouunsMoon";
  collection: "weapons";
  data: any
};
"genshin/OathswornEye": {
	id: "genshin/OathswornEye";
  collection: "weapons";
  data: any
};
"genshin/PeakPatrolSong": {
	id: "genshin/PeakPatrolSong";
  collection: "weapons";
  data: any
};
"genshin/PolarStar": {
	id: "genshin/PolarStar";
  collection: "weapons";
  data: any
};
"genshin/PortablePowerSaw": {
	id: "genshin/PortablePowerSaw";
  collection: "weapons";
  data: any
};
"genshin/Predator": {
	id: "genshin/Predator";
  collection: "weapons";
  data: any
};
"genshin/PrimordialJadeCutter": {
	id: "genshin/PrimordialJadeCutter";
  collection: "weapons";
  data: any
};
"genshin/PrimordialJadeWingedSpear": {
	id: "genshin/PrimordialJadeWingedSpear";
  collection: "weapons";
  data: any
};
"genshin/ProspectorsDrill": {
	id: "genshin/ProspectorsDrill";
  collection: "weapons";
  data: any
};
"genshin/PrototypeAmber": {
	id: "genshin/PrototypeAmber";
  collection: "weapons";
  data: any
};
"genshin/PrototypeArchaic": {
	id: "genshin/PrototypeArchaic";
  collection: "weapons";
  data: any
};
"genshin/PrototypeCrescent": {
	id: "genshin/PrototypeCrescent";
  collection: "weapons";
  data: any
};
"genshin/PrototypeRancour": {
	id: "genshin/PrototypeRancour";
  collection: "weapons";
  data: any
};
"genshin/PrototypeStarglitter": {
	id: "genshin/PrototypeStarglitter";
  collection: "weapons";
  data: any
};
"genshin/Rainslasher": {
	id: "genshin/Rainslasher";
  collection: "weapons";
  data: any
};
"genshin/RangeGauge": {
	id: "genshin/RangeGauge";
  collection: "weapons";
  data: any
};
"genshin/RedhornStonethresher": {
	id: "genshin/RedhornStonethresher";
  collection: "weapons";
  data: any
};
"genshin/RightfulReward": {
	id: "genshin/RightfulReward";
  collection: "weapons";
  data: any
};
"genshin/RoyalBow": {
	id: "genshin/RoyalBow";
  collection: "weapons";
  data: any
};
"genshin/RoyalGreatsword": {
	id: "genshin/RoyalGreatsword";
  collection: "weapons";
  data: any
};
"genshin/RoyalGrimoire": {
	id: "genshin/RoyalGrimoire";
  collection: "weapons";
  data: any
};
"genshin/RoyalLongsword": {
	id: "genshin/RoyalLongsword";
  collection: "weapons";
  data: any
};
"genshin/RoyalSpear": {
	id: "genshin/RoyalSpear";
  collection: "weapons";
  data: any
};
"genshin/Rust": {
	id: "genshin/Rust";
  collection: "weapons";
  data: any
};
"genshin/SacrificialBow": {
	id: "genshin/SacrificialBow";
  collection: "weapons";
  data: any
};
"genshin/SacrificialFragments": {
	id: "genshin/SacrificialFragments";
  collection: "weapons";
  data: any
};
"genshin/SacrificialGreatsword": {
	id: "genshin/SacrificialGreatsword";
  collection: "weapons";
  data: any
};
"genshin/SacrificialJade": {
	id: "genshin/SacrificialJade";
  collection: "weapons";
  data: any
};
"genshin/SacrificialSword": {
	id: "genshin/SacrificialSword";
  collection: "weapons";
  data: any
};
"genshin/SapwoodBlade": {
	id: "genshin/SapwoodBlade";
  collection: "weapons";
  data: any
};
"genshin/ScionoftheBlazingSun": {
	id: "genshin/ScionoftheBlazingSun";
  collection: "weapons";
  data: any
};
"genshin/SerpentSpine": {
	id: "genshin/SerpentSpine";
  collection: "weapons";
  data: any
};
"genshin/SilvershowerHeartstrings": {
	id: "genshin/SilvershowerHeartstrings";
  collection: "weapons";
  data: any
};
"genshin/SkywardAtlas": {
	id: "genshin/SkywardAtlas";
  collection: "weapons";
  data: any
};
"genshin/SkywardBlade": {
	id: "genshin/SkywardBlade";
  collection: "weapons";
  data: any
};
"genshin/SkywardHarp": {
	id: "genshin/SkywardHarp";
  collection: "weapons";
  data: any
};
"genshin/SkywardPride": {
	id: "genshin/SkywardPride";
  collection: "weapons";
  data: any
};
"genshin/SkywardSpine": {
	id: "genshin/SkywardSpine";
  collection: "weapons";
  data: any
};
"genshin/SnowTombedStarsilver": {
	id: "genshin/SnowTombedStarsilver";
  collection: "weapons";
  data: any
};
"genshin/SolarPearl": {
	id: "genshin/SolarPearl";
  collection: "weapons";
  data: any
};
"genshin/SongofBrokenPines": {
	id: "genshin/SongofBrokenPines";
  collection: "weapons";
  data: any
};
"genshin/SongofStillness": {
	id: "genshin/SongofStillness";
  collection: "weapons";
  data: any
};
"genshin/SplendorofTranquilWaters": {
	id: "genshin/SplendorofTranquilWaters";
  collection: "weapons";
  data: any
};
"genshin/StaffofHoma": {
	id: "genshin/StaffofHoma";
  collection: "weapons";
  data: any
};
"genshin/StaffoftheScarletSands": {
	id: "genshin/StaffoftheScarletSands";
  collection: "weapons";
  data: any
};
"genshin/SummitShaper": {
	id: "genshin/SummitShaper";
  collection: "weapons";
  data: any
};
"genshin/SurfsUp": {
	id: "genshin/SurfsUp";
  collection: "weapons";
  data: any
};
"genshin/SwordofDescension": {
	id: "genshin/SwordofDescension";
  collection: "weapons";
  data: any
};
"genshin/SwordofNarzissenkreuz": {
	id: "genshin/SwordofNarzissenkreuz";
  collection: "weapons";
  data: any
};
"genshin/TalkingStick": {
	id: "genshin/TalkingStick";
  collection: "weapons";
  data: any
};
"genshin/TheAlleyFlash": {
	id: "genshin/TheAlleyFlash";
  collection: "weapons";
  data: any
};
"genshin/TheBell": {
	id: "genshin/TheBell";
  collection: "weapons";
  data: any
};
"genshin/TheBlackSword": {
	id: "genshin/TheBlackSword";
  collection: "weapons";
  data: any
};
"genshin/TheCatch": {
	id: "genshin/TheCatch";
  collection: "weapons";
  data: any
};
"genshin/TheDockhandsAssistant": {
	id: "genshin/TheDockhandsAssistant";
  collection: "weapons";
  data: any
};
"genshin/TheFirstGreatMagic": {
	id: "genshin/TheFirstGreatMagic";
  collection: "weapons";
  data: any
};
"genshin/TheFlute": {
	id: "genshin/TheFlute";
  collection: "weapons";
  data: any
};
"genshin/TheStringless": {
	id: "genshin/TheStringless";
  collection: "weapons";
  data: any
};
"genshin/TheUnforged": {
	id: "genshin/TheUnforged";
  collection: "weapons";
  data: any
};
"genshin/TheViridescentHunt": {
	id: "genshin/TheViridescentHunt";
  collection: "weapons";
  data: any
};
"genshin/TheWidsith": {
	id: "genshin/TheWidsith";
  collection: "weapons";
  data: any
};
"genshin/ThunderingPulse": {
	id: "genshin/ThunderingPulse";
  collection: "weapons";
  data: any
};
"genshin/TidalShadow": {
	id: "genshin/TidalShadow";
  collection: "weapons";
  data: any
};
"genshin/TomeoftheEternalFlow": {
	id: "genshin/TomeoftheEternalFlow";
  collection: "weapons";
  data: any
};
"genshin/ToukabouShigure": {
	id: "genshin/ToukabouShigure";
  collection: "weapons";
  data: any
};
"genshin/TulaytullahsRemembrance": {
	id: "genshin/TulaytullahsRemembrance";
  collection: "weapons";
  data: any
};
"genshin/UltimateOverlordsMegaMagicSword": {
	id: "genshin/UltimateOverlordsMegaMagicSword";
  collection: "weapons";
  data: any
};
"genshin/UrakuMisugiri": {
	id: "genshin/UrakuMisugiri";
  collection: "weapons";
  data: any
};
"genshin/Verdict": {
	id: "genshin/Verdict";
  collection: "weapons";
  data: any
};
"genshin/VortexVanquisher": {
	id: "genshin/VortexVanquisher";
  collection: "weapons";
  data: any
};
"genshin/WanderingEvenstar": {
	id: "genshin/WanderingEvenstar";
  collection: "weapons";
  data: any
};
"genshin/WavebreakersFin": {
	id: "genshin/WavebreakersFin";
  collection: "weapons";
  data: any
};
"genshin/WaveridingWhirl": {
	id: "genshin/WaveridingWhirl";
  collection: "weapons";
  data: any
};
"genshin/Whiteblind": {
	id: "genshin/Whiteblind";
  collection: "weapons";
  data: any
};
"genshin/WindblumeOde": {
	id: "genshin/WindblumeOde";
  collection: "weapons";
  data: any
};
"genshin/WineandSong": {
	id: "genshin/WineandSong";
  collection: "weapons";
  data: any
};
"genshin/WolfFang": {
	id: "genshin/WolfFang";
  collection: "weapons";
  data: any
};
"genshin/WolfsGravestone": {
	id: "genshin/WolfsGravestone";
  collection: "weapons";
  data: any
};
"genshin/XiphosMoonlight": {
	id: "genshin/XiphosMoonlight";
  collection: "weapons";
  data: any
};
"starrail/AGroundedAscent": {
	id: "starrail/AGroundedAscent";
  collection: "weapons";
  data: any
};
"starrail/ASecretVow": {
	id: "starrail/ASecretVow";
  collection: "weapons";
  data: any
};
"starrail/AftertheCharmonyFall": {
	id: "starrail/AftertheCharmonyFall";
  collection: "weapons";
  data: any
};
"starrail/AlongthePassingShore": {
	id: "starrail/AlongthePassingShore";
  collection: "weapons";
  data: any
};
"starrail/AnInstantBeforeAGaze": {
	id: "starrail/AnInstantBeforeAGaze";
  collection: "weapons";
  data: any
};
"starrail/BaptismofPureThought": {
	id: "starrail/BaptismofPureThought";
  collection: "weapons";
  data: any
};
"starrail/BeforeDawn": {
	id: "starrail/BeforeDawn";
  collection: "weapons";
  data: any
};
"starrail/BeforetheTutorialMissionStarts": {
	id: "starrail/BeforetheTutorialMissionStarts";
  collection: "weapons";
  data: any
};
"starrail/BoundlessChoreo": {
	id: "starrail/BoundlessChoreo";
  collection: "weapons";
  data: any
};
"starrail/BrighterThantheSun": {
	id: "starrail/BrighterThantheSun";
  collection: "weapons";
  data: any
};
"starrail/ButtheBattleIsntOver": {
	id: "starrail/ButtheBattleIsntOver";
  collection: "weapons";
  data: any
};
"starrail/CarvetheMoonWeavetheClouds": {
	id: "starrail/CarvetheMoonWeavetheClouds";
  collection: "weapons";
  data: any
};
"starrail/ConcertforTwo": {
	id: "starrail/ConcertforTwo";
  collection: "weapons";
  data: any
};
"starrail/CruisingintheStellarSea": {
	id: "starrail/CruisingintheStellarSea";
  collection: "weapons";
  data: any
};
"starrail/DanceDanceDance": {
	id: "starrail/DanceDanceDance";
  collection: "weapons";
  data: any
};
"starrail/DanceatSunset": {
	id: "starrail/DanceatSunset";
  collection: "weapons";
  data: any
};
"starrail/DayOneofMyNewLife": {
	id: "starrail/DayOneofMyNewLife";
  collection: "weapons";
  data: any
};
"starrail/DestinysThreadsForewoven": {
	id: "starrail/DestinysThreadsForewoven";
  collection: "weapons";
  data: any
};
"starrail/DreamsMontage": {
	id: "starrail/DreamsMontage";
  collection: "weapons";
  data: any
};
"starrail/DreamvilleAdventure": {
	id: "starrail/DreamvilleAdventure";
  collection: "weapons";
  data: any
};
"starrail/EarthlyEscapade": {
	id: "starrail/EarthlyEscapade";
  collection: "weapons";
  data: any
};
"starrail/EchoesoftheCoffin": {
	id: "starrail/EchoesoftheCoffin";
  collection: "weapons";
  data: any
};
"starrail/EternalCalculus": {
	id: "starrail/EternalCalculus";
  collection: "weapons";
  data: any
};
"starrail/EyesofthePrey": {
	id: "starrail/EyesofthePrey";
  collection: "weapons";
  data: any
};
"starrail/Fermata": {
	id: "starrail/Fermata";
  collection: "weapons";
  data: any
};
"starrail/FinalVictor": {
	id: "starrail/FinalVictor";
  collection: "weapons";
  data: any
};
"starrail/FlamesAfar": {
	id: "starrail/FlamesAfar";
  collection: "weapons";
  data: any
};
"starrail/FlowingNightglow": {
	id: "starrail/FlowingNightglow";
  collection: "weapons";
  data: any
};
"starrail/ForTomorrowsJourney": {
	id: "starrail/ForTomorrowsJourney";
  collection: "weapons";
  data: any
};
"starrail/GeniusesRepose": {
	id: "starrail/GeniusesRepose";
  collection: "weapons";
  data: any
};
"starrail/GoodNightandSleepWell": {
	id: "starrail/GoodNightandSleepWell";
  collection: "weapons";
  data: any
};
"starrail/HeyOverHere": {
	id: "starrail/HeyOverHere";
  collection: "weapons";
  data: any
};
"starrail/IShallBeMyOwnSword": {
	id: "starrail/IShallBeMyOwnSword";
  collection: "weapons";
  data: any
};
"starrail/IVentureForthtoHunt": {
	id: "starrail/IVentureForthtoHunt";
  collection: "weapons";
  data: any
};
"starrail/IncessantRain": {
	id: "starrail/IncessantRain";
  collection: "weapons";
  data: any
};
"starrail/IndeliblePromise": {
	id: "starrail/IndeliblePromise";
  collection: "weapons";
  data: any
};
"starrail/InherentlyUnjustDestiny": {
	id: "starrail/InherentlyUnjustDestiny";
  collection: "weapons";
  data: any
};
"starrail/IntheNameoftheWorld": {
	id: "starrail/IntheNameoftheWorld";
  collection: "weapons";
  data: any
};
"starrail/IntheNight": {
	id: "starrail/IntheNight";
  collection: "weapons";
  data: any
};
"starrail/ItsShowtime": {
	id: "starrail/ItsShowtime";
  collection: "weapons";
  data: any
};
"starrail/LandausChoice": {
	id: "starrail/LandausChoice";
  collection: "weapons";
  data: any
};
"starrail/LongRoadLeadsHome": {
	id: "starrail/LongRoadLeadsHome";
  collection: "weapons";
  data: any
};
"starrail/MaketheWorldClamor": {
	id: "starrail/MaketheWorldClamor";
  collection: "weapons";
  data: any
};
"starrail/MemoriesofthePast": {
	id: "starrail/MemoriesofthePast";
  collection: "weapons";
  data: any
};
"starrail/MomentofVictory": {
	id: "starrail/MomentofVictory";
  collection: "weapons";
  data: any
};
"starrail/NightofFright": {
	id: "starrail/NightofFright";
  collection: "weapons";
  data: any
};
"starrail/NightontheMilkyWay": {
	id: "starrail/NightontheMilkyWay";
  collection: "weapons";
  data: any
};
"starrail/NinjaRecordSoundHunt": {
	id: "starrail/NinjaRecordSoundHunt";
  collection: "weapons";
  data: any
};
"starrail/NinjutsuInscriptionDazzlingEvilbreaker": {
	id: "starrail/NinjutsuInscriptionDazzlingEvilbreaker";
  collection: "weapons";
  data: any
};
"starrail/NowheretoRun": {
	id: "starrail/NowheretoRun";
  collection: "weapons";
  data: any
};
"starrail/OnlySilenceRemains": {
	id: "starrail/OnlySilenceRemains";
  collection: "weapons";
  data: any
};
"starrail/OntheFallofanAeon": {
	id: "starrail/OntheFallofanAeon";
  collection: "weapons";
  data: any
};
"starrail/PastSelfinMirror": {
	id: "starrail/PastSelfinMirror";
  collection: "weapons";
  data: any
};
"starrail/PastandFuture": {
	id: "starrail/PastandFuture";
  collection: "weapons";
  data: any
};
"starrail/PatienceIsAllYouNeed": {
	id: "starrail/PatienceIsAllYouNeed";
  collection: "weapons";
  data: any
};
"starrail/PerfectTiming": {
	id: "starrail/PerfectTiming";
  collection: "weapons";
  data: any
};
"starrail/PlanetaryRendezvous": {
	id: "starrail/PlanetaryRendezvous";
  collection: "weapons";
  data: any
};
"starrail/PoisedtoBloom": {
	id: "starrail/PoisedtoBloom";
  collection: "weapons";
  data: any
};
"starrail/PostOpConversation": {
	id: "starrail/PostOpConversation";
  collection: "weapons";
  data: any
};
"starrail/QuidProQuo": {
	id: "starrail/QuidProQuo";
  collection: "weapons";
  data: any
};
"starrail/ReforgedRemembrance": {
	id: "starrail/ReforgedRemembrance";
  collection: "weapons";
  data: any
};
"starrail/ResolutionShinesAsPearlsofSweat": {
	id: "starrail/ResolutionShinesAsPearlsofSweat";
  collection: "weapons";
  data: any
};
"starrail/ReturntoDarkness": {
	id: "starrail/ReturntoDarkness";
  collection: "weapons";
  data: any
};
"starrail/RiverFlowsinSpring": {
	id: "starrail/RiverFlowsinSpring";
  collection: "weapons";
  data: any
};
"starrail/SailingTowardsaSecondLife": {
	id: "starrail/SailingTowardsaSecondLife";
  collection: "weapons";
  data: any
};
"starrail/ScentAloneStaysTrue": {
	id: "starrail/ScentAloneStaysTrue";
  collection: "weapons";
  data: any
};
"starrail/ShadowedbyNight": {
	id: "starrail/ShadowedbyNight";
  collection: "weapons";
  data: any
};
"starrail/SharedFeeling": {
	id: "starrail/SharedFeeling";
  collection: "weapons";
  data: any
};
"starrail/SheAlreadyShutHerEyes": {
	id: "starrail/SheAlreadyShutHerEyes";
  collection: "weapons";
  data: any
};
"starrail/SleepLiketheDead": {
	id: "starrail/SleepLiketheDead";
  collection: "weapons";
  data: any
};
"starrail/SolitaryHealing": {
	id: "starrail/SolitaryHealing";
  collection: "weapons";
  data: any
};
"starrail/SomethingIrreplaceable": {
	id: "starrail/SomethingIrreplaceable";
  collection: "weapons";
  data: any
};
"starrail/SubscribeforMore": {
	id: "starrail/SubscribeforMore";
  collection: "weapons";
  data: any
};
"starrail/Swordplay": {
	id: "starrail/Swordplay";
  collection: "weapons";
  data: any
};
"starrail/TextureofMemories": {
	id: "starrail/TextureofMemories";
  collection: "weapons";
  data: any
};
"starrail/TheBirthoftheSelf": {
	id: "starrail/TheBirthoftheSelf";
  collection: "weapons";
  data: any
};
"starrail/TheDayTheCosmosFell": {
	id: "starrail/TheDayTheCosmosFell";
  collection: "weapons";
  data: any
};
"starrail/TheMolesWelcomeYou": {
	id: "starrail/TheMolesWelcomeYou";
  collection: "weapons";
  data: any
};
"starrail/TheSeriousnessofBreakfast": {
	id: "starrail/TheSeriousnessofBreakfast";
  collection: "weapons";
  data: any
};
"starrail/TheUnreachableSide": {
	id: "starrail/TheUnreachableSide";
  collection: "weapons";
  data: any
};
"starrail/ThisIsMe": {
	id: "starrail/ThisIsMe";
  collection: "weapons";
  data: any
};
"starrail/ThoseManySprings": {
	id: "starrail/ThoseManySprings";
  collection: "weapons";
  data: any
};
"starrail/TimeWaitsforNoOne": {
	id: "starrail/TimeWaitsforNoOne";
  collection: "weapons";
  data: any
};
"starrail/TodayIsAnotherPeacefulDay": {
	id: "starrail/TodayIsAnotherPeacefulDay";
  collection: "weapons";
  data: any
};
"starrail/TrendoftheUniversalMarket": {
	id: "starrail/TrendoftheUniversalMarket";
  collection: "weapons";
  data: any
};
"starrail/UndertheBlueSky": {
	id: "starrail/UndertheBlueSky";
  collection: "weapons";
  data: any
};
"starrail/WarmthShortensColdNights": {
	id: "starrail/WarmthShortensColdNights";
  collection: "weapons";
  data: any
};
"starrail/WeAreWildfire": {
	id: "starrail/WeAreWildfire";
  collection: "weapons";
  data: any
};
"starrail/WeWillMeetAgain": {
	id: "starrail/WeWillMeetAgain";
  collection: "weapons";
  data: any
};
"starrail/WhatIsReal": {
	id: "starrail/WhatIsReal";
  collection: "weapons";
  data: any
};
"starrail/WhereaboutsShouldDreamsRest": {
	id: "starrail/WhereaboutsShouldDreamsRest";
  collection: "weapons";
  data: any
};
"starrail/WoofWalkTime": {
	id: "starrail/WoofWalkTime";
  collection: "weapons";
  data: any
};
"starrail/WorrisomeBlissful": {
	id: "starrail/WorrisomeBlissful";
  collection: "weapons";
  data: any
};
"starrail/YetHopeIsPriceless": {
	id: "starrail/YetHopeIsPriceless";
  collection: "weapons";
  data: any
};
"starrail/fiveStar_default": {
	id: "starrail/fiveStar_default";
  collection: "weapons";
  data: any
};
"wuwa/AbyssSurges": {
	id: "wuwa/AbyssSurges";
  collection: "weapons";
  data: any
};
"wuwa/AgesofHarvest": {
	id: "wuwa/AgesofHarvest";
  collection: "weapons";
  data: any
};
"wuwa/AmityAccord": {
	id: "wuwa/AmityAccord";
  collection: "weapons";
  data: any
};
"wuwa/Augment": {
	id: "wuwa/Augment";
  collection: "weapons";
  data: any
};
"wuwa/Autumntrace": {
	id: "wuwa/Autumntrace";
  collection: "weapons";
  data: any
};
"wuwa/BlazingBrilliance": {
	id: "wuwa/BlazingBrilliance";
  collection: "weapons";
  data: any
};
"wuwa/Broadblade41": {
	id: "wuwa/Broadblade41";
  collection: "weapons";
  data: any
};
"wuwa/Cadenza": {
	id: "wuwa/Cadenza";
  collection: "weapons";
  data: any
};
"wuwa/CometFlare": {
	id: "wuwa/CometFlare";
  collection: "weapons";
  data: any
};
"wuwa/CommandoofConviction": {
	id: "wuwa/CommandoofConviction";
  collection: "weapons";
  data: any
};
"wuwa/CosmicRipples": {
	id: "wuwa/CosmicRipples";
  collection: "weapons";
  data: any
};
"wuwa/DauntlessEvernight": {
	id: "wuwa/DauntlessEvernight";
  collection: "weapons";
  data: any
};
"wuwa/Discord": {
	id: "wuwa/Discord";
  collection: "weapons";
  data: any
};
"wuwa/EmeraldofGenesis": {
	id: "wuwa/EmeraldofGenesis";
  collection: "weapons";
  data: any
};
"wuwa/Gauntlets21D": {
	id: "wuwa/Gauntlets21D";
  collection: "weapons";
  data: any
};
"wuwa/HeliosCleaver": {
	id: "wuwa/HeliosCleaver";
  collection: "weapons";
  data: any
};
"wuwa/HollowMirage": {
	id: "wuwa/HollowMirage";
  collection: "weapons";
  data: any
};
"wuwa/JinzhouKeeper": {
	id: "wuwa/JinzhouKeeper";
  collection: "weapons";
  data: any
};
"wuwa/Lumingloss": {
	id: "wuwa/Lumingloss";
  collection: "weapons";
  data: any
};
"wuwa/LunarCutter": {
	id: "wuwa/LunarCutter";
  collection: "weapons";
  data: any
};
"wuwa/LustrousRazor": {
	id: "wuwa/LustrousRazor";
  collection: "weapons";
  data: any
};
"wuwa/Marcato": {
	id: "wuwa/Marcato";
  collection: "weapons";
  data: any
};
"wuwa/Novaburst": {
	id: "wuwa/Novaburst";
  collection: "weapons";
  data: any
};
"wuwa/Pistols26": {
	id: "wuwa/Pistols26";
  collection: "weapons";
  data: any
};
"wuwa/Rectifier25": {
	id: "wuwa/Rectifier25";
  collection: "weapons";
  data: any
};
"wuwa/Rime-DrapedSprouts": {
	id: "wuwa/Rime-DrapedSprouts";
  collection: "weapons";
  data: any
};
"wuwa/ScaleSlasher": {
	id: "wuwa/ScaleSlasher";
  collection: "weapons";
  data: any
};
"wuwa/StaticMist": {
	id: "wuwa/StaticMist";
  collection: "weapons";
  data: any
};
"wuwa/StellarSymphony": {
	id: "wuwa/StellarSymphony";
  collection: "weapons";
  data: any
};
"wuwa/Stonard": {
	id: "wuwa/Stonard";
  collection: "weapons";
  data: any
};
"wuwa/Stringmaster": {
	id: "wuwa/Stringmaster";
  collection: "weapons";
  data: any
};
"wuwa/Sword18": {
	id: "wuwa/Sword18";
  collection: "weapons";
  data: any
};
"wuwa/Thunderbolt": {
	id: "wuwa/Thunderbolt";
  collection: "weapons";
  data: any
};
"wuwa/UndyingFlame": {
	id: "wuwa/UndyingFlame";
  collection: "weapons";
  data: any
};
"wuwa/Variation": {
	id: "wuwa/Variation";
  collection: "weapons";
  data: any
};
"wuwa/VerdantSummit": {
	id: "wuwa/VerdantSummit";
  collection: "weapons";
  data: any
};
"wuwa/VeritysHandle": {
	id: "wuwa/VeritysHandle";
  collection: "weapons";
  data: any
};
"zzz/FlamemakerShaker": {
	id: "zzz/FlamemakerShaker";
  collection: "weapons";
  data: any
};
"zzz/StreetSuperstar": {
	id: "zzz/StreetSuperstar";
  collection: "weapons";
  data: any
};
"zzz/TusksofFury": {
	id: "zzz/TusksofFury";
  collection: "weapons";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
