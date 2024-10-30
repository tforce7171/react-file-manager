import React from "react";
const NewFolderIcon = ({ onClick }) => {
    return (React.createElement("div", { onClick: onClick, className: "rfm-folder-icon-container" },
        React.createElement("span", { className: "rfm-folder-icon-span" }, "+")));
};
export default NewFolderIcon;
