import React from "react";
interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
    svgType: "file" | "folder" | "arrow-up" | "arrow-down" | "close" | "list" | "icons";
}
declare const SvgIcon: React.FC<SvgIconProps>;
export default SvgIcon;
