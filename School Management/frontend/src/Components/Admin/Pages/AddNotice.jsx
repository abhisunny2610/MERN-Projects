import { Box, Button, Spinner, useToast } from '@chakra-ui/react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotice } from '../../../Redux/Slices/Admin/notice'

const AddNotice = () => {

  const [content, setContent] = useState("")
  const editorEl = useRef(null)
  const dispatch = useDispatch()
  const toast = useToast()
  const { isLoading } = useSelector((state) => state.adminNotice)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNotice({ content }))
    editorEl.current.editor.setData('')
    toast({
      title: "Notice Added",
      status: "success",
      position: 'top-right',
      isClosable: true,
      duration: 5000,
    })
  }

  return (
    <Box height="100%">
      <CKEditor
        editor={ClassicEditor}
        onChange={(e, editor) => {
          const data = editor.getData();
          setContent(data)
        }}
        ref={editorEl}
      />
      <Button type="submit" onClick={(e) => handleSubmit(e)} colorScheme='teal' mt={5}>{isLoading ? <Spinner /> : "Submit"}</Button>
    </Box>
  )
}

export default AddNotice