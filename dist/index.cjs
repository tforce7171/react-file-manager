"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  ReactFileManager: () => ReactFileManager,
  ViewStyle: () => ViewStyle,
  useFileManager: () => useFileManager
});
module.exports = __toCommonJS(lib_exports);

// lib/ReactFileManager.tsx
var import_react14 = __toESM(require("react"), 1);

// lib/components/Navbar.tsx
var import_react2 = __toESM(require("react"), 1);

// lib/context/FileManagerContext.tsx
var import_react = require("react");
var FileManagerContext = (0, import_react.createContext)(null);
var useFileManager = () => {
  const context = (0, import_react.useContext)(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }
  return context;
};

// lib/components/Navbar.tsx
var Navbar = () => {
  const { fs, setCurrentFolder, onRefresh } = useFileManager();
  const initialFolders = (0, import_react2.useMemo)(() => {
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
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "rfm-navbar" }, /* @__PURE__ */ import_react2.default.createElement(
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
  ), /* @__PURE__ */ import_react2.default.createElement("ul", { className: "rfm-navbar-list" }, initialFolders.map((f) => /* @__PURE__ */ import_react2.default.createElement(
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
var import_react13 = __toESM(require("react"), 1);
var import_react_dropzone = require("react-dropzone");

// lib/components/FileIcon.tsx
var import_react4 = __toESM(require("react"), 1);

// lib/components/SvgIcon.tsx
var import_react3 = __toESM(require("react"), 1);
var SvgIcon = ({ svgType, ...props }) => {
  const svgContent = () => {
    switch (svgType) {
      case "file":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { version: "1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", enableBackground: "new 0 0 48 48" }, /* @__PURE__ */ import_react3.default.createElement("polygon", { fill: "#90CAF9", points: "40,45 8,45 8,3 30,3 40,13" }), /* @__PURE__ */ import_react3.default.createElement("polygon", { fill: "#E1F5FE", points: "38.5,14 29,14 29,4.5" }));
      case "folder":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { version: "1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", enableBackground: "new 0 0 48 48" }, /* @__PURE__ */ import_react3.default.createElement("path", { fill: "#FFA000", d: "M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z" }), /* @__PURE__ */ import_react3.default.createElement("path", { fill: "#FFCA28", d: "M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z" }));
      case "arrow-up":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 1024 1024" }, /* @__PURE__ */ import_react3.default.createElement("path", { d: "M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" }));
      case "arrow-down":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ import_react3.default.createElement("path", { d: "M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" }));
      case "close":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, /* @__PURE__ */ import_react3.default.createElement("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" }));
      case "list":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ import_react3.default.createElement("path", { d: "M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z" }));
      case "icons":
        return /* @__PURE__ */ import_react3.default.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ import_react3.default.createElement("path", { d: "M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z" }));
      default:
        return null;
    }
  };
  return /* @__PURE__ */ import_react3.default.createElement("div", { ...props }, svgContent());
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
  const fileExtension = (0, import_react4.useMemo)(() => {
    if (!name.includes(".")) {
      return "";
    }
    const nameArray = name.split(".");
    return `.${nameArray[nameArray.length - 1]}`;
  }, [name]);
  return /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      onClick: handleClick,
      onContextMenu: (event) => handleContextMenu(event, id, name),
      className: "rfm-file-icon-container"
    },
    /* @__PURE__ */ import_react4.default.createElement(SvgIcon_default, { svgType: isDir ? "folder" : "file", className: "rfm-file-icon-svg" }),
    !isDir && /* @__PURE__ */ import_react4.default.createElement("span", { className: "rfm-file-icon-extension" }, fileExtension),
    /* @__PURE__ */ import_react4.default.createElement("span", { className: "rfm-file-icon-name" }, name)
  );
};
var FileIcon_default = FileIcon;

// lib/components/NewFolderIcon.tsx
var import_react5 = __toESM(require("react"), 1);
var NewFolderIcon = ({ onClick }) => {
  return /* @__PURE__ */ import_react5.default.createElement("div", { onClick, className: "rfm-folder-icon-container" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "rfm-folder-icon-span" }, "+"));
};
var NewFolderIcon_default = NewFolderIcon;

