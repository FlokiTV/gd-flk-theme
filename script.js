const loop = delta =>{
  console.log(delta)
}

let lastTime = 0;
function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  loop(deltaTime)
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

let mosaics = document.querySelectorAll(".mosaic-tile");
let canvasEditor = null;

for (let i = 0; i < mosaics.length; i++) {
  const element = mosaics[i];
  let editor = element.querySelector("canvas")
  if(editor){
    canvasEditor = editor;
  }
}

