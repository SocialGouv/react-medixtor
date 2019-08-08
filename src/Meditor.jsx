import PropTypes from "prop-types";
import React from "react";
import remarkParse from "remark-parse";
import remarkReact from "remark-react";
import showdown from "showdown";
import unified from "unified";

const STYLES = {
  CONTAINER: {
    border: "solid 1px gray",
    boxSizing: "border-box",
    display: "flex",
    flexGrow: 1,
    height: "100%",
    width: "100%"
  },
  EDITOR: {
    backgroundColor: "white",
    border: 0,
    borderRight: "solid 1px lightgray",
    color: "darkgray",
    flexGrow: 1,
    fontFamily: "monospace",
    maxWidth: "50%",
    padding: "1rem",
    width: "50%"
  },
  PREVIEW: {
    flexGrow: 1,
    maxWidth: "50%",
    padding: "1rem",
    width: "50%"
  }
};

const showdownConverter = new showdown.Converter();

class Meditor extends React.Component {
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
    const {
      disabled = false,
      editorStyle,
      noEditor = false,
      noPreview = false,
      noSpellCheck = false,
      previewStyle,
      style
    } = this.props;
    const { jsx } = this.state;

    return (
      <div style={{ ...STYLES.CONTAINER, ...style }}>
        {!noEditor && (
          <textarea
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            ref={node => (this.$editor = node)}
            spellCheck={!noSpellCheck}
            style={{ ...STYLES.EDITOR, ...editorStyle }}
          />
        )}
        {!noPreview && (
          <div style={{ ...STYLES.PREVIEW, ...previewStyle }}>{jsx}</div>
        )}
      </div>
    );
  }
}

Meditor.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  editorStyle: PropTypes.object,
  headersOffset: PropTypes.number,
  onChange: PropTypes.func,
  noEditor: PropTypes.bool,
  noPreview: PropTypes.bool,
  previewStyle: PropTypes.object,
  noSpellCheck: PropTypes.bool,
  style: PropTypes.object
};

export default Meditor;
