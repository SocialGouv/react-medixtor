import PropTypes from "prop-types";
import React from "react";

import Editor from "./components/Editor";
import joinClassNames from "./helpers/joinClassNames";

import "./index.css";

const DEFAULT_PROPS = {
  className: "",
  editorClassName: "",
  editorStyle: {},
  isSingleView: false,
  noEditor: false,
  noPreview: false,
  previewClassName: "",
  previewStyle: {},
  singleViewDefault: "preview",
  style: {}
};

class Medixtor extends React.Component {
  constructor(props) {
    super(props);

    const { singleViewDefault } = { ...DEFAULT_PROPS, ...props };

    this.state = {
      jsx: null,
      singleViewCurrent: singleViewDefault
    };
  }

  onChange(output) {
    this.setState({ jsx: output.jsx });

    const { onChange } = this.props;
    if (onChange === undefined) return;

    onChange(output);
  }

  onToggleSingleView() {
    const { singleViewCurrent } = this.state;

    this.setState({
      singleViewCurrent: singleViewCurrent === "preview" ? "editor" : "preview"
    });
  }

  render() {
    const {
      className,
      defaultValue,
      disabled,
      editorClassName,
      editorStyle,
      isSingleView,
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
    const { jsx, singleViewCurrent } = this.state;

    const classNames = ["container"];
    if (isSingleView) {
      classNames.push("container--vertical");
    }
    if (className.length !== 0) classNames.push(className);

    const previewClassNames = ["preview"];
    if (noEditor || (isSingleView && singleViewCurrent === "preview")) {
      previewClassNames.push("preview--alone");
    }
    if (previewClassName.length !== 0) previewClassNames.push(previewClassName);

    return (
      <div className={joinClassNames(classNames)} style={style}>
        <Editor
          className={editorClassName}
          defaultValue={defaultValue}
          disabled={disabled}
          isHidden={noEditor || (isSingleView && singleViewCurrent === "preview")}
          isSingleView={isSingleView}
          onChange={this.onChange.bind(this)}
          onToggleSingleView={this.onToggleSingleView.bind(this)}
          singleViewCurrent={singleViewCurrent}
          spellCheck={!noSpellCheck}
          style={editorStyle}
        />
        {!(noPreview || (isSingleView && singleViewCurrent === "editor")) && (
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
  isSingleView: PropTypes.bool,
  onChange: PropTypes.func,
  noEditor: PropTypes.bool,
  noPreview: PropTypes.bool,
  previewStyle: PropTypes.object,
  previewClassName: PropTypes.string,
  noSpellCheck: PropTypes.bool,
  singleViewDefault: PropTypes.string,
  style: PropTypes.object
};

export default Medixtor;
