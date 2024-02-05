const Chat = require("../Models/ChatModel")
const Message = require("../Models/MessageModel")
const User = require("../Models/UserModel")

const sendMessage = async(req,res) => {

    const {chatId, content} = req.body

    if(!chatId || !content){
        return res.status(400).json({error: "Invalid data passed into request"})
    }

    var newMessage = {
        sender : req.user._id,
        content: content,
        chat: chatId
    }
    
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "name profileImage");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path :"chat.users",
            select: "name pic email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        return res.status(201).json(message)

    } catch (error) {
        return res.status(400).json({error: "Internal server error"})
    }
}

const fetchAllMessage = async (req,res)=> {

    try {
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "name profileImage email").populate("chat")

        return res.status(200).json(messages)

    } catch (error) {
        return res.status(400).json({error: "Internal server error"})
    }

}

module.exports = {sendMessage, fetchAllMessage}