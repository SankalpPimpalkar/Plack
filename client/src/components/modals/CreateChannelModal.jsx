import { useModal } from "../../context/ModalProvider";
import { useState } from "react";
import { createChannel } from "../../lib/api";
import { useNavigate } from "react-router-dom"

export default function CreateChannelModal() {
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleCreate = async () => {
        if (!name.trim()) return;

        setLoading(true);

        try {
            const response = await createChannel({ name, description })
            closeModal();
            setName("");
            setDescription("")
            if (response?.channel?._id) {
                navigate(`/channels/${response.channel._id}`)
                window.location.reload()
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-bg-grey p-6 rounded-xl w-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Create Channel</h2>

                <input
                    type="text"
                    placeholder="Channel name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 text-white p-2 rounded-md outline-none"
                />

                <textarea
                    placeholder="Add Description (Optional)"
                    value={description}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-900 text-white mt-2 p-2 rounded-md outline-none"
                />

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-neutral-700 rounded-md text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 rounded-md text-white disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
