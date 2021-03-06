import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import json from "rollup-plugin-json";
import livereload from "rollup-plugin-livereload";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import postcssUrl from "postcss-url";

const { NODE_ENV } = process.env;

export default {
  input: "src/index.js",

  output: [
    {
      file: "./dist/index.js",
      format: "umd",
      name: "Medixtor",
      globals: {
        react: "React"
      }
    }
  ],

  external: ["react", "react-dom"],

  plugins: [
    postcss({
      minimize: NODE_ENV !== "development",
      plugins: [postcssUrl({ url: "inline" })]
    }),
    // Externalize peer dependencies:
    peerDepsExternal(),
    // Import JSON files:
    json(),
    // Transpile Babel to ES6:
    babel({ exclude: "./node_modules" }),
    // Convert CommonJS dependencies to ES2015:
    commonjs(),
    // Shim node.js globals:
    nodeGlobals(),
    // Shim node.js built-in libraries:
    nodeBuiltins(),
    // Locate dependencies via node.js resolution algorithm:
    nodeResolve(),
    // Calculate output bundle size:
    filesize(),
    // Copy typings definitions:
    copy({
      targets: [{ src: "./src/index.d.ts", dest: "./dist" }]
    }),
    ...(NODE_ENV !== "development"
      ? [
          // Minify source:
          terser(),
          // Calculate output bundle size:
          filesize()
        ]
      : [
          // Serve ./index.html:
          serve(),
          // Enable reload:
          livereload({
            watch: "./dist"
          })
        ])
  ],

  // Silence "Cirular dependency" warnings:
  onwarn(warning, rollupWarn) {
    if (warning.code !== "CIRCULAR_DEPENDENCY") rollupWarn(warning);
  }
};
