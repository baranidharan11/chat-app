// chatRoutes.js
const express = require('express');
const router = express.Router();
const { db, admin } = require('./firebaseAdmin'); // 👈 Import admin here

// POST /send-message
router.post('/send-message', async (req, res) => {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId || !text) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const chatId =
            senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

        const messageRef = db.collection('chats').doc(chatId).collection('messages');

        await messageRef.add({
            sender: senderId,
            text,
            timestamp: admin.firestore.FieldValue.serverTimestamp(), // ✅ Now admin is defined
        });

        return res.status(200).json({ message: 'Message sent' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal error' });
    }
});

// GET /messages/:user1/:user2
router.get('/messages/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    const chatId = user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;

    try {
        const messagesRef = db
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc');

        const snapshot = await messagesRef.get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json({ messages });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
