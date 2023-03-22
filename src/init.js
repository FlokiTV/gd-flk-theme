if (!window.FLK) {
  window.FLK = {};
  console.log("Loaded FLK");
} else {
  console.log("Reloaded FLK");
  clearInterval(FLK.animationID);
  let els = document.querySelectorAll("[flk-init]");
  for (let i = 0; i < els.length; i++) {
    /** @type {HTMLElement} */
    const element = els[i];
    element.removeAttribute("flk-init");
  }
}

window.FLK = {};
FLK.lastTime = 0;
FLK.z = 99;
FLK.canvasEditor = null;
FLK.mosaicEditor = null;
FLK.mosaicRoot = document.querySelector("#root");
