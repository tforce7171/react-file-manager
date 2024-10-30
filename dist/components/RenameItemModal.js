import React, { useRef, useState } from "react";
import CommonModal from "./CommonModal";
import { useFileManager } from "../context/FileManagerContext";
const RenameItemModal = ({ isVisible, onClose, toRenameItemId, itemName, }) => {
    const { labels, onRename } = useFileManager();
    const [itemNameLength, setItemNameLength] = useState(0);
    const itemNameRef = useRef(null);
    const onConfirm = async () => {
        const newItemName = itemNameRef.current?.value;
        if (!toRenameItemId) {
            throw new Error("No item to rename");
        }
        if (newItemName && newItemName.length > 0 && onRename) {
            try {
                await onRename(toRenameItemId, newItemName, itemNameRef.current) && onClose();
            }
            catch (error) {
                console.error("Error renaming item:", error);
            }
        }
    };
    return (React.createElement(CommonModal, { title: `${labels.renameTitle} ${itemName || ""}?`, isVisible: isVisible, onClose: onClose },
        React.createElement("div", null,
            React.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() },
                React.createElement("div", null,
                    React.createElement("input", { ref: itemNameRef, type: "text", className: "rfm-new-folder-modal-input", placeholder: itemName, required: true, autoFocus: true, onChange: (event) => setItemNameLength(event.target.value.length) })),
                React.createElement("button", { onClick: onConfirm, type: "button", className: "rfm-new-folder-modal-btn", disabled: itemNameLength === 0 }, labels.renameConfirm)))));
};
export default RenameItemModal;
