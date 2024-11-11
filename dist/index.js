// lib/ReactFileManager.tsx
import React14, { useState as useState4 } from "react";

// lib/components/Navbar.tsx
import React, { useMemo } from "react";

// lib/context/FileManagerContext.tsx
import { createContext, useContext } from "react";
var FileManagerContext = createContext(null);
var useFileManager = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
};

// lib/components/Navbar.tsx
var Navbar = () => {
  const { fs, setCurrentFolder, onRefresh } = useFileManager();
  const initialFolders = useMemo(() => {
    return fs.filter((f) => f.isDir && "parentId" in f && f.parentId === "0");
  }, [fs]);
  const handleClick = async (id) => {
    setCurrentFolder(id);
    if (onRefresh) {
      try {
        await onRefresh(id);
      } catch (e) {
        console.error("Error during refresh", e);
      }
    }
  };
  return /* @__PURE__ */ React.createElement("section", { className: "rfm-navbar" }, /* @__PURE__ */ React.createElement(
    "span",
    {
      onClick: () => {
        setCurrentFolder("0");
        if (onRefresh) {
          onRefresh("0").catch(() => {
            console.error("Error during refresh");
          });
        }
      },
      className: "rfm-navbar-root-link"
    },
    "Root"
  ), /* @__PURE__ */ React.createElement("ul", { className: "rfm-navbar-list" }, initialFolders.map((f) => /* @__PURE__ */ React.createElement(
    "li",
    {
      onClick: () => handleClick(f.id),
      className: "rfm-navbar-list-element",
      key: f.id
    },
    f.name
  ))));
};
var Navbar_default = Navbar;

// lib/components/Workspace.tsx
import React13, { useState as useState3, useMemo as useMemo4, useCallback, useEffect as useEffect2 } from "react";
import { useDropzone } from "react-dropzone";

// lib/components/FileIcon.tsx
import React3, { useMemo as useMemo2 } from "react";

// lib/components/SvgIcon.tsx
import React2 from "react";
var SvgIcon = ({ svgType, ...props }) => {
  const svgContent = () => {
    switch (svgType) {
      case "file":
        return /* @__PURE__ */ React2.createElement("svg", { version: "1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", enableBackground: "new 0 0 48 48" }, /* @__PURE__ */ React2.createElement("polygon", { fill: "#90CAF9", points: "40,45 8,45 8,3 30,3 40,13" }), /* @__PURE__ */ React2.createElement("polygon", { fill: "#E1F5FE", points: "38.5,14 29,14 29,4.5" }));
      case "folder":
        return /* @__PURE__ */ React2.createElement("svg", { version: "1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", enableBackground: "new 0 0 48 48" }, /* @__PURE__ */ React2.createElement("path", { fill: "#FFA000", d: "M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z" }), /* @__PURE__ */ React2.createElement("path", { fill: "#FFCA28", d: "M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z" }));
      case "arrow-up":
        return /* @__PURE__ */ React2.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 1024 1024" }, /* @__PURE__ */ React2.createElement("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" }));
      case "arrow-down":
        return /* @__PURE__ */ React2.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React2.createElement("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" }));
      case "close":
        return /* @__PURE__ */ React2.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, /* @__PURE__ */ React2.createElement("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }));
      case "list":
        return /* @__PURE__ */ React2.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React2.createElement("path", { d: "M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z" }));
      case "icons":
        return /* @__PURE__ */ React2.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React2.createElement("path", { d: "M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z" }));
      default:
        return null;
    }
  };
  return /* @__PURE__ */ React2.createElement("div", { ...props }, svgContent());
};
var SvgIcon_default = SvgIcon;

