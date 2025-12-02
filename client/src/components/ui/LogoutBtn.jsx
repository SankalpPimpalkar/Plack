import { useClerk } from "@clerk/clerk-react";

export default function LogoutBtn() {
    const { signOut } = useClerk();

    const handleLogout = () => {
        signOut({ redirectUrl: "/" });
    };

    return <button onClick={handleLogout}>Logout</button>;
}
