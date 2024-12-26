const words = [
  ["Love", 12, "peterthehan"],
  ["Liebe", 5, "peterthehan"],
  ["ፍቅር", 5, "peterthehan"],
  ["Lufu", 5, "peterthehan"],
  ["Aimor", 5, "peterthehan"],
  ["Amor", 5, "peterthehan"],
  ["Heyran", 5, "peterthehan"],
  ["ভালোবাসা", 5, "peterthehan"],
  ["Каханне", 5, "peterthehan"],
  ["Любоў", 5, "peterthehan"],
  ["Любов", 5, "peterthehan"],
  ["བརྩེ་དུང་།", 5, "peterthehan"],
  ["Ljubav", 5, "peterthehan"],
  ["Karantez", 5, "peterthehan"],
  ["Юрату", 5, "peterthehan"],
  ["Láska", 5, "peterthehan"],
  ["Amore", 5, "peterthehan"],
  ["Cariad", 5, "peterthehan"],
  ["Kærlighed", 5, "peterthehan"],
  ["Armastus", 5, "peterthehan"],
  ["Αγάπη", 5, "peterthehan"],
  ["Amo", 5, "peterthehan"],
  ["Amol", 5, "peterthehan"],
  ["Maitasun", 5, "peterthehan"],
  ["Pyar", 5, "peterthehan"],
  ["Amour", 5, "peterthehan"],
  ["Leafde", 5, "peterthehan"],
  ["Gràdh", 5, "peterthehan"],
  ["愛", 5, "peterthehan"],
  ["爱", 5, "peterthehan"],
  ["પ્રેમ", 5, "peterthehan"],
  ["사랑", 5, "peterthehan"],
];

const drawWordCloud = () => {
  if (!WordCloud.isSupported) {
    console.log("WordCloud not supported");
    return;
  }

  const originalWords = words.map((x) => ({ word: x[0], count: x[1] }));

  const wordCloudCanvas = document.getElementById("word-cloud-canvas");
  const wordCloudHtml = document.getElementById("word-cloud-html");
  const elements = [wordCloudCanvas, wordCloudHtml];
  const options = {
    list: words,
    gridSize: 12,
    weightFactor: 12,
    minSize: 6,
    color: function (word, ...data) {
      return data[data.length - 1][0] === "peterthehan" ? "#ba8e23" : "#b22222";
    },
    backgroundColor: "#ffe0e0",
    fontFamily: "Times, serif",
    shape: "square",
    rotateRatio: 0.5,
    rotationSteps: 2,
    classes: "word-cloud-item",
    click: (item, dimension, event) => {
      // We lookup the original item to get the accurate count
      // because the 'shrinkToFit' option changes the count to fit the word
      const originalItem = originalWords.find((x) => x.word === item[0]);
      alert(`${originalItem.word}: ${originalItem.count}`);
    },
  };

  WordCloud(elements, options);

  // We have to add our own click handler to the HTML-based version
  // because the library only handles clicks on the canvas-based version
  wordCloudCanvas.addEventListener("wordcloudstop", function (e) {
    document.querySelectorAll(".word-cloud-item").forEach(function (element) {
      element.addEventListener("click", (event) => {
        const originalItem = originalWords.find(
          (x) => x.word === element.textContent
        );
        alert(`${originalItem.word}: ${originalItem.count}`);
      });
    });
  });
};

document
  .getElementById("redrawButton")
  .addEventListener("click", drawWordCloud);

drawWordCloud();
