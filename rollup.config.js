import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import json from "rollup-plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/Meditor.jsx",

  output: [
    {
      file: "./dist/index.js",
      format: "umd",
      name: "Meditor",
      globals: {
        react: "React"
      }
    }
  ],

  external: ["react", "react-dom"],

  plugins: [
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
    filesize()
  ]
};
