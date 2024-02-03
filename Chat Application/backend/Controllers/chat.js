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
            return res.status(200).json(FullChat);
        }
    } catch (error) {
        res.status(400).json({ error: "Chat error" });
    }
}

const fetchChats = async (req, res) => {
    try {
        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate('users', '-password')
            .populate('groupAdmin', "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name profileImage email"
                })
                return res.status(200).send(results)
            })
    } catch (error) {
        return res.status(500).json({ error: "Internal Server error" })
    }
}

const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }

    let users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).json({ message: "More than 2 users are required to created a group" })
    }

    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        return res.status(200).json({ groupChat: fullGroupChat })
    } catch (error) {
        return res.status(400).json({ error: "Internal server error" })
    }
}

const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body

    const updateChat = await Chat.findByIdAndUpdate(chatId, {
        chatName: chatName
    }, {
        new: true
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updateChat) {
        return res.status(400).json({ error: "Chat not found" })
    }
    else {
        return res.status(200).json(updateChat)
    }
}

const addInGroup = async (req, res) => {
    const { chatId, userId } = req.body
    const addNewUser = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, {
        new: true
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!addNewUser) {
        return res.status(400).json({ error: "Chat not found" })
    }
    else {
        return res.status(200).json(addNewUser)
    }
}

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body
    const removeUser = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, {
        new: true
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!removeUser) {
        return res.status(400).json({ error: "Chat not found" })
    }
    else {
        return res.status(200).json(removeUser)
    }
}

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addInGroup }