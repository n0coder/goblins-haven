/** @type {import('vite').UserConfig} */
export default {
  base: '/',
  assetsDir: 'assets',
  outDir: 'end',
  entry: 'src/p5sketch.js',
  define: {
    p5: "window.p5",
    JSZip: "window.JSZip"
  }
}