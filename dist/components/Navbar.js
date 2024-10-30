import React, { useMemo } from "react";
import { useFileManager } from "../context/FileManagerContext";
const Navbar = () => {
    const { fs, setCurrentFolder, onRefresh } = useFileManager();
    // Get initial folders to display in the navbar
    const initialFolders = useMemo(() => {
        return fs.filter((f) => f.isDir && 'parentId' in f && f.parentId === "0");
    }, [fs]);
    // Handle folder click, set as current folder and optionally refresh
    const handleClick = async (id) => {
        setCurrentFolder(id);
        if (onRefresh) {
            try {
                await onRefresh(id);
            }
            catch (e) {
                console.error("Error during refresh", e);
            }
        }
    };
    return (React.createElement("section", { className: "rfm-navbar" },
        React.createElement("span", { onClick: () => {
                setCurrentFolder("0");
                if (onRefresh) {
                    onRefresh("0").catch(() => {
                        console.error("Error during refresh");
                    });
                }
            }, className: "rfm-navbar-root-link" }, "Root"),
        React.createElement("ul", { className: "rfm-navbar-list" }, initialFolders.map((f) => (React.createElement("li", { onClick: () => handleClick(f.id), className: "rfm-navbar-list-element", key: f.id }, f.name))))));
};
export default Navbar;
