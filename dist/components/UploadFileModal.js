import React from "react";
import CommonModal from "./CommonModal";
import { useFileManager } from "../context/FileManagerContext";
const UploadFileModal = ({ isVisible, onClose }) => {
    const { labels, onUpload, uploadedFileData, currentFolder } = useFileManager();
    const onConfirm = async () => {
        if (onUpload && uploadedFileData) {
            try {
                await onUpload(uploadedFileData, currentFolder);
                onClose();
            }
            catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };
    return (React.createElement(CommonModal, { title: labels.uploadTitle, isVisible: isVisible, onClose: onClose },
        React.createElement("div", null,
            React.createElement("h4", { className: "rfm-upload-file-modal-title" }, labels.uploadConfirmationMsg),
            React.createElement("div", { className: "rfm-upload-file-modal-container" },
                React.createElement("button", { onClick: onConfirm, type: "button", className: "rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm" }, labels.uploadConfirm),
                React.createElement("button", { onClick: onClose, type: "button", className: "rfm-upload-file-modal-btn rfm-upload-file-modal-btn-cancel" }, labels.cancel)))));
};
export default UploadFileModal;