// lib/components/FileIcon.tsx
var FileIcon = ({ id, name, isDir, handleContextMenu }) => {
  const { setCurrentFolder, onRefresh } = useFileManager();
  const handleClick = async () => {
    if (isDir) {
      setCurrentFolder(id);
      if (onRefresh) {
        try {
          await onRefresh(id);
        } catch (e) {
          console.error("Error during refresh", e);
        }
      }
    }
  };
  const fileExtension = useMemo2(() => {
    if (!name.includes(".")) {
      return "";
    }
    const nameArray = name.split(".");
    return `.${nameArray[nameArray.length - 1]}`;
  }, [name]);
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      onClick: handleClick,
      onContextMenu: (event) => handleContextMenu(event, id, name),
      className: "rfm-file-icon-container"
    },
    /* @__PURE__ */ React3.createElement(SvgIcon_default, { svgType: isDir ? "folder" : "file", className: "rfm-file-icon-svg" }),
    !isDir && /* @__PURE__ */ React3.createElement("span", { className: "rfm-file-icon-extension" }, fileExtension),
    /* @__PURE__ */ React3.createElement("span", { className: "rfm-file-icon-name" }, name)
  );
};
var FileIcon_default = FileIcon;

// lib/components/NewFolderIcon.tsx
import React4 from "react";
var NewFolderIcon = ({ onClick }) => {
  return /* @__PURE__ */ React4.createElement("div", { onClick, className: "rfm-folder-icon-container" }, /* @__PURE__ */ React4.createElement("span", { className: "rfm-folder-icon-span" }, "+"));
};
var NewFolderIcon_default = NewFolderIcon;

// lib/components/FolderPath.tsx
import React5, { useMemo as useMemo3 } from "react";
var FolderPath = () => {
  const {
    fs,
    currentFolder,
    setCurrentFolder,
    onRefresh,
    viewStyle,
    setViewStyle
  } = useFileManager();
  const goUp = () => {
    const currentFolderInfo = fs.find((f) => f.id === currentFolder);
    if (currentFolderInfo && "parentId" in currentFolderInfo && currentFolderInfo.parentId) {
      setCurrentFolder(currentFolderInfo.parentId);
      if (onRefresh !== void 0) {
        onRefresh(currentFolderInfo.parentId).catch(() => {
          throw new Error("Error during refresh");
        });
      }
    }
  };
  const parentPath = useMemo3(() => {
    const folder = fs.find((f) => f.id === currentFolder);
    if (!folder || !("parentId" in folder)) {
      return "";
    }
    const parentId = folder.parentId;
    if (!parentId) {
      return "";
    }
    const parentDir = fs.find((f) => f.id === parentId);
    if (!parentDir?.path) {
      return "";
    }
    const _parentPath = parentDir.path.slice(-1) === "/" ? parentDir.path : `${parentDir.path}/`;
    return _parentPath;
  }, [fs, currentFolder]);
  const currentPath = useMemo3(() => {
    const currentFolderInfo = fs.find((f) => f.id === currentFolder);
    return currentFolderInfo ? currentFolderInfo.name : "";
  }, [fs, currentFolder]);
  return /* @__PURE__ */ React5.createElement("div", { className: "rfm-workspace-header" }, /* @__PURE__ */ React5.createElement("div", { className: "rfm-folder-path-container" }, /* @__PURE__ */ React5.createElement(
    SvgIcon_default,
    {
      svgType: "arrow-up",
      onClick: goUp,
      className: "rfm-folder-path-svg"
    }
  ), /* @__PURE__ */ React5.createElement("span", { className: "rfm-folder-path-span" }, parentPath, /* @__PURE__ */ React5.createElement("b", null, currentPath))), /* @__PURE__ */ React5.createElement("div", { className: "rfm-header-container" }, /* @__PURE__ */ React5.createElement(
    SvgIcon_default,
    {
      svgType: "list",
      className: `rfm-header-icon ${viewStyle === "list" && "rfm-header-icon--selected"}`,
      onClick: () => setViewStyle("list" /* List */)
    }
  ), /* @__PURE__ */ React5.createElement(
    SvgIcon_default,
    {
      svgType: "icons",
      className: `rfm-header-icon ${viewStyle === "icons" && "rfm-header-icon--selected"}`,
      onClick: () => setViewStyle("icons" /* Icons */)
    }
  )));
};
var FolderPath_default = FolderPath;

// lib/components/NewFolderModal.tsx
import React7, { useRef, useState } from "react";

