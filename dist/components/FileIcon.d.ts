import React from "react";
interface FileIconProps {
    id: string;
    name: string;
    isDir: boolean;
    handleContextMenu: (event: React.MouseEvent, fileId: string, fileName: string) => void;
}
declare const FileIcon: React.FC<FileIconProps>;
export default FileIcon;
