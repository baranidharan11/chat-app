import useAuth from "../customHooks/useAuth";
import { auth } from "../firebase/firebase";

export default function Sidebar() {
    const { user, loading } = useAuth();

    if (loading) return <div className="w-72 p-6">Loading...</div>;

    return (
        <div className="w-72 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 p-6 h-screen flex flex-col justify-between">
            <div className="flex flex-col items-center mb-8">
                {/* Profile Picture */}
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center mb-4">
                        {/* Placeholder icon */}
                    </div>
                )}

                {/* User Info */}
                <div className="text-center text-white">
                    <p className="font-semibold text-lg">{user?.displayName}</p>
                    <p className="text-sm opacity-80">{user?.email}</p>
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={() => {
                    auth.signOut().then(() => window.location.href = "/login");
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
            >
                Logout
            </button>
        </div>
    );
}
