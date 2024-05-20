const fs = require("fs");

fs.readFile("./characters.json", "utf8", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  let characters = JSON.parse(data);

  characters.forEach((c) => {
    let name = c.name.toLowerCase().replace(/[^A-Z0-9]+/gi, "");
    fs.writeFile(
      "./src/content/characters/" + name + ".json",
      JSON.stringify(c),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
});
