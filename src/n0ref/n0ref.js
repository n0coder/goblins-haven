document.addEventListener("dragover", handleDragOver);
document.addEventListener("drop", handleDrop);
function handleDragOver(event) {
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (const file of files) {
      document.appendChild(new MyImage(file));
      // add the image to the page or do other things with it
    }
  }

  class MyImage {
    constructor(file) {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      this.element = image;
    }
  
    setPosition(x, y) {
      this.element.style.left = x + "px";
      this.element.style.top = y + "px";
    }
  
    setScale(scale) {
      this.element.style.width = scale * 100 + "%";
      this.element.style.height = scale * 100 + "%";
    }
  }
  