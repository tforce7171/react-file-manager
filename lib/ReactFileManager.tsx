import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Workspace from "./components/Workspace";
import { ViewStyle } from "./types/Enums";
import type { FileType, Labels } from "./types/Types";
import { FileManagerContext } from "./context/FileManagerContext";

interface IFileManagerProps {
  fs: FileType[];
  viewOnly?: boolean;
  onDoubleClick?: (id: string) => void;
  onRefresh?: (id: string) => Promise<void>;
  onUpload?: (file: File, folderId: string) => Promise<boolean>;
  onCreateFolder?: (name: string, ref: HTMLInputElement) => Promise<boolean>;
  onDelete?: (id: string) => void;
  onRename?: (id: string, newName: string, ref: HTMLInputElement) => Promise<boolean>;
  labels?: Partial<Labels>;
}

const ReactFileManager: React.FC<IFileManagerProps> = ({
  fs,
  viewOnly,
  onDoubleClick,
  onRefresh,
  onUpload,
  onCreateFolder,
  onDelete,
  onRename,
  labels,
}) => {
  const [currentFolder, setCurrentFolder] = useState<string>("0");
  const [uploadedFileData, setUploadedFileData] = useState<File | undefined>();
  const [viewStyle, setViewStyle] = useState<ViewStyle>(ViewStyle.List);

  const defaultLabels: Labels = {
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

  return (
    <FileManagerContext.Provider
      value={{
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
      }}
    >
      <div className="rfm-main-container">
        <Navbar />
        <Workspace />
      </div>
    </FileManagerContext.Provider>
  );
};

export { ReactFileManager };
export type { IFileManagerProps };