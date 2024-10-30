import React from "react";
import CommonModal from "./CommonModal";
import { useFileManager } from "../context/FileManagerContext";
const DelItemModal = ({ isVisible, onClose, toDeleteItemId, itemName }) => {
    const { labels, onDelete } = useFileManager();
    const onConfirm = async () => {
        if (onDelete) {
            if (!toDeleteItemId) {
                throw new Error("No item to delete");
            }
            try {
                await onDelete(toDeleteItemId);
                onClose();
            }
            catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };
    return (React.createElement(CommonModal, { title: `${labels.deleteTitle} ${itemName || ""}?`, isVisible: isVisible, onClose: onClose },
        React.createElement("div", null,
            React.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() },
                React.createElement("button", { onClick: onConfirm, type: "button", className: "rfm-new-folder-modal-btn rfm-upload-file-modal-btn-cancel" }, labels.deleteConfirm)))));
};
export default DelItemModal;
