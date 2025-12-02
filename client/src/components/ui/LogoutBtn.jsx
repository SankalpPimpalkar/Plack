import { useClerk } from "@clerk/clerk-react";
import { DoorOpen } from "lucide-react";

export default function LogoutBtn() {
    const { signOut } = useClerk();

    const handleLogout = () => {
        signOut({ redirectUrl: "/chat" });
    };

    return (
        <button title="Logout" onClick={handleLogout}>
            <DoorOpen className="text-status-danger cursor-pointer" />
        </button>
    )
}
