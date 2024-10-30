import { createContext, useContext } from "react";
const FileManagerContext = createContext(null);
// Custom hook to use the FileManagerContext
export const useFileManager = () => {
    const context = useContext(FileManagerContext);
    if (!context) {
        throw new Error("useFileManager must be used within FileManagerProvider");
    }
    return context;
};
export { FileManagerContext };
