import PropTypes from "prop-types";
import React from "react";
import debounce from "debounce";

import addSelectionChangeEvent from "../polyfills/addSelectionChangeEvent";
import EditorMenu from "./EditorMenu";
import EditorStatus from "./EditorStatus";
import Markdown from "../libs/Markdown";

import "./Editor.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    const { defaultValue = "" } = props;
    this.markdown = new Markdown();
    // This will lint the `defaultValue` Markdown source:
    this.markdown.source = defaultValue;
    this.defaultValue = this.markdown.source;

    this.onChange = debounce(this._onChange.bind(this), 250);
    this.onSelectionChange = debounce(this._onSelectionChange.bind(this), 250);

    this.state = {
      editorKey: 0,
      menuEnabled: [],
      menuHighlighted: [],
      selectionStatus: null
    };
  }

  componentDidMount() {
    const { onChange } = this.props;

    // Trigger onChange() to load the first JSX into preview:
    onChange({
      ast: this.markdown.ast,
      jsx: this.markdown.jsx,
      source: this.markdown.source
    });
  }

  attachRef($textarea) {
    if (
      this.$textarea !== undefined &&
      ($textarea === null || $textarea.id === this.$textarea.id)
    ) {
      return;
    }

    addSelectionChangeEvent($textarea);
    this.$textarea = $textarea;
    this.$textarea.addEventListener(
      "selectionChange",
      this.onSelectionChange.bind(this)
    );
  }

  _onSelectionChange(event) {
    this.markdown.currentPosition = event.selectionCaret;
    const currentNode = this.markdown.currentNode;

    const selectionStatus = {
      blocksChain: currentNode.blocksChain,
      column: event.selectionCaretX + 1,
      line: event.selectionCaretY + 1
    };

    const menuHighlighted = [
      "emphasis",
      "heading",
      "link",
      "strong",
      "table"
    ].filter(block => currentNode.blocksChain.includes(block));
    const menuEnabled = [...menuHighlighted];

    this.setState({ menuEnabled, menuHighlighted, selectionStatus });
  }

  _onChange() {
    const { onChange } = this.props;
    const { value } = this.$textarea;
    this.markdown.source = value;

    onChange({
      ast: this.markdown.ast,
      jsx: this.markdown.jsx,
      source: this.markdown.source
    });
  }

  onMenuClick(label) {
    switch (label) {
      case "emphasis":
      case "link":
      case "strong":
        this.markdown.toggleCurrentNode();
        break;
    }

    this.defaultValue = this.markdown.source;

    this.setState({
      editorKey: this.state.editorKey + 1,
      menuEnabled: [],
      menuHighlighted: []
    });

    this.onChange();
  }

  render() {
    const { defaultValue } = this;
    const {
      className = "",
      disabled = false,
      noSpellCheck = false,
      style = {}
    } = this.props;
    const {
      editorKey,
      menuEnabled,
      menuHighlighted,
      selectionStatus
    } = this.state;

    return (
      <div className="editor-container">
        <EditorMenu
          enabled={menuEnabled}
          highlighted={menuHighlighted}
          onClick={this.onMenuClick.bind(this)}
        />
        <textarea
          className={`editor ${className}`}
          defaultValue={defaultValue}
          disabled={disabled}
          id={String(editorKey)}
          key={String(editorKey)}
          onChange={this.onChange.bind(this)}
          ref={this.attachRef.bind(this)}
          spellCheck={!noSpellCheck}
          style={style}
        />
        <EditorStatus selectionStatus={selectionStatus} />
      </div>
    );
  }
}

Editor.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  editorClassName: PropTypes.string,
  editorStyle: PropTypes.object,
  headersOffset: PropTypes.number,
  onChange: PropTypes.func,
  noEditor: PropTypes.bool,
  noPreview: PropTypes.bool,
  previewStyle: PropTypes.object,
  previewClassName: PropTypes.string,
  noSpellCheck: PropTypes.bool,
  style: PropTypes.object
};

export default Editor;