// lib/components/CommonModal.tsx
import React6 from "react";
import Draggable from "react-draggable";
var CommonModal = ({
  children,
  title,
  isVisible,
  onClose
}) => {
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ React6.createElement(Draggable, { bounds: "#react-file-manager-workspace" }, /* @__PURE__ */ React6.createElement("div", { className: "rfm-modal-container" }, /* @__PURE__ */ React6.createElement("div", { className: "rfm-modal-header" }, /* @__PURE__ */ React6.createElement("h3", { className: "rfm-modal-title" }, title), /* @__PURE__ */ React6.createElement(
    SvgIcon_default,
    {
      onClick: onClose,
      svgType: "close",
      className: "rfm-modal-icon"
    }
  )), /* @__PURE__ */ React6.createElement("div", { className: "rfm-modal-content" }, children)));
};
var CommonModal_default = CommonModal;

// lib/components/NewFolderModal.tsx
var NewFolderModal = ({ isVisible, onClose }) => {
  const { labels, onCreateFolder } = useFileManager();
  const [folderNameLength, setFolderNameLength] = useState(0);
  const folderNameRef = useRef(null);
  const onConfirm = async () => {
    const folderName = folderNameRef.current?.value;
    if (folderName && folderName.length > 0 && onCreateFolder) {
      try {
        await onCreateFolder(folderName, folderNameRef.current) && onClose();
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    }
  };
  return /* @__PURE__ */ React7.createElement(CommonModal_default, { title: labels.addFolderTitle, isVisible, onClose }, /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement(
    "input",
    {
      ref: folderNameRef,
      type: "text",
      className: "rfm-new-folder-modal-input",
      placeholder: labels.addFolderPlaceholder,
      required: true,
      autoFocus: true,
      onChange: (event) => setFolderNameLength(event.target.value.length)
    }
  )), /* @__PURE__ */ React7.createElement(
    "button",
    {
      onClick: onConfirm,
      type: "button",
      className: "rfm-new-folder-modal-btn",
      disabled: folderNameLength === 0
    },
    labels.addFolderConfirm
  ))));
};
var NewFolderModal_default = NewFolderModal;

// lib/components/DelItemModal.tsx
import React8 from "react";
var DelItemModal = ({ isVisible, onClose, toDeleteItemId, itemName }) => {
  const { labels, onDelete } = useFileManager();
  const onConfirm = async () => {
    if (onDelete) {
      if (!toDeleteItemId) {
        throw new Error("No item to delete");
      }
      try {
        await onDelete(toDeleteItemId);
        onClose();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };
  return /* @__PURE__ */ React8.createElement(
    CommonModal_default,
    {
      title: `${labels.deleteTitle} ${itemName || ""}?`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ React8.createElement("div", null, /* @__PURE__ */ React8.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React8.createElement(
      "button",
      {
        onClick: onConfirm,
        type: "button",
        className: "rfm-new-folder-modal-btn rfm-upload-file-modal-btn-cancel"
      },
      labels.deleteConfirm
    )))
  );
};
var DelItemModal_default = DelItemModal;

// lib/components/RenameItemModal.tsx
import React9, { useRef as useRef2, useState as useState2 } from "react";
var RenameItemModal = ({
  isVisible,
  onClose,
  toRenameItemId,
  itemName
}) => {
  const { labels, onRename } = useFileManager();
  const [itemNameLength, setItemNameLength] = useState2(0);
  const itemNameRef = useRef2(null);
  const onConfirm = async () => {
    const newItemName = itemNameRef.current?.value;
    if (!toRenameItemId) {
      throw new Error("No item to rename");
    }
    if (newItemName && newItemName.length > 0 && onRename) {
      try {
        await onRename(toRenameItemId, newItemName, itemNameRef.current) && onClose();
      } catch (error) {
        console.error("Error renaming item:", error);
      }
    }
  };
  return /* @__PURE__ */ React9.createElement(
    CommonModal_default,
    {
      title: `${labels.renameTitle} ${itemName || ""}?`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React9.createElement("div", null, /* @__PURE__ */ React9.createElement(
      "input",
      {
        ref: itemNameRef,
        type: "text",
        className: "rfm-new-folder-modal-input",
        placeholder: itemName,
        required: true,
        autoFocus: true,
        onChange: (event) => setItemNameLength(event.target.value.length)
      }
    )), /* @__PURE__ */ React9.createElement(
      "button",
      {
        onClick: onConfirm,
        type: "button",
        className: "rfm-new-folder-modal-btn",
        disabled: itemNameLength === 0
      },
      labels.renameConfirm
    )))
  );
};
var RenameItemModal_default = RenameItemModal;

// lib/components/ScrollArea.tsx
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { twMerge } from "tailwind-merge";
import * as React10 from "react";

// node_modules/clsx/dist/clsx.m.js
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// lib/components/ScrollArea.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var ScrollArea = React10.forwardRef(({ className, children, ...props }, ref) => {
  const scrollRef = React10.useRef(null);
  React10.useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight ?? 0;
      }
    };
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      scrollElement.addEventListener("touchstart", handleScroll, {
        passive: false
      });
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return /* @__PURE__ */ React10.createElement(
    ScrollAreaPrimitive.Root,
    {
      className: cn("relative overflow-hidden", className),
      ...props
    },
    /* @__PURE__ */ React10.createElement(
      ScrollAreaPrimitive.Viewport,
      {
        ref,
        className: "h-full w-full rounded-[inherit]"
      },
      children
    ),
    /* @__PURE__ */ React10.createElement(ScrollBar, null),
    /* @__PURE__ */ React10.createElement(ScrollAreaPrimitive.Corner, null)
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React10.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ React10.createElement(
  ScrollAreaPrimitive.Scrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props
  },
  /* @__PURE__ */ React10.createElement(ScrollAreaPrimitive.Thumb, { className: "relative flex-1 rounded-full bg-border" })
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// lib/components/ManageItemModal.tsx
import React11 from "react";
var ManageItemModal = ({
  isVisible,
  onClose,
  itemName,
  openRename,
  openDelete
}) => {
  const { labels } = useFileManager();
  return /* @__PURE__ */ React11.createElement(
    CommonModal_default,
    {
      title: `${labels.manageTitle} ${itemName || ""}`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ React11.createElement("div", null, /* @__PURE__ */ React11.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React11.createElement(
      "button",
      {
        onClick: () => {
          openRename();
          onClose();
        },
        type: "button",
        className: "rfm-new-folder-modal-btn"
      },
      labels.renameButton
    ), /* @__PURE__ */ React11.createElement(
      "button",
      {
        onClick: () => {
          openDelete();
          onClose();
        },
        type: "button",
        className: "rfm-new-folder-modal-btn rfm-upload-file-modal-btn-cancel"
      },
      labels.deleteButton
    )))
  );
};
var ManageItemModal_default = ManageItemModal;

// lib/components/UploadFileModal.tsx
import React12 from "react";
var UploadFileModal = ({ isVisible, onClose }) => {
  const { labels, onUpload, uploadedFileData, currentFolder } = useFileManager();
  const onConfirm = async () => {
    if (onUpload && uploadedFileData) {
      try {
        await onUpload(uploadedFileData, currentFolder);
        onClose();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return /* @__PURE__ */ React12.createElement(
    CommonModal_default,
    {
      title: labels.uploadTitle,
      isVisible,
      onClose
    },
    /* @__PURE__ */ React12.createElement("div", null, /* @__PURE__ */ React12.createElement("h4", { className: "rfm-upload-file-modal-title" }, labels.uploadConfirmationMsg), /* @__PURE__ */ React12.createElement("div", { className: "rfm-upload-file-modal-container" }, /* @__PURE__ */ React12.createElement(
      "button",
      {
        onClick: onConfirm,
        type: "button",
        className: "rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm"
      },
      labels.uploadConfirm
    ), /* @__PURE__ */ React12.createElement(
      "button",
      {
        onClick: onClose,
        type: "button",
        className: "rfm-upload-file-modal-btn rfm-upload-file-modal-btn-cancel"
      },
      labels.cancel
    )))
  );
};
var UploadFileModal_default = UploadFileModal;

// lib/components/Workspace.tsx
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
var columnHelper = createColumnHelper();
var columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => /* @__PURE__ */ React13.createElement("div", { className: "rfm-workspace-list-icon-td" }, /* @__PURE__ */ React13.createElement(SvgIcon_default, { svgType: info.row.original.isDir ? "folder" : "file", className: "rfm-workspace-list-icon" }), /* @__PURE__ */ React13.createElement("p", null, info.getValue()))
  }),
  columnHelper.accessor("lastModified", {
    header: () => "Last Modified",
    cell: (info) => {
      const value = info.getValue();
      return value ? new Date(value).toLocaleString() : "N/A";
    }
  })
];
var Workspace = () => {
  const {
    labels,
    currentFolder,
    fs,
    viewStyle,
    viewOnly,
    setCurrentFolder,
    setUploadedFileData,
    onDoubleClick,
    onRefresh
  } = useFileManager();
  const [newFolderModalVisible, setNewFolderModalVisible] = useState3(false);
  const [toDeleteItem, setToDeleteItem] = useState3(null);
  const [toRenameItem, setToRenameItem] = useState3(null);
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState3(false);
  const [toManageItem, setToManageItem] = useState3(null);
  const setUploadModalVisible = (value) => {
    if (viewOnly) {
      setUploadFileModalVisible(false);
    } else {
      setUploadFileModalVisible(value);
    }
  };
  useEffect2(() => {
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
      setUploadedFileData(void 0);
    }
  }, [currentFolder]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFileData(file);
      setUploadModalVisible(true);
    },
    [setUploadedFileData]
  );
  const onCloseUploadFileModal = () => {
    setUploadModalVisible(false);
    setUploadedFileData(void 0);
  };
  const { getRootProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop
  });
  const currentFolderFiles = useMemo4(() => {
    const files = fs.filter((f) => "parentId" in f && f.parentId === currentFolder);
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
        } catch (e) {
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
  return /* @__PURE__ */ React13.createElement("div", { className: "rfm-workspace" }, /* @__PURE__ */ React13.createElement(
    "section",
    {
      id: "react-file-manager-workspace",
      className: `rfm-workspace ${isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""}`,
      ...getRootProps()
    },
    /* @__PURE__ */ React13.createElement(FolderPath_default, null),
    /* @__PURE__ */ React13.createElement(ScrollArea, null, /* @__PURE__ */ React13.createElement("div", { className: "rfm-workspace-file-listing" }, viewStyle === "icons" && /* @__PURE__ */ React13.createElement(React13.Fragment, null, currentFolderFiles.map((f) => /* @__PURE__ */ React13.createElement("button", { key: f.id, onDoubleClick: () => handleDoubleClick(f.id) }, /* @__PURE__ */ React13.createElement(FileIcon_default, { id: f.id, name: f.name, isDir: f.isDir, handleContextMenu }))), !viewOnly && /* @__PURE__ */ React13.createElement(NewFolderIcon_default, { onClick: openNewFolderModal })), viewStyle === "list" && /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement("table", { className: "w-full" }, /* @__PURE__ */ React13.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React13.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ React13.createElement("th", { key: header.id, className: "rfm-workspace-list-th", onClick: header.column.getToggleSortingHandler() }, /* @__PURE__ */ React13.createElement("div", { className: "rfm-workspace-list-th-content" }, flexRender(header.column.columnDef.header, header.getContext()), header.column.getIsSorted() ? header.column.getIsSorted() === "desc" ? /* @__PURE__ */ React13.createElement(SvgIcon_default, { svgType: "arrow-down", className: "rfm-header-sort-icon" }) : /* @__PURE__ */ React13.createElement(SvgIcon_default, { svgType: "arrow-up", className: "rfm-header-sort-icon" }) : "")))))), /* @__PURE__ */ React13.createElement("tbody", null, table.getRowModel().rows.map((row) => /* @__PURE__ */ React13.createElement("tr", { key: row.id, className: "rfm-workspace-list-icon-row" }, row.getVisibleCells().map((cell) => /* @__PURE__ */ React13.createElement(
      "td",
      {
        key: cell.id,
        className: "rfm-workspace-list-align-txt",
        onClick: () => handleClick(row.original),
        onContextMenu: (event) => handleContextMenu(event, row.original.id, row.original.name),
        onDoubleClick: () => handleDoubleClick(row.original.id)
      },
      flexRender(cell.column.columnDef.cell, cell.getContext())
    ))))))))),
    !viewOnly && /* @__PURE__ */ React13.createElement("button", { className: "rfm-workspace-list-add-folder", onClick: openNewFolderModal }, labels.addFolderButton)
  ), !viewOnly && /* @__PURE__ */ React13.createElement(React13.Fragment, null, /* @__PURE__ */ React13.createElement(
    NewFolderModal_default,
    {
      isVisible: newFolderModalVisible,
      onClose: () => setNewFolderModalVisible(false)
    }
  ), /* @__PURE__ */ React13.createElement(
    DelItemModal_default,
    {
      itemName: toDeleteItem?.name,
      toDeleteItemId: toDeleteItem?.id,
      isVisible: !!toDeleteItem,
      onClose: () => setToDeleteItem(null)
    }
  ), /* @__PURE__ */ React13.createElement(
    RenameItemModal_default,
    {
      itemName: toRenameItem?.name,
      toRenameItemId: toRenameItem?.id,
      isVisible: !!toRenameItem,
      onClose: () => setToRenameItem(null)
    }
  ), /* @__PURE__ */ React13.createElement(
    ManageItemModal_default,
    {
      itemName: toManageItem?.name,
      isVisible: !!toManageItem,
      openDelete: () => {
        if (!toManageItem)
          throw "No item being managed.";
        openDeleteItemModal(toManageItem);
      },
      openRename: () => {
        if (!toManageItem)
          throw "No item being managed.";
        openRenameItemModal(toManageItem);
      },
      onClose: () => setToManageItem(null)
    }
  ), /* @__PURE__ */ React13.createElement(
    UploadFileModal_default,
    {
      isVisible: uploadFileModalVisible,
      onClose: onCloseUploadFileModal
    }
  )));
};
var Workspace_default = Workspace;

