import React, { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
import SvgIcon from "./SvgIcon";
const FileIcon = ({ id, name, isDir, handleContextMenu }) => {
    const { setCurrentFolder, onRefresh } = useFileManager();
    const handleClick = async () => {
        if (isDir) {
            setCurrentFolder(id);
            if (onRefresh) {
                try {
                    await onRefresh(id);
                }
                catch (e) {
                    console.error("Error during refresh", e);
                }
            }
        }
    };
    const fileExtension = useMemo(() => {
        if (!name.includes(".")) {
            return "";
        }
        const nameArray = name.split(".");
        return `.${nameArray[nameArray.length - 1]}`;
    }, [name]);
    return (React.createElement("div", { onClick: handleClick, onContextMenu: (event) => handleContextMenu(event, id, name), className: "rfm-file-icon-container" },
        React.createElement(SvgIcon, { svgType: isDir ? "folder" : "file", className: "rfm-file-icon-svg" }),
        !isDir && React.createElement("span", { className: "rfm-file-icon-extension" }, fileExtension),
        React.createElement("span", { className: "rfm-file-icon-name" }, name)));
};
export default FileIcon;
