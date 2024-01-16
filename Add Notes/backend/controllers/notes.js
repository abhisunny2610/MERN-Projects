const Notes = require("../models/notes")

const handleNotesSave = async(req,res)=> {
    const {title, description} = req.body

    const note = await Notes.create({
        title, description
    })

    if(note){
        res.status(201).json({
            _id: note._id, title: note.title, description: note.description
        })
    }else{
        res.status(400)
        throw new Error("Error Occured")
    }
}

const handlegetSingleNote = async (req, res) => {
    const _id = req.params.id

    const note = await Notes.findById({_id})
    if(note){
        res.status(200).json({
            _id: note._id, title: note.title, description: note.description
        })
    }else{
        res.status(400)
        throw new Error("Note not found")
    }
}

// const handleGetAllNotes = async(req,res) 

module.exports = {handleNotesSave, handlegetSingleNote}