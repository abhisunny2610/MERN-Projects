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
                users: [req.user._id, userId] // Ensure validUserId is used here
            };

            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            return res.status(200).send(FullChat);
        }
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ error: "Chat error" });
    }
}

module.exports = { accessChat }