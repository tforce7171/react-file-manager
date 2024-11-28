import React from 'react';

type FileType = {
    id: string;
    name: string;
    isRoot?: false;
    isDir: false;
    path?: string;
    parentId: string;
    lastModified?: number;
} | {
    id: string;
    name: string;
    isRoot?: false;
    isDir: true;
    path: string;
    parentId: string;
    lastModified?: number;
} | {
    id: string;
    name: string;
    isRoot: true;
    isDir: true;
    path: string;
    lastModified?: number;
};
interface Labels {
    fileName: string;
    lastModified: string;
    addFolderButton: string;
    addFolderTitle: string;
    addFolderPlaceholder: string;
    addFolderConfirm: string;
    manageTitle: string;
    renameButton: string;
    renameTitle: string;
    renameConfirm: string;
    deleteButton: string;
    deleteTitle: string;
    deleteConfirm: string;
    uploadTitle: string;
    uploadConfirmationMsg: string;
    uploadConfirm: string;
    cancel: string;
}

interface IFileManagerProps {
    fs: FileType[];
    viewOnly?: boolean;
    onDoubleClick?: (id: string) => void;
    onRefresh?: (id: string) => Promise<void>;
    onUpload?: (file: File[], folderId: string) => Promise<boolean>;
    onCreateFolder?: (name: string, ref: HTMLInputElement) => Promise<boolean>;
    onDelete?: (id: string) => void;
    onRename?: (id: string, newName: string, ref: HTMLInputElement) => Promise<boolean>;
    labels?: Partial<Labels>;
}
declare const ReactFileManager: React.FC<IFileManagerProps>;

declare enum ViewStyle {
    List = "list",
    Icons = "icons"
}

interface FileManagerContextType {
    fs: FileType[];
    labels: Labels;
    viewStyle: ViewStyle;
    setViewStyle: (style: ViewStyle) => void;
    viewOnly?: boolean;
    currentFolder: string;
    setCurrentFolder: (folderId: string) => void;
    onDoubleClick?: (id: string) => void;
    onRefresh?: (id: string) => Promise<void>;
    onUpload?: (file: File[], folderId: string) => Promise<boolean>;
    onCreateFolder?: (name: string, ref: HTMLInputElement) => Promise<boolean>;
    onDelete?: (id: string) => void;
    onRename?: (id: string, newName: string, ref: HTMLInputElement) => Promise<boolean>;
    uploadedFileData?: File[];
    setUploadedFileData: (file?: File[]) => void;
}
declare const useFileManager: () => FileManagerContextType;

type FileSystemType = FileType[];

export { FileSystemType, FileType, IFileManagerProps, ReactFileManager, ViewStyle, useFileManager };
