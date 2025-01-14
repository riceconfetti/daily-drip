import * as fs from "node:fs";
import updates from "../src/pages/_updates.json" with { type: "json" };
import complete from "../src/pages/_complete.json" with { type: "json" };
import directus from "../src/services/directus.ts";
import { updateItem } from "@directus/sdk";

const temp = `[
    {
    "id": "tempChar",
    "focalPoint": {
        "x": 0.5,
        "y": 0.3
    },
    "crop": {
        "x": 0.8,
        "y": 0.8
    }
}]`;

updates.forEach(async (c) => {
  const { id: _, ...data } = c;
  await directus.request(updateItem("characters", c.id, data));
});

const newComplete = [...new Set(complete.concat(updates.map((c) => c.id)))];

fs.writeFileSync(
  "./src/pages/_complete.json",
  JSON.stringify(newComplete, null, 2),
);
fs.writeFileSync("./src/pages/_updates.json", temp);
