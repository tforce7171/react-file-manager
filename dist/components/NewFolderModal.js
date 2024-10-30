import React, { useRef, useState } from "react";
import CommonModal from "./CommonModal";
import { useFileManager } from "../context/FileManagerContext";
const NewFolderModal = ({ isVisible, onClose }) => {
    const { labels, onCreateFolder } = useFileManager();
    const [folderNameLength, setFolderNameLength] = useState(0);
    const folderNameRef = useRef(null);
    const onConfirm = async () => {
        const folderName = folderNameRef.current?.value;
        if (folderName && folderName.length > 0 && onCreateFolder) {
            try {
                await onCreateFolder(folderName, folderNameRef.current) && onClose();
            }
            catch (error) {
                console.error("Error creating folder:", error);
            }
        }
    };
    return (React.createElement(CommonModal, { title: labels.addFolderTitle, isVisible: isVisible, onClose: onClose },
        React.createElement("div", null,
            React.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() },
                React.createElement("div", null,
                    React.createElement("input", { ref: folderNameRef, type: "text", className: "rfm-new-folder-modal-input", placeholder: labels.addFolderPlaceholder, required: true, autoFocus: true, onChange: (event) => setFolderNameLength(event.target.value.length) })),
                React.createElement("button", { onClick: onConfirm, type: "button", className: "rfm-new-folder-modal-btn", disabled: folderNameLength === 0 }, labels.addFolderConfirm)))));
};
export default NewFolderModal;
