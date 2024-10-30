import React from "react";
import CommonModal from "./CommonModal";
import { useFileManager } from "../context/FileManagerContext";
const ManageItemModal = ({ isVisible, onClose, itemName, openRename, openDelete, }) => {
    const { labels } = useFileManager();
    return (React.createElement(CommonModal, { title: `${labels.manageTitle} ${itemName || ""}`, isVisible: isVisible, onClose: onClose },
        React.createElement("div", null,
            React.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() },
                React.createElement("button", { onClick: () => {
                        openRename();
                        onClose();
                    }, type: "button", className: "rfm-new-folder-modal-btn" }, labels.renameButton),
                React.createElement("button", { onClick: () => {
                        openDelete();
                        onClose();
                    }, type: "button", className: "rfm-new-folder-modal-btn rfm-upload-file-modal-btn-cancel" }, labels.deleteButton)))));
};
export default ManageItemModal;
