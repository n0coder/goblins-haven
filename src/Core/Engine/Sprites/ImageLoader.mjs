export function loadImage(src, callback) {
    const img = new Image();
    img.onload = () => {
      callback(img);
    };
    img.src = src;
  }
  