import remarkParse from "remark-parse";
import remarkReact from "remark-react";
import remarkStringify from "remark-stringify";
import unified from "unified";

import AstManager from "./AstManager";

export default class Markdown {
  get ast() {
    return this._ast;
  }

  get jsx() {
    return unified()
      .use(remarkReact)
      .stringify(this._ast);
  }

  get source() {
    return this._source;
  }

  get currentNode() {
    return this._currentNode;
  }

  set currentPosition(value) {
    this._currentPosition = value;

    this.updateCurrentNode();
  }

  set source(value) {
    this._rawSource = this.lintSource(value);

    this.updateAst();
    this.updateSource();
    this.updateCurrentNode();
  }

  constructor() {
    this._ast = null;
    this._currentNode = null;
    this._currentPosition = -1;
    this._source = "";
  }

  lintSource(source) {
    return unified()
      .use(remarkParse)
      .use(remarkStringify, {
        bullet: "-",
        emphasis: "_",
        listItemIndent: "1",
        strong: "*"
      })
      .processSync(source)
      .contents.trim();
  }

  updateAst() {
    this._ast = unified()
      .use(remarkParse)
      .parse(this._rawSource);

    this._astManager = new AstManager(this._ast);
  }

  updateCurrentNode() {
    if (this._currentPosition === -1) return;

    this._currentNode = this._astManager.getBranchAt(this._currentPosition);
  }

  updateSource() {
    this._currentNode = null;
    this._currentPosition = -1;
    this._source = unified()
      .use(remarkStringify, {
        bullet: "-",
        emphasis: "_",
        listItemIndent: "1",
        strong: "*"
      })
      .stringify(this._ast)
      .trim();
  }
}
