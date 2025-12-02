import { useModal } from "../context/ModalProvider";
import CreateChannelModal from "./modals/CreateChannelModal";
import AddMemberModal from "./modals/AddMemberModal";

export default function ModalRenderer() {
    const { modal, closeModal } = useModal();

    if (!modal.isOpen) return null;

    const MODAL_MAP = {
        "createChannel": <CreateChannelModal {...modal.props} onClose={closeModal} />,
        "addMember": <AddMemberModal {...modal.props} onClose={closeModal} />,
    };
    console.log(MODAL_MAP[modal.type])

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            {MODAL_MAP[modal.type] || null}
        </div>
    );
}
