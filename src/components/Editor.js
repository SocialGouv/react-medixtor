import PropTypes from "prop-types";
import React from "react";
import debounce from "debounce";

import EditorMenu from "./EditorMenu";
import EditorStatus from "./EditorStatus";
import joinClassNames from "../helpers/joinClassNames";
import Markdown from "../libs/Markdown";
import addSelectionChangeEvent from "../polyfills/addSelectionChangeEvent";

import "./Editor.css";

const DEFAULT_PROPS = {
  className: "",
  defaultValue: "",
  disabled: false,
  noSpellCheck: false,
  style: {}
};

class Editor extends React.Component {
  constructor(props) {
    super(props);

    const { defaultValue } = { ...DEFAULT_PROPS, ...props };
    this.markdown = new Markdown();
    // This will lint the `defaultValue` Markdown source:
    this.markdown.source = defaultValue;
    this.defaultValue = this.markdown.source;

    this.onChange = debounce(this._onChange.bind(this), 250);
    this.onSelectionChange = debounce(this._onSelectionChange.bind(this), 250);

    this.state = {
      editorKey: 0,
      menuEnabled: [],
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
    this.$textarea.addEventListener("selectionChange", this.onSelectionChange.bind(this));
  }

  _onSelectionChange(event) {
    this.markdown.currentPosition = event.selectionCaret;
    const currentNode = this.markdown.currentNode;

    const selectionStatus = {
      blocksChain: currentNode.blocksChain,
      column: event.selectionCaretX + 1,
      line: event.selectionCaretY + 1
    };

    this.setState({ selectionStatus });
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
      case "preview":
        this.setState({ isPreviewElseEditor: !this.state.isPreviewElseEditor });
        break;
    }

    this.defaultValue = this.markdown.source;

    this.setState({
      editorKey: this.state.editorKey + 1,
      menuEnabled: []
    });

    this.onChange();
  }

  render() {
    const { defaultValue } = this;
    const {
      className,
      disabled,
      isHidden,
      isSingleView,
      noSpellCheck,
      onToggleSingleView,
      singleViewCurrent,
      style: customStyle
    } = {
      ...DEFAULT_PROPS,
      ...this.props
    };
    const { editorKey, menuEnabled, selectionStatus } = this.state;

    const containerClassNames = ["editor-container"];
    if (isSingleView) containerClassNames.push("editor-container--alone");
    const containerStyle =
      isSingleView && singleViewCurrent === "preview" ? { flexGrow: "unset" } : {};
    const style = isHidden ? { ...customStyle, display: "none" } : customStyle;

    return (
      <div className={joinClassNames(containerClassNames)} style={containerStyle}>
        <EditorMenu
          enabled={menuEnabled}
          isSingleView={isSingleView}
          onClick={this.onMenuClick.bind(this)}
          onToggleSingleView={onToggleSingleView}
          singleViewCurrent={singleViewCurrent}
        />
        <textarea
          className={joinClassNames(["editor", className])}
          defaultValue={defaultValue}
          disabled={disabled}
          id={String(editorKey)}
          key={String(editorKey)}
          onChange={this.onChange.bind(this)}
          ref={this.attachRef.bind(this)}
          spellCheck={!noSpellCheck}
          style={style}
        />
        {!isHidden && <EditorStatus selectionStatus={selectionStatus} />}
      </div>
    );
  }
}

Editor.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  isSingleView: PropTypes.bool,
  onChange: PropTypes.func,
  onToggleSingleView: PropTypes.func,
  noSpellCheck: PropTypes.bool,
  singleViewCurrent: PropTypes.string,
  style: PropTypes.object
};

export default Editor;
