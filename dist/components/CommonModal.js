import React from "react";
import Draggable from "react-draggable";
import SvgIcon from "./SvgIcon";
const CommonModal = ({ children, title, isVisible, onClose, }) => {
    if (!isVisible) {
        return null;
    }
    return (React.createElement(Draggable, { bounds: "#react-file-manager-workspace" },
        React.createElement("div", { className: "rfm-modal-container" },
            React.createElement("div", { className: "rfm-modal-header" },
                React.createElement("h3", { className: "rfm-modal-title" }, title),
                React.createElement(SvgIcon, { onClick: onClose, svgType: "close", className: "rfm-modal-icon" })),
            React.createElement("div", { className: "rfm-modal-content" }, children))));
};
export default CommonModal;
