import React, { useState } from 'react'
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Text,
    IconButton,
    useToast,
    Badge,
    FormControl,
    Input,
    Spinner
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url } from '../../Utils/Helper'

const UpdateGroupModel = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, selectedChat, setSelectedChat } = ChatState()

    const [groupName, setGroupName] = useState() // for group name
    const [selectedUser, setSelectedUser] = useState([]) // for selected user to create group members
    const [searchInput, setSearchInput] = useState() // for search input
    const [searchResult, setSearchResult] = useState([]) // list of user using search
    const [loading, setLoading] = useState(false) // loading

    const handleRemoveUser = (user) => {

    }

    const handleRename = async () => {

        if(!groupName) return

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios.put(base_url + "chat/renamegroup", {
                chatId: selectedChat._id,
                chatName: groupName
            }, config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false)
        }
        setGroupName("")
        onClose()
    }

    const handleSearch = () => {

    }

    return (
        <>
            <IconButton
                display={{ base: "flex" }}
                backgroundColor="lightgrey" icon={<i class="fa-solid fa-eye"></i>}
                onClick={onOpen}></IconButton>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            selectedChat.users.map((user) => (
                                <Badge colorScheme='purple' mb={2} mr={2} key={user._id} >{user.name} <i style={{ marginLeft: "5px" }} class="fa-solid fa-xmark" onClick={() => handleRemoveUser(user)}></i></Badge>
                            ))
                        }
                        <FormControl display="flex" mt="2">
                            <Input type='text' placeholder='Rename Group' value={groupName} onChange={(e) => setGroupName(e.target.value)} size="sm" />
                            <Button ml="2" colorScheme='green' size="sm" onClick={handleRename}>
                                {
                                    loading? <Spinner size='xs' color='white' /> : "Rename"
                                }
                            </Button>
                        </FormControl>
                        <FormControl mt={2} mb={2}>
                            <Input type='text' size='sm' placeholder='Search User' onChange={(e) => handleSearch(e.target.value)}></Input>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' size="sm" onClick={() => handleRemoveUser(user)} >
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupModel