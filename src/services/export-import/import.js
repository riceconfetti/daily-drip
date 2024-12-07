import attributesJSON from "./attributes.json" assert { type: "json" };
import fs from "node:fs";

let attributes = attributesJSON.reduce((a, v) => {
  let id = v.name;
  delete v.name;
  return { ...a, [id]: v };
}, {});

let file = fs.readFileSync();
