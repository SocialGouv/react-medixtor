import { path } from "ramda";

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
      ({ position: { start, end } }) => start.offset <= position && end.offset >= position
    );
    if (childBranchIndex === -1) return [path, chain];

    const childBranch = branch.children[childBranchIndex];
    if (childBranch.type === "text") return [path, chain];

    const newPath = [...path, ...["children", childBranchIndex]];
    const newChain = [...chain, childBranch.type];

    return this.getBranchPathAt(position, childBranch, newPath, newChain);
  }
}
