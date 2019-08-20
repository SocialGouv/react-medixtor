import { assocPath, dissocPath, path, pipe } from "ramda";

export default class AstManager {
  get tree() {
    return this._tree;
  }

  constructor(tree) {
    this._tree = tree;
  }

  getBranchAt(position) {
    const [branchPath, blocksChain] = this.getBranchPathAt(position);
    const node = path(branchPath, this._tree);

    return {
      branchPath,
      blocksChain,
      node
    };
  }

  getBranchPathAt(position, branch = this._tree, path = [], chain = []) {
    if (branch.children === undefined) return [path, chain];

    const childBranchIndex = branch.children.findIndex(
      ({ position: { start, end } }) =>
        start.offset <= position && end.offset >= position
    );
    if (childBranchIndex === -1) return [path, chain];

    const childBranch = branch.children[childBranchIndex];
    if (childBranch.type === "text") return [path, chain];

    const newPath = [...path, ...["children", childBranchIndex]];
    const newChain = [...chain, childBranch.type];

    return this.getBranchPathAt(position, childBranch, newPath, newChain);
  }

  mergeBranchAt(position) {
    const [branchPath] = this.getBranchPathAt(position);
    const parentBranchPath = branchPath.slice(0, branchPath.length - 2);

    const branch = path(branchPath, this._tree);
    if (branch.type === "text") return { ...this._tree };

    const branchIndex = branchPath[branchPath.length - 1];
    if (branchIndex === 0) {
      const parentBranch = path(parentBranchPath, this._tree);
      const newTree = pipe(
        parentBranch.children.length === 0
          ? dissocPath([...parentBranch, "children"])
          : dissocPath([...parentBranch, "children", 0]),
        assocPath(
          [...parentBranch, "value"],
          `${parentBranch.value}${branch.children[0].value}`
        )
      )(this._tree);

      return newTree;
    }

    const previousSiblingBranchPath = [
      ...branchPath.slice(0, branchPath.length - 1),
      branchIndex - 1
    ];
    const previousSiblingBranch = path(previousSiblingBranchPath, this._tree);
    if (previousSiblingBranch.type === "text") {
      const newTree = pipe(
        dissocPath(branchPath),
        assocPath(
          [...previousSiblingBranchPath, "value"],
          `${previousSiblingBranch.value}${branch.children[0].value}`
        )
      )(this._tree);

      return newTree;
    }
  }
}
