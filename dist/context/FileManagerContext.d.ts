/// <reference types="react" />
import { FileType, Labels } from "../types/Types";
import { ViewStyle } from "../types/Enums";
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
    onUpload?: (file: File, folderId: string) => Promise<boolean>;
    onCreateFolder?: (name: string, ref: HTMLInputElement) => Promise<boolean>;
    onDelete?: (id: string) => void;
    onRename?: (id: string, newName: string, ref: HTMLInputElement) => Promise<boolean>;
    uploadedFileData?: File;
    setUploadedFileData: (file?: File) => void;
}
declare const FileManagerContext: import("react").Context<FileManagerContextType | null>;
export declare const useFileManager: () => FileManagerContextType;
export { FileManagerContext };
