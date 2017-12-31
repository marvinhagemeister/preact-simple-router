import filesize from "rollup-plugin-filesize";
import uglify from "rollup-plugin-uglify-es";

export default {
  input: "./dist/es/index.js",
  output: {
    file: "./dist/browser.js",
    format: "es",
    name: "Router",
    globals: { preact: "preact" },
  },
  plugins: [uglify(), filesize()],
  external: ["preact"],
};
