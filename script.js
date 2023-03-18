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

const root = document.querySelector(".mosaic-root");

function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  FLK.x = e.clientX;
  FLK.y = e.clientY;
}

document.onmousemove = elementDrag;

FLK.loop = (delta) => {
  FLK.mosaics = document.querySelectorAll(".mosaic-tile"); // populate mosaics
  let splits = document.querySelectorAll(".mosaic-split");

  for (let i = 0; i < splits.length; i++) {
    const element = splits[i];
    element.setAttribute("style", "display:hidden");
  }

  if (!FLK.mosaics) return;
  for (let i = 0; i < FLK.mosaics.length; i++) {
    const mosaic = FLK.mosaics[i];
    /** @type {HTMLElement} */
    let editor = mosaic.querySelector("canvas"); // find canvas editor
    if (editor) {
      FLK.canvasEditor = editor;
      FLK.mosaicEditor = mosaic;
      let styl = mosaic.getAttribute("style");
      styl = `
      inset:0;
      width:100%;
      height:100%;
      `;
      mosaic.setAttribute("style", styl);
    } else {
      let styl = mosaic.getAttribute("style");
      styl = `
      position: fixed;
      inset:0;
      width:250px;
      height:350px;
      `;
      /*
        Setup mouse events
      */
      /** @type {HTMLElement} */
      let drag = mosaic.querySelector(".draggable");
      if (drag)
        if (!drag.hasAttribute("flk-init")) {
          console.log("flk-init", "true");
          drag.setAttribute("flk-init", "true");
          FLK.dragElement(mosaic, drag);
        } else {
          let x = mosaic.getAttribute("data-x");
          let y = mosaic.getAttribute("data-y");
          let z = mosaic.getAttribute("data-z") || 100;
          styl += `top: ${y}px;left: ${x}px; z-index: ${z};`;
        }
      /*
        Set Style
      */
      mosaic.setAttribute("style", styl);
    }
  }
};

FLK.dragElement = (mosaic, elmnt) => {
  elmnt.onmousedown = dragMouseDown;
  elmnt.onmousemove = dragMouseMove;
  elmnt.onmouseup = dragMouseUp;
  let offsetX, offsetY;
  function dragMouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    if (elmnt.hasAttribute("data-active")) {
      let posX = FLK.x - offsetX;
      let posY = FLK.y - offsetY;
      mosaic.setAttribute("data-x", posX);
      mosaic.setAttribute("data-y", posY);
      /** @type {string} */
      let stl = mosaic.getAttribute("style");
      stl = stl.split(";");
      let stly = {};
      for (let i = 0; i < stl.length; i++) {
        const element = stl[i];
        let s = element.split(":");
        if (s.length > 1) {
          stly[s[0].trim()] = s[1].trim();
        }
      }
      stly.top = posY + "px";
      stly.left = posX + "px";
      let str = ""
      for (const key in stly) {
        str += `${key}:${stly[key]};`
      }
      mosaic.setAttribute("style", str);
    }
  }
  function dragMouseUp(e) {
    elmnt.removeAttribute("data-active");
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    elmnt.setAttribute("data-active", "true");
    mosaic.setAttribute("data-z", FLK.z++);
    let rect = elmnt.getBoundingClientRect();
    offsetX = FLK.x - rect.left;
    offsetY = FLK.y - rect.top;
  }
};

FLK.animate = (timestamp) => {
  const deltaTime = timestamp - FLK.lastTime;
  FLK.lastTime = timestamp;
  FLK.loop(deltaTime);
  requestAnimationFrame(FLK.animate);
};

FLK.animationID = requestAnimationFrame(FLK.animate);