// lib/components/FolderPath.tsx
var import_react6 = __toESM(require("react"), 1);
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
  const parentPath = (0, import_react6.useMemo)(() => {
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
  const currentPath = (0, import_react6.useMemo)(() => {
    const currentFolderInfo = fs.find((f) => f.id === currentFolder);
    return currentFolderInfo ? currentFolderInfo.name : "";
  }, [fs, currentFolder]);
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "rfm-workspace-header" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "rfm-folder-path-container" }, /* @__PURE__ */ import_react6.default.createElement(
    SvgIcon_default,
    {
      svgType: "arrow-up",
      onClick: goUp,
      className: "rfm-folder-path-svg"
    }
  ), /* @__PURE__ */ import_react6.default.createElement("span", { className: "rfm-folder-path-span" }, parentPath, /* @__PURE__ */ import_react6.default.createElement("b", null, currentPath))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "rfm-header-container" }, /* @__PURE__ */ import_react6.default.createElement(
    SvgIcon_default,
    {
      svgType: "list",
      className: `rfm-header-icon ${viewStyle === "list" && "rfm-header-icon--selected"}`,
      onClick: () => setViewStyle("list" /* List */)
    }
  ), /* @__PURE__ */ import_react6.default.createElement(
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
var import_react8 = __toESM(require("react"), 1);

// lib/components/CommonModal.tsx
var import_react7 = __toESM(require("react"), 1);
var import_react_draggable = __toESM(require("react-draggable"), 1);
var CommonModal = ({
  children,
  title,
  isVisible,
  onClose
}) => {
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ import_react7.default.createElement(import_react_draggable.default, { bounds: "#react-file-manager-workspace" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "rfm-modal-container" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "rfm-modal-header" }, /* @__PURE__ */ import_react7.default.createElement("h3", { className: "rfm-modal-title" }, title), /* @__PURE__ */ import_react7.default.createElement(
    SvgIcon_default,
    {
      onClick: onClose,
      svgType: "close",
      className: "rfm-modal-icon"
    }
  )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "rfm-modal-content" }, children)));
};
var CommonModal_default = CommonModal;

