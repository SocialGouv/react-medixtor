import { path } from "ramda";

import AstManager from "../AstManager";

import TREE from "./tree.json";

describe("libs/Ast", () => {
  let astManager;

  beforeEach(() => {
    astManager = new AstManager(TREE);
  });

  test("#getBranchPathAt()", () => {
    const [path, chain] = astManager.getBranchPathAt(45);

    expect(path).toMatchObject(["children", 1, "children", 1]);
    expect(chain).toMatchObject(["paragraph", "strong"]);
  });

  test("#mergeBranchAt() // Previous Sibling", () => {
    const tree = astManager.mergeBranchAt(45);

    expect(path(["children", 1, "children", 0, "value"], tree)).toStrictEqual(
      `This is a paragraph with some bold text`
    );
    expect(path(["children", 1, "children", 1], tree)).toMatchObject(
      path(["children", 1, "children", 2], TREE)
    );
  });
});
