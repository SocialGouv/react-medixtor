import PropTypes from "prop-types";
import React from "react";

import "../../node_modules/remixicon/fonts/remixicon.css";
import "./EditorMenu.css";

class EditorMenu extends React.Component {
  render() {
    const {
      className = "",
      enabled = [],
      highlighted = [],
      onClick = () => void 0,
      style = {}
    } = this.props;

    return (
      <div className={`editor-menu ${className}`} style={style}>
        <button
          className={highlighted.includes("heading") ? "highlighted" : ""}
          disabled={!enabled.includes("heading")}
          onClick={() => onClick("heading")}
        >
          <i className="remixicon-heading" />
        </button>
        <button
          className={highlighted.includes("strong") ? "highlighted" : ""}
          disabled={!enabled.includes("strong")}
          onClick={() => onClick("strong")}
        >
          <i className="remixicon-bold" />
        </button>
        <button
          className={highlighted.includes("emphasis") ? "highlighted" : ""}
          disabled={!enabled.includes("emphasis")}
          onClick={() => onClick("emphasis")}
        >
          <i className="remixicon-italic" />
        </button>
        <i className="separator" />
        <button
          className={highlighted.includes("link") ? "highlighted" : ""}
          disabled={!enabled.includes("link")}
          onClick={() => onClick("link")}
        >
          <i className="remixicon-link" />
        </button>
      </div>
    );
  }
}

EditorMenu.propTypes = {
  className: PropTypes.string,
  enabled: PropTypes.arrayOf(PropTypes.string),
  highlighted: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default EditorMenu;
