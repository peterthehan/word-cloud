const fs = require("fs");
const path = require("path");

function writeFile(data, filename) {
  const filePath = path.join(__dirname, `./${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  console.log(`${filename} JSON file created at:`, filePath);
}

const filePath = path.join(__dirname, "./stop-words.json");
const stopWords = new Set(JSON.parse(fs.readFileSync(filePath, "utf8")));

function isValid(token) {
  return !stopWords.has(token) && !token.startsWith("http") && isNaN(token);
}

const dataDir = path.join(__dirname, "../data");

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const combinedData = files
    .filter((file) => path.extname(file) === ".json")
    .flatMap((file) => {
      const filePath = path.join(dataDir, file);
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    });
  writeFile(combinedData, "combined");

  const parsedData = combinedData.map((item) => ({
    content: item.content,
    author: item.author.username,
  }));
  writeFile(parsedData, "parsed");

  const wordCounts = {};
  parsedData.forEach(({ content, author }) => {
    const words = content
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^0-9a-z :・]/gi, "")
      .trim()
      .toLowerCase();

    if (words !== "") {
      const tokens = words.split(/\s+/);
      tokens.forEach((token) => {
        if (isValid(token)) {
          const key = `${token}|${author}`;
          if (!(key in wordCounts)) {
            wordCounts[key] = { token, count: 0, author };
          }
          ++wordCounts[key].count;
        }
      });
    }
  });
  const wordArray = Object.values(wordCounts)
    .filter(({ count }) => count >= 32)
    .sort((a, b) => b.count - a.count)
    .map(({ token, count, author }) => [token, count, author]);
  writeFile(wordArray, "words");
});
