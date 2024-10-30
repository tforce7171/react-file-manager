import React from "react";
interface RenameItemModalProps {
    isVisible: boolean;
    onClose: () => void;
    toRenameItemId?: string;
    itemName?: string;
}
declare const RenameItemModal: React.FC<RenameItemModalProps>;
export default RenameItemModal;
