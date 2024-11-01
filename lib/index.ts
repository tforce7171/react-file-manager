import { ReactFileManager } from "./ReactFileManager";
import type { IFileManagerProps } from "./ReactFileManager";
import { useFileManager } from "./context/FileManagerContext";
import { ViewStyle } from "./types/Enums";
import type { FileType } from "./types/Types";

type FileSystemType = FileType[];

export { ReactFileManager, useFileManager, ViewStyle };
export type { IFileManagerProps, FileType, FileSystemType }