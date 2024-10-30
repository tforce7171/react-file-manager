import React from "react";
interface ManageItemModalProps {
    isVisible: boolean;
    onClose: () => void;
    itemName?: string;
    openRename: () => void;
    openDelete: () => void;
}
declare const ManageItemModal: React.FC<ManageItemModalProps>;
export default ManageItemModal;
