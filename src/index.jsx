import PropTypes from "prop-types";
import React from "react";
import remarkParse from "remark-parse";
import remarkReact from "remark-react";
import showdown from "showdown";
import unified from "unified";

import joinClassNames from "./helpers/joinClassNames";

import "./index.css";

const DEFAULT_PROPS = {
  className: "",
  disabled: false,
  editorClassName: "",
  editorStyle: {},
  noEditor: false,
  noPreview: false,
  noSpellCheck: false,
  previewClassName: "",
  previewStyle: {},
  style: {}
};

const showdownConverter = new showdown.Converter();

class Medixtor extends React.Component {
  constructor(props) {
    super(props);

    const { defaultValue } = props;
    this.defaultValue = defaultValue !== undefined ? defaultValue : "";

    const jsx = this.convertMarkdownToJsx(this.defaultValue);
    this.state = {
      jsx
    };
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

    this.setState({ jsx });

    if (onChange !== undefined) {
      onChange({
        html,
        jsx,
        source,
        rawSource: value
      });
    }
  }

  render() {
    const { defaultValue } = this;
    const { jsx } = this.state;
    const {
      className,
      disabled,
      editorClassName,
      editorStyle,
      noEditor,
      noPreview,
      noSpellCheck,
      previewClassName,
      previewStyle,
      style
    } = {
      ...DEFAULT_PROPS,
      ...this.props
    };

    const editorClassNames = ["editor"];
    if (noPreview && !noEditor) editorClassNames.push("editor--alone");
    if (editorClassName.length !== 0) editorClassNames.push(editorClassName);

    const previewClassNames = ["preview"];
    if (noEditor && !noPreview) previewClassNames.push("preview--alone");
    if (previewClassName.length !== 0) previewClassNames.push(previewClassName);

    return (
      <div className={`container ${className}`} style={style}>
        {!noEditor && (
          <textarea
            className={joinClassNames(editorClassNames)}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            ref={node => (this.$editor = node)}
            spellCheck={!noSpellCheck}
            style={editorStyle}
          />
        )}
        {!noPreview && (
          <div className={joinClassNames(previewClassNames)} style={previewStyle}>
            {jsx}
          </div>
        )}
      </div>
    );
  }
}

Medixtor.propTypes = {
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

export default Medixtor;
