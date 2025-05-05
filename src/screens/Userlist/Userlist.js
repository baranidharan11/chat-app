import { useMemo, useState } from "react";
import { auth } from "../../firebase/firebase";

const UsersList = (props) => {
    const [search, setSearch] = useState("");
    const currentUserEmail = auth.currentUser?.email;

    const uniqueUsersWithLastMsg = useMemo(() => {
        const usersMap = new Map();

        props?.messages.forEach(msg => {
            const isSender = msg.senderEmail === currentUserEmail;
            const isReceiver = msg.receiverEmail === currentUserEmail;

            if (isSender || isReceiver) {
                const otherEmail = isSender ? msg.receiverEmail : msg.senderEmail;
                const existing = usersMap.get(otherEmail);
                if (!existing || existing.timestamp < msg.timestamp) {
                    usersMap.set(otherEmail, {
                        email: otherEmail,
                        lastMessage: msg.message,
                    });
                }
            }
        });

        return Array.from(usersMap.values()).sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
    }, [props.messages, currentUserEmail]);

    const filteredUsers = uniqueUsersWithLastMsg.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Sticky Search Bar */}
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-2">Messages</h2>
                <input
                    type="text"
                    placeholder="Search users or enter email..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && search) {
                            props.onNewMessage(search);
                        }
                    }}
                />
            </div>

            {/* Scrollable User List */}
            <ul className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li
                            key={user.email}
                            className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={() => props.onSelectUser(user.email)}
                        >
                            <div className="font-medium">{user.email}</div>
                            <div className="text-sm text-gray-500 truncate">{user.lastMessage.text}</div>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 italic mt-2">No messages</p>
                )}
            </ul>
        </div>
    );
};

export default UsersList;
