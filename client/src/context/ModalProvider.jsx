import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
    openModal: () => { },
    closeModal: () => { },
});

export function ModalProvider({ children }) {
    const [ModalComponent, setModalComponent] = useState(null);
    const [modalProps, setModalProps] = useState({});

    const openModal = (Component, props = {}) => {
        setModalComponent(() => Component);
        setModalProps(props);
    };

    const closeModal = () => {
        setModalComponent(null);
        setModalProps({});
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {ModalComponent && (
                <ModalComponent {...modalProps} onClose={closeModal} />
            )}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
