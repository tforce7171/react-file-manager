import React from "react";
interface DelItemModalProps {
    isVisible: boolean;
    onClose: () => void;
    toDeleteItemId?: string;
    itemName?: string;
}
declare const DelItemModal: React.FC<DelItemModalProps>;
export default DelItemModal;
