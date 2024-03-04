import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotice } from '../../../Redux/Slices/Admin/notice'

const UpdateNotice = ({ isOpen, onClose}) => {

    const dispatch = useDispatch()
    const [content, setContent] = useState("")
    const {singleNotice} = useSelector((state)=> state.adminNotice)
    const id = singleNotice?._id


    console.log("-----", singleNotice)

    useEffect(()=> {
        setContent(singleNotice?.content)
    }, [singleNotice])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNotice({ id: id, content: content }));
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Notice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <CKEditor 
                            editor={ClassicEditor}
                            onChange={(e, editor)=> {
                                const data = editor.getData()
                                setContent(data)
                            }}
                            data={content}
                            />

                            <Button onClick={handleSubmit} type='submit'>Submit</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateNotice