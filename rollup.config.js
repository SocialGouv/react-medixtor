import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import localResolve from "rollup-plugin-local-resolve";

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
    peerDepsExternal(),
    babel({ exclude: "./node_modules" }),
    localResolve(),
    resolve(),
    commonjs()
  ]
};
