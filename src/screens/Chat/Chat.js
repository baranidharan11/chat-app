import { Send } from 'lucide-react';
import { useState } from 'react';

const Chat = ({ userId, currentUserEmail, messages, sendMessage, goBack }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() === '') return;
        sendMessage({
            receiverEmail: userId,
            message,
        });
        setMessage('');
    };

    const filteredMessages = messages
        .filter(msg =>
            (msg.senderEmail === currentUserEmail && msg.receiverEmail === userId) ||
            (msg.senderEmail === userId && msg.receiverEmail === currentUserEmail)
        )
        .sort((a, b) => {
            const aTime = a.timestamp?.seconds || new Date(a.timestamp).getTime();
            const bTime = b.timestamp?.seconds || new Date(b.timestamp).getTime();
            return aTime - bTime;
        });

    return (
        <div className="flex flex-col h-full max-h-screen bg-gray-100 dark:bg-gray-900 max-w-screen-sm mx-auto">
            {/* Header */}
            <div className="bg-indigo-600 text-white px-4 sm:px-6 py-4 shadow dark:bg-indigo-800 flex items-center justify-between">
                {/* Mobile Back Button */}
                <button
                    onClick={goBack}
                    className="sm:hidden text-white text-sm font-medium mr-2"
                >
                    ← Back
                </button>
                <h2 className="text-lg font-semibold truncate">Chat with {userId || "Unknown"}</h2>
                <div className="w-6 sm:w-0" /> {/* Spacer for alignment */}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
                {filteredMessages.length === 0 ? (
                    <div className="text-center text-gray-400 dark:text-gray-500 italic">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    filteredMessages.map((msg, index) => {
                        const isSender = msg.senderEmail === currentUserEmail;
                        const timestamp = msg.timestamp?.toDate
                            ? msg.timestamp.toDate()
                            : new Date(msg.timestamp);

                        return (
                            <div
                                key={index}
                                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-lg shadow text-sm break-words ${isSender
                                        ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                        }`}
                                >
                                    <p>{msg.message}</p>
                                    <div className="text-xs text-right mt-1 text-gray-300 dark:text-gray-400">
                                        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input */}
            <div className="bg-white border-t dark:bg-gray-800 dark:border-gray-700 px-4 py-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition dark:bg-gray-800 dark:text-white"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-full text-white dark:bg-indigo-700 dark:hover:bg-indigo-600"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
