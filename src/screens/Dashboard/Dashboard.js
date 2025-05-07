// src/screens/Dashboard/Dashboard.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UsersList from "../Userlist/Userlist";
import Chat from "../Chat/Chat";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/messages/actions";

function Dashboard(props) {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const navigate = useNavigate();

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const currentUser = props.auth.data;
    const displayName = currentUser?.name || "Anonymous";
    const email = currentUser?.email || "";

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

                {/* Theme Toggle */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Sidebar */}
                <div className={`w-full md:w-1/3 flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-gray-300 dark:border-gray-700 ${selectedUserId ? "hidden md:flex" : "flex"}`}>
                    {/* Sticky Profile Header */}
                    <div className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-500 text-white p-2 rounded-full">
                                    <User size={24} />
                                </div>
                                <div>
                                    <span className="font-semibold block">{displayName}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{email}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Users List */}
                    <div className="flex-1 overflow-y-auto">
                        <UsersList
                            onSelectUser={setSelectedUserId}
                            onNewMessage={(email) => setSelectedUserId(email)}
                            messages={props.messages.data}
                        />
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-full md:flex-1 overflow-hidden">
                    {selectedUserId ? (
                        <Chat
                            userId={selectedUserId}
                            sendMessage={props.sendMessage}
                            messages={props.messages.data}
                            currentUserEmail={email}
                            goBack={() => setSelectedUserId(null)} // 👈 Back support
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                            Select a user to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    messages: state.messages,
});

const mapDispatchToProps = () => ({
    sendMessage: (messageObj) => sendMessage(messageObj),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
