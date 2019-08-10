import PropTypes from "prop-types";
import React from "react";
import remarkParse from "remark-parse";
import remarkReact from "remark-react";
import showdown from "showdown";
import unified from "unified";

import "./Editor.css";

const showdownConverter = new showdown.Converter();

class Editor extends React.Component {
  constructor(props) {
    super(props);

    const { defaultValue } = props;
    this.defaultValue = defaultValue !== undefined ? defaultValue : "";
  }

  customizeMarkdown(source) {
    const { headersOffset = 1 } = this.props;
    if (headersOffset === 1) return source;

    return source.replace(/^\s*(#+)/gm, `$1${"#".repeat(headersOffset - 1)}`);
  }

  normalizeMarkdown(source) {
    return source.trim();
  }

  convertMarkdownToHtml(source) {
    const customSource = this.customizeMarkdown(source);

    return showdownConverter.makeHtml(customSource);
  }

  convertMarkdownToJsx(source) {
    const customSource = this.customizeMarkdown(source);

    return unified()
      .use(remarkParse)
      .use(remarkReact)
      .processSync(customSource).contents;
  }

  onChange() {
    const { onChange } = this.props;
    const { value } = this.$editor;
    const html = this.convertMarkdownToHtml(value);
    const jsx = this.convertMarkdownToJsx(value);
    const source = this.normalizeMarkdown(value);

    onChange({
      html,
      jsx,
      source,
      rawSource: value
    });
  }

  render() {
    const { defaultValue } = this;
    const {
      className = "",
      disabled = false,
      noSpellCheck = false,
      style = {}
    } = this.props;

    return (
      <textarea
        className={`editor ${className}`}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={this.onChange.bind(this)}
        ref={node => (this.$editor = node)}
        spellCheck={!noSpellCheck}
        style={style}
      />
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
