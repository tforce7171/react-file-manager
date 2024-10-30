import React from "react";
import type { FileType, Labels } from "./Types";
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
declare const ReactFileManager: React.FC<IFileManagerProps>;
export { ReactFileManager };
export type { IFileManagerProps };
