let mosaics = document.querySelectorAll(".mosaic-tile");
let canvasEditor = null;

for (let i = 0; i < mosaics.length; i++) {
  const element = mosaics[i];
  console.log(element.querySelector("canvas"));
}