// lib/components/NewFolderModal.tsx
var NewFolderModal = ({ isVisible, onClose }) => {
  const { labels, onCreateFolder } = useFileManager();
  const [folderNameLength, setFolderNameLength] = (0, import_react8.useState)(0);
  const folderNameRef = (0, import_react8.useRef)(null);
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
  return /* @__PURE__ */ import_react8.default.createElement(CommonModal_default, { title: labels.addFolderTitle, isVisible, onClose }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement(
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
  )), /* @__PURE__ */ import_react8.default.createElement(
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
var import_react9 = __toESM(require("react"), 1);
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
  return /* @__PURE__ */ import_react9.default.createElement(
    CommonModal_default,
    {
      title: `${labels.deleteTitle} ${itemName || ""}?`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ import_react9.default.createElement(
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
var import_react10 = __toESM(require("react"), 1);
var RenameItemModal = ({
  isVisible,
  onClose,
  toRenameItemId,
  itemName
}) => {
  const { labels, onRename } = useFileManager();
  const [itemNameLength, setItemNameLength] = (0, import_react10.useState)(0);
  const itemNameRef = (0, import_react10.useRef)(null);
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
  return /* @__PURE__ */ import_react10.default.createElement(
    CommonModal_default,
    {
      title: `${labels.renameTitle} ${itemName || ""}?`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement(
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
    )), /* @__PURE__ */ import_react10.default.createElement(
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
var ScrollAreaPrimitive = __toESM(require("@radix-ui/react-scroll-area"), 1);
var import_tailwind_merge = require("tailwind-merge");
var React10 = __toESM(require("react"), 1);

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
  return (0, import_tailwind_merge.twMerge)(clsx(inputs));
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
var import_react11 = __toESM(require("react"), 1);
var ManageItemModal = ({
  isVisible,
  onClose,
  itemName,
  openRename,
  openDelete
}) => {
  const { labels } = useFileManager();
  return /* @__PURE__ */ import_react11.default.createElement(
    CommonModal_default,
    {
      title: `${labels.manageTitle} ${itemName || ""}`,
      isVisible,
      onClose
    },
    /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("form", { className: "rfm-new-folder-modal-form", onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ import_react11.default.createElement(
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
    ), /* @__PURE__ */ import_react11.default.createElement(
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
var import_react12 = __toESM(require("react"), 1);
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
  return /* @__PURE__ */ import_react12.default.createElement(
    CommonModal_default,
    {
      title: labels.uploadTitle,
      isVisible,
      onClose
    },
    /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement("h4", { className: "rfm-upload-file-modal-title" }, labels.uploadConfirmationMsg), /* @__PURE__ */ import_react12.default.createElement("div", { className: "rfm-upload-file-modal-container" }, /* @__PURE__ */ import_react12.default.createElement(
      "button",
      {
        onClick: onConfirm,
        type: "button",
        className: "rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm"
      },
      labels.uploadConfirm
    ), /* @__PURE__ */ import_react12.default.createElement(
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
var import_react_table = require("@tanstack/react-table");
var columnHelper = (0, import_react_table.createColumnHelper)();
var columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => /* @__PURE__ */ import_react13.default.createElement("div", { className: "rfm-workspace-list-icon-td" }, /* @__PURE__ */ import_react13.default.createElement(SvgIcon_default, { svgType: info.row.original.isDir ? "folder" : "file", className: "rfm-workspace-list-icon" }), /* @__PURE__ */ import_react13.default.createElement("p", null, info.getValue()))
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
  const [newFolderModalVisible, setNewFolderModalVisible] = (0, import_react13.useState)(false);
  const [toDeleteItem, setToDeleteItem] = (0, import_react13.useState)(null);
  const [toRenameItem, setToRenameItem] = (0, import_react13.useState)(null);
  const [uploadFileModalVisible, setUploadFileModalVisible] = (0, import_react13.useState)(false);
  const [toManageItem, setToManageItem] = (0, import_react13.useState)(null);
  const setUploadModalVisible = (value) => {
    if (viewOnly) {
      setUploadFileModalVisible(false);
    } else {
      setUploadFileModalVisible(value);
    }
  };
  (0, import_react13.useEffect)(() => {
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
  const onDrop = (0, import_react13.useCallback)(
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
  const { getRootProps, isDragAccept } = (0, import_react_dropzone.useDropzone)({
    noClick: true,
    noKeyboard: true,
    onDrop
  });
  const currentFolderFiles = (0, import_react13.useMemo)(() => {
    const files = fs.filter((f) => "parentId" in f && f.parentId === currentFolder);
    return files;
  }, [fs, currentFolder]);
  const table = (0, import_react_table.useReactTable)({
    data: currentFolderFiles,
    columns,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table.getSortedRowModel)(),
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
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "rfm-workspace" }, /* @__PURE__ */ import_react13.default.createElement(
    "section",
    {
      id: "react-file-manager-workspace",
      className: `rfm-workspace ${isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""}`,
      ...getRootProps()
    },
    /* @__PURE__ */ import_react13.default.createElement(FolderPath_default, null),
    /* @__PURE__ */ import_react13.default.createElement(ScrollArea, null, /* @__PURE__ */ import_react13.default.createElement("div", { className: "rfm-workspace-file-listing" }, viewStyle === "icons" && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, currentFolderFiles.map((f) => /* @__PURE__ */ import_react13.default.createElement("button", { key: f.id, onDoubleClick: () => handleDoubleClick(f.id) }, /* @__PURE__ */ import_react13.default.createElement(FileIcon_default, { id: f.id, name: f.name, isDir: f.isDir, handleContextMenu }))), !viewOnly && /* @__PURE__ */ import_react13.default.createElement(NewFolderIcon_default, { onClick: openNewFolderModal })), viewStyle === "list" && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement("table", { className: "w-full" }, /* @__PURE__ */ import_react13.default.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ import_react13.default.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ import_react13.default.createElement("th", { key: header.id, className: "rfm-workspace-list-th", onClick: header.column.getToggleSortingHandler() }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "rfm-workspace-list-th-content" }, (0, import_react_table.flexRender)(header.column.columnDef.header, header.getContext()), header.column.getIsSorted() ? header.column.getIsSorted() === "desc" ? /* @__PURE__ */ import_react13.default.createElement(SvgIcon_default, { svgType: "arrow-down", className: "rfm-header-sort-icon" }) : /* @__PURE__ */ import_react13.default.createElement(SvgIcon_default, { svgType: "arrow-up", className: "rfm-header-sort-icon" }) : "")))))), /* @__PURE__ */ import_react13.default.createElement("tbody", null, table.getRowModel().rows.map((row) => /* @__PURE__ */ import_react13.default.createElement("tr", { key: row.id, className: "rfm-workspace-list-icon-row" }, row.getVisibleCells().map((cell) => /* @__PURE__ */ import_react13.default.createElement(
      "td",
      {
        key: cell.id,
        className: "rfm-workspace-list-align-txt",
        onClick: () => handleClick(row.original),
        onContextMenu: (event) => handleContextMenu(event, row.original.id, row.original.name),
        onDoubleClick: () => handleDoubleClick(row.original.id)
      },
      (0, import_react_table.flexRender)(cell.column.columnDef.cell, cell.getContext())
    ))))))))),
    !viewOnly && /* @__PURE__ */ import_react13.default.createElement("button", { className: "rfm-workspace-list-add-folder", onClick: openNewFolderModal }, labels.addFolderButton)
  ), !viewOnly && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(
    NewFolderModal_default,
    {
      isVisible: newFolderModalVisible,
      onClose: () => setNewFolderModalVisible(false)
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    DelItemModal_default,
    {
      itemName: toDeleteItem?.name,
      toDeleteItemId: toDeleteItem?.id,
      isVisible: !!toDeleteItem,
      onClose: () => setToDeleteItem(null)
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
    RenameItemModal_default,
    {
      itemName: toRenameItem?.name,
      toRenameItemId: toRenameItem?.id,
      isVisible: !!toRenameItem,
      onClose: () => setToRenameItem(null)
    }
  ), /* @__PURE__ */ import_react13.default.createElement(
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
  ), /* @__PURE__ */ import_react13.default.createElement(
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
  const [currentFolder, setCurrentFolder] = (0, import_react14.useState)("0");
  const [uploadedFileData, setUploadedFileData] = (0, import_react14.useState)();
  const [viewStyle, setViewStyle] = (0, import_react14.useState)("list" /* List */);
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
  return /* @__PURE__ */ import_react14.default.createElement(
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
    /* @__PURE__ */ import_react14.default.createElement("div", { className: "rfm-main-container" }, /* @__PURE__ */ import_react14.default.createElement(Navbar_default, null), /* @__PURE__ */ import_react14.default.createElement(Workspace_default, null))
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactFileManager,
  ViewStyle,
  useFileManager
});
