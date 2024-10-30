import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Workspace from "../components/Workspace";
import { ViewStyle } from "./Enums";
import { FileManagerContext } from "../context/FileManagerContext";
const ReactFileManager = ({ fs, viewOnly, onDoubleClick, onRefresh, onUpload, onCreateFolder, onDelete, onRename, labels, }) => {
    const [currentFolder, setCurrentFolder] = useState("0");
    const [uploadedFileData, setUploadedFileData] = useState();
    const [viewStyle, setViewStyle] = useState(ViewStyle.List);
    const defaultLabels = {
        fileName: 'Name',
        lastModified: 'Last Modified',
        addFolderButton: 'Add Folder',
        addFolderTitle: 'Create New Folder',
        addFolderPlaceholder: 'Folder Name',
        addFolderConfirm: 'Create',
        manageTitle: 'Managing',
        renameButton: 'Rename',
        renameTitle: 'Rename',
        renameConfirm: 'Rename',
        deleteButton: 'Delete',
        deleteTitle: 'Delete',
        deleteConfirm: 'Delete',
        uploadTitle: 'Upload file',
        uploadConfirmationMsg: 'Are you sure you want to upload the file?',
        uploadConfirm: 'Upload',
        cancel: 'Cancel',
    };
    const chosenLabels = { ...defaultLabels, ...labels };
    return (React.createElement(FileManagerContext.Provider, { value: {
            fs,
            labels: chosenLabels,
            viewStyle,
            setViewStyle,
            viewOnly,
            currentFolder,
            setCurrentFolder,
            onDoubleClick,
            onRefresh,
            onUpload,
            onCreateFolder,
            onDelete,
            onRename,
            uploadedFileData,
            setUploadedFileData,
        } },
        React.createElement("div", { className: "rfm-main-container" },
            React.createElement(Navbar, null),
            React.createElement(Workspace, null))));
};
export { ReactFileManager };
