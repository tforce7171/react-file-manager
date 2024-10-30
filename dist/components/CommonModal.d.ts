import React from "react";
interface CommonModalProps {
    children: React.ReactNode;
    title: string;
    isVisible: boolean;
    onClose: () => void;
}
declare const CommonModal: React.FC<CommonModalProps>;
export default CommonModal;
