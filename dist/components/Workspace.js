import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFileManager } from "../context/FileManagerContext";
import FileIcon from "./FileIcon";
import NewFolderIcon from "./NewFolderIcon";
import FolderPath from "./FolderPath";
import NewFolderModal from "./NewFolderModal";
import DelItemModal from "./DelItemModal";
import RenameItemModal from "./RenameItemModal";
import ManageItemModal from "./ManageItemModal";
import UploadFileModal from "./UploadFileModal";
import SvgIcon from "./SvgIcon";
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => (React.createElement("div", { className: "rfm-workspace-list-icon-td" },
            React.createElement(SvgIcon, { svgType: info.row.original.isDir ? "folder" : "file", className: "rfm-workspace-list-icon" }),
            React.createElement("p", null, info.getValue())))
    }),
    columnHelper.accessor("lastModified", {
        header: () => "Last Modified",
        cell: (info) => {
            const value = info.getValue();
            return (value) ? new Date(value).toLocaleString() : "N/A";
        }
    })
];
const Workspace = () => {
    const { labels, currentFolder, fs, viewStyle, viewOnly, setCurrentFolder, setUploadedFileData, onDoubleClick, onRefresh, } = useFileManager();
    const [newFolderModalVisible, setNewFolderModalVisible] = useState(false);
    const [toDeleteItem, setToDeleteItem] = useState(null);
    const [toRenameItem, setToRenameItem] = useState(null);
    const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);
    const [toManageItem, setToManageItem] = useState(null);
    const setUploadModalVisible = (value) => {
        if (viewOnly) {
            setUploadFileModalVisible(false);
        }
        else {
            setUploadFileModalVisible(value);
        }
    };
    useEffect(() => {
        if (newFolderModalVisible) {
            setNewFolderModalVisible(false);
        }
        if (toDeleteItem) {
            setToDeleteItem(null);
        }
        if (toRenameItem) {
            setToRenameItem(null);
        }
        if (toManageItem) {
            setToManageItem(null);
        }
        if (uploadFileModalVisible) {
            setUploadModalVisible(false);
            setUploadedFileData(undefined);
        }
    }, [currentFolder]);
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFileData(file);
        setUploadModalVisible(true);
    }, [setUploadedFileData]);
    const onCloseUploadFileModal = () => {
        setUploadModalVisible(false);
        setUploadedFileData(undefined);
    };
    const { getRootProps, isDragAccept } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop,
    });
    const currentFolderFiles = useMemo(() => {
        const files = fs.filter((f) => 'parentId' in f && f.parentId === currentFolder);
        return files;
    }, [fs, currentFolder]);
    const table = useReactTable({
        data: currentFolderFiles,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [{ id: "name", desc: false }]
        }
    });
    const handleClick = async (file) => {
        if (file.isDir) {
            setCurrentFolder(file.id);
            if (onRefresh) {
                try {
                    await onRefresh(file.id);
                }
                catch (e) {
                    console.error("Error during refresh", e);
                }
            }
        }
    };
    const handleDoubleClick = (id) => {
        if (onDoubleClick) {
            onDoubleClick(id);
        }
    };
    const openNewFolderModal = () => {
        setNewFolderModalVisible(true);
        setToManageItem(null);
        setToDeleteItem(null);
        setToRenameItem(null);
    };
    const openManageItemModal = (item) => {
        setToManageItem(item);
        setNewFolderModalVisible(false);
    };
    const openDeleteItemModal = (item) => {
        setToDeleteItem(item);
        setNewFolderModalVisible(false);
    };
    const openRenameItemModal = (item) => {
        setToRenameItem(item);
        setNewFolderModalVisible(false);
    };
    const handleContextMenu = (event, fileId, fileName) => {
        event.preventDefault();
        setNewFolderModalVisible(false);
        openManageItemModal({ id: fileId, name: fileName });
    };
    return (React.createElement("div", { className: "rfm-workspace" },
        React.createElement("section", { id: "react-file-manager-workspace", className: `rfm-workspace ${isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""}`, ...getRootProps() },
            React.createElement(FolderPath, null),
            React.createElement("div", { className: "rfm-workspace-file-listing" },
                viewStyle === "icons" && (React.createElement(React.Fragment, null,
                    currentFolderFiles.map((f) => (React.createElement("button", { key: f.id, onDoubleClick: () => handleDoubleClick(f.id) },
                        React.createElement(FileIcon, { id: f.id, name: f.name, isDir: f.isDir, handleContextMenu: handleContextMenu })))),
                    !viewOnly && React.createElement(NewFolderIcon, { onClick: openNewFolderModal }))),
                viewStyle === "list" && (React.createElement(React.Fragment, null,
                    React.createElement("table", { className: "w-full" },
                        React.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => (React.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => (React.createElement("th", { key: header.id, className: "rfm-workspace-list-th", onClick: header.column.getToggleSortingHandler() },
                            React.createElement("div", { className: "rfm-workspace-list-th-content" },
                                flexRender(header.column.columnDef.header, header.getContext()),
                                header.column.getIsSorted()
                                    ? header.column.getIsSorted() === "desc"
                                        ? React.createElement(SvgIcon, { svgType: "arrow-down", className: "rfm-header-sort-icon" })
                                        : React.createElement(SvgIcon, { svgType: "arrow-up", className: "rfm-header-sort-icon" })
                                    : "")))))))),
                        React.createElement("tbody", null, table.getRowModel().rows.map((row) => (React.createElement("tr", { key: row.id, className: "rfm-workspace-list-icon-row" }, row.getVisibleCells().map((cell) => (React.createElement("td", { key: cell.id, className: "rfm-workspace-list-align-txt", onClick: () => handleClick(row.original), onContextMenu: (event) => handleContextMenu(event, row.original.id, row.original.name), onDoubleClick: () => handleDoubleClick(row.original.id) }, flexRender(cell.column.columnDef.cell, cell.getContext()))))))))),
                    !viewOnly && (React.createElement("button", { className: "rfm-workspace-list-add-folder", onClick: openNewFolderModal }, labels.addFolderButton)))))),
        !viewOnly && (React.createElement(React.Fragment, null,
            React.createElement(NewFolderModal, { isVisible: newFolderModalVisible, onClose: () => setNewFolderModalVisible(false) }),
            React.createElement(DelItemModal, { itemName: toDeleteItem?.name, toDeleteItemId: toDeleteItem?.id, isVisible: !!toDeleteItem, onClose: () => setToDeleteItem(null) }),
            React.createElement(RenameItemModal, { itemName: toRenameItem?.name, toRenameItemId: toRenameItem?.id, isVisible: !!toRenameItem, onClose: () => setToRenameItem(null) }),
            React.createElement(ManageItemModal, { itemName: toManageItem?.name, isVisible: !!toManageItem, openDelete: () => {
                    if (!toManageItem)
                        throw 'No item being managed.';
                    openDeleteItemModal(toManageItem);
                }, openRename: () => {
                    if (!toManageItem)
                        throw 'No item being managed.';
                    openRenameItemModal(toManageItem);
                }, onClose: () => setToManageItem(null) }),
            React.createElement(UploadFileModal, { isVisible: uploadFileModalVisible, onClose: onCloseUploadFileModal })))));
};
export default Workspace;