// lib/types/Enums.ts
var ViewStyle = /* @__PURE__ */ ((ViewStyle2) => {
  ViewStyle2["List"] = "list";
  ViewStyle2["Icons"] = "icons";
  return ViewStyle2;
})(ViewStyle || {});

// lib/ReactFileManager.tsx
var ReactFileManager = ({
  fs,
  viewOnly,
  onDoubleClick,
  onRefresh,
  onUpload,
  onCreateFolder,
  onDelete,
  onRename,
  labels
}) => {
  const [currentFolder, setCurrentFolder] = useState4("0");
  const [uploadedFileData, setUploadedFileData] = useState4();
  const [viewStyle, setViewStyle] = useState4("list" /* List */);
  const defaultLabels = {
    fileName: "Name",
    lastModified: "Last Modified",
    addFolderButton: "Add Folder",
    addFolderTitle: "Create New Folder",
    addFolderPlaceholder: "Folder Name",
    addFolderConfirm: "Create",
    manageTitle: "Managing",
    renameButton: "Rename",
    renameTitle: "Rename",
    renameConfirm: "Rename",
    deleteButton: "Delete",
    deleteTitle: "Delete",
    deleteConfirm: "Delete",
    uploadTitle: "Upload file",
    uploadConfirmationMsg: "Are you sure you want to upload the file?",
    uploadConfirm: "Upload",
    cancel: "Cancel"
  };
  const chosenLabels = { ...defaultLabels, ...labels };
  return /* @__PURE__ */ React14.createElement(
    FileManagerContext.Provider,
    {
      value: {
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
        setUploadedFileData
      }
    },
    /* @__PURE__ */ React14.createElement("div", { className: "rfm-main-container" }, /* @__PURE__ */ React14.createElement(Navbar_default, null), /* @__PURE__ */ React14.createElement(Workspace_default, null))
  );
};
export {
  ReactFileManager,
  ViewStyle,
  useFileManager
};
