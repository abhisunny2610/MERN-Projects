const Chat = require("../Models/ChatModel")
const User = require("../Models/UserModel")

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("Userid params not sent with request");
        return res.status(400);
    }

    try {
        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name profileImage email",
        });

        if (isChat.length > 0) {
            return res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId] 
            };

            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            return res.status(200).send(FullChat);
        }
    } catch (error) {
        res.status(400).json({ error: "Chat error" });
    }
}

const fetchChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
        return res.status(200).json({ chats: chats })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server error" })
    }
}

module.exports = { accessChat, fetchChats }