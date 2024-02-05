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
    Spinner,
    Flex
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url } from '../../Utils/Helper'
import UserList from './UserList'

const UpdateGroupModel = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, selectedChat, setSelectedChat } = ChatState()

    const [groupName, setGroupName] = useState() // for group name
    const [selectedUser, setSelectedUser] = useState([]) // for selected user to create group members
    const [searchInput, setSearchInput] = useState() // for search input
    const [searchResult, setSearchResult] = useState([]) // list of user using search
    const [loading, setLoading] = useState(false) // loading
    const [renameLoading, setRenameLoading] = useState(false) // loading


    const handleRename = async () => {

        if (!groupName) return

        try {
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(base_url + "chat/renamegroup", {
                chatId: selectedChat._id,
                chatName: groupName
            }, config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setRenameLoading(false)
        }
        setGroupName("")
        onClose()
    }

    const handleSearch = async (query) => {
        setSearchInput(query)

        if (!query) {
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            // getting all the users 
            const response = await axios.get(base_url + `auth/allUsers?search=${searchInput}`, config)
            setLoading(false)
            setSearchResult(response?.data?.users)

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

    }

    // to make a users array to make a guorp members
    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already exists",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admin can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(base_url + "chat/addingroup", {
                chatId: selectedChat._id,
                userId: user1._id
            }, config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)

        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }

    const handleRemoveUser = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                base_url + "chat/removefromgroup",
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupName("");
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
                                    renameLoading ? <Spinner size='xs' color='white' /> : "Rename"
                                }
                            </Button>
                        </FormControl>
                        <FormControl mt={2} mb={2}>
                            <Input type='text' size='sm' placeholder='Search user to add' onChange={(e) => handleSearch(e.target.value)}></Input>
                        </FormControl>
                        {
                            loading ? <Flex justifyContent="center" alignItems="center">
                                <Spinner />
                            </Flex> : (
                                searchResult?.slice(0, 4).map((user) => {
                                    return <UserList user={user} key={user._id} handleFunction={() => handleAddUser(user)} />
                                })
                            )
                        }
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