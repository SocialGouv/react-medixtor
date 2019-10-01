import PropTypes from "prop-types";
import React from "react";

import "../../node_modules/remixicon/fonts/remixicon.css";
import "./EditorMenu.css";

const DEFAULT_PROPS = {
  enabled: [],
  highlighted: [],
  isSingleView: false,
  onClick: () => void 0,
  onToggleSingleView: () => void 0,
  singleViewCurrent: "preview"
};

class EditorMenu extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { enabled, highlighted, isSingleView, onClick, onToggleSingleView, singleViewCurrent } = {
      ...DEFAULT_PROPS,
      ...this.props
    };

    return (
      <div className="editor-menu-container">
        <div className="editor-menu-left">
          {/* <button
            className={highlighted.includes("heading") ? "highlighted" : ""}
            disabled={!enabled.includes("heading")}
            onClick={() => onClick("heading")}
          >
            <i className="ri-heading" />
          </button>
          <button
            className={highlighted.includes("strong") ? "highlighted" : ""}
            disabled={!enabled.includes("strong")}
            onClick={() => onClick("strong")}
          >
            <i className="ri-bold" />
          </button>
          <button
            className={highlighted.includes("emphasis") ? "highlighted" : ""}
            disabled={!enabled.includes("emphasis")}
            onClick={() => onClick("emphasis")}
          >
            <i className="ri-italic" />
          </button>
          <i className="separator" />
          <button
            className={highlighted.includes("link") ? "highlighted" : ""}
            disabled={!enabled.includes("link")}
            onClick={() => onClick("link")}
          >
            <i className="ri-link" />
          </button> */}
        </div>
        <div className="editor-menu-right">
          {isSingleView && singleViewCurrent === "editor" && (
            <button className="highlighted" onClick={onToggleSingleView}>
              <i className="ri-eye-line" />
            </button>
          )}
          {isSingleView && singleViewCurrent === "preview" && (
            <button className="highlighted" onClick={onToggleSingleView}>
              <i className="ri-code-line" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

EditorMenu.propTypes = {
  enabled: PropTypes.arrayOf(PropTypes.string),
  highlighted: PropTypes.arrayOf(PropTypes.string),
  isSingleView: PropTypes.bool,
  onClick: PropTypes.func,
  onToggleSingleView: PropTypes.func,
  singleViewCurrent: PropTypes.string
};

export default EditorMenu;
