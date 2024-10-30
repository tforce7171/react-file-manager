import React, { useMemo } from "react";
import SvgIcon from "./SvgIcon";
import { useFileManager } from "../context/FileManagerContext";
var ViewStyle;
(function (ViewStyle) {
    ViewStyle["List"] = "list";
    ViewStyle["Icons"] = "icons";
})(ViewStyle || (ViewStyle = {}));
const FolderPath = () => {
    const { fs, currentFolder, setCurrentFolder, onRefresh, viewStyle, setViewStyle, } = useFileManager();
    const goUp = () => {
        const currentFolderInfo = fs.find((f) => f.id === currentFolder);
        if (currentFolderInfo && 'parentId' in currentFolderInfo && currentFolderInfo.parentId) {
            setCurrentFolder(currentFolderInfo.parentId);
            if (onRefresh !== void 0) {
                onRefresh(currentFolderInfo.parentId).catch(() => {
                    throw new Error("Error during refresh");
                });
            }
        }
    };
    const parentPath = useMemo(() => {
        const folder = fs.find((f) => f.id === currentFolder);
        if (!folder || !('parentId' in folder)) {
            return "";
        }
        const parentId = folder.parentId;
        if (!parentId) {
            return "";
        }
        const parentDir = fs.find((f) => f.id === parentId);
        if (!parentDir?.path) {
            return "";
        }
        const _parentPath = parentDir.path.slice(-1) === "/" ? parentDir.path : `${parentDir.path}/`;
        return _parentPath;
    }, [fs, currentFolder]);
    const currentPath = useMemo(() => {
        const currentFolderInfo = fs.find((f) => f.id === currentFolder);
        return currentFolderInfo ? currentFolderInfo.name : "";
    }, [fs, currentFolder]);
    return (React.createElement("div", { className: "rfm-workspace-header" },
        React.createElement("div", { className: "rfm-folder-path-container" },
            React.createElement(SvgIcon, { svgType: "arrow-up", onClick: goUp, className: "rfm-folder-path-svg" }),
            React.createElement("span", { className: "rfm-folder-path-span" },
                parentPath,
                React.createElement("b", null, currentPath))),
        React.createElement("div", { className: "rfm-header-container" },
            React.createElement(SvgIcon, { svgType: "list", className: `rfm-header-icon ${viewStyle === "list" && "rfm-header-icon--selected"}`, onClick: () => setViewStyle(ViewStyle.List) }),
            React.createElement(SvgIcon, { svgType: "icons", className: `rfm-header-icon ${viewStyle === "icons" && "rfm-header-icon--selected"}`, onClick: () => setViewStyle(ViewStyle.Icons) }))));
};
export default FolderPath;
