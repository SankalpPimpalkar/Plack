import React from "react";
import { useModal } from "../../context/ModalProvider";
import { leaveChannel } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useOnlineUser } from "../../context/OnlineUserProvider";

export default function ChannelDetailsModal({ channel, members }) {
    const { closeModal } = useModal();
    const { onlineUsers } = useOnlineUser()
    const navigate = useNavigate()

    async function handleLeaveChannel() {
        if (channel._id) {
            console.log(channel._id)
            await leaveChannel({ channelId: channel._id })
            closeModal()
            navigate("/channels")
            window.location.reload()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-bg-dark text-white w-[420px] h-[520px] rounded-xl shadow-xl p-6 flex flex-col">

                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        #{channel?.name || "Channel Details"}
                    </h2>

                    <button
                        className="text-primary-light hover:text-primary-dark"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </header>

                {/* Channel Description */}
                <p className="text-sm text-muted mb-4">
                    {channel?.description || "No description available."}
                </p>

                {/* Members */}
                <h3 className="text-sm font-semibold text-primary-light mb-2">
                    Members ({members?.length || 0})
                </h3>

                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    {members?.length > 0 ? (
                        members.map((m, i) => (
                            <div
                                key={m.id || i}
                                className="flex items-center gap-3 bg-bg-light p-3 rounded-lg"
                            >
                                <img
                                    src={m.imageUrl}
                                    className="w-10 h-10 rounded-full"
                                    alt=""
                                />
                                <div>
                                    <p className="font-medium">{m.name}</p>
                                    <p className={`text-xs ${onlineUsers.includes(m._id) ? "text-status-success" : "text-muted"}`}>
                                        {
                                            onlineUsers.includes(m._id) ? "Online" : "Offline"
                                        }
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted">No members found.</p>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex justify-end gap-2">
                    <button
                        onClick={handleLeaveChannel}
                        className="px-4 py-2 bg-status-danger text-amber-50 rounded hover:bg-red-900"
                    >
                        Leave
                    </button>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-bg-light text-amber-50 rounded hover:bg-bg-grey"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
