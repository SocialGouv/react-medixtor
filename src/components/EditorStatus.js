import PropTypes from "prop-types";
import React from "react";

import "./EditorStatus.css";

class EditorStatus extends React.Component {
  render() {
    const { className = "", selectionStatus = null, style = {} } = this.props;

    if (selectionStatus === null) {
      return <div className={`editor-status ${className}`} style={style} />;
    }

    return (
      <div className={`editor-status ${className}`} style={style}>
        <div>
          <span>{selectionStatus.blocksChain.join(" > ")}</span>
        </div>
        <div>
          <span>{`Column: ${selectionStatus.column}`}</span>
          <span>{`Line: ${selectionStatus.line}`}</span>
        </div>
      </div>
    );
  }
}

EditorStatus.propTypes = {
  className: PropTypes.string,
  selectionStatus: PropTypes.object,
  style: PropTypes.object
};

export default EditorStatus;
