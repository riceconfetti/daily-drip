import serverJSON from "./servers.json";

export interface Settings {
  [game: string]: any;
  genshin: any;
  starrail: any;
  wuwa: any;
  zzz: any;
}

export const settings: Settings = $state({
  genshin: "America",
  starrail: "America",
  wuwa: "America",
  zzz: "America",
});

const servers = $derived.by(() => {
  return Object.keys(settings).map((key) => {
    let value = serverJSON.find(
      (s) => s.game == key && s.name == settings[key],
    );
    return { key: key, value: value };
  });
});

const getServers = () => servers;

//@ts-ignore
export const getServer = (game) => {
  return getServers().find((x) => x.key == game);
};
