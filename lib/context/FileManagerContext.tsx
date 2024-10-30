import { createContext, useContext } from "react";
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

const FileManagerContext = createContext<FileManagerContextType | null>(null);

// Custom hook to use the FileManagerContext
export const useFileManager = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
};

export { FileManagerContext };