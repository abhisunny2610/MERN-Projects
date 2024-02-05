import React, { useState } from 'react'
import {
    Divider, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Spinner,
    Flex,
    Badge
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url } from '../../Utils/Helper'
import UserList from './UserList'

const CreateGroup = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, chats, setChats } = ChatState()

    const [groupName, setGroupName] = useState() // for group name
    const [selectedUser, setSelectedUser] = useState([]) // for selected user to create group members
    const [searchInput, setSearchInput] = useState() // for search input
    const [searchResult, setSearchResult] = useState([]) // list of user using search
    const [loading, setLoading] = useState(false) // loading


    // to handle search 
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
            console.log("error in get all user", error)
        }

    }

    // to make a users array to make a guorp members
    const handleGroup = (user) => {
        if(selectedUser.includes(user)){
            toast({
                title: "User already exists",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        setSelectedUser([...selectedUser, user])
    }

    // to remove the user 
    const handleRemoveUser = (user) => {
        setSelectedUser(selectedUser.filter((sel)=>sel._id !== user._id))
    }

    // for handle a submit to create a group chat
    const handleSubmit = async () => {
        if(groupName === ""){
            toast({
                title: "Group name required",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return
        }

        if(selectedUser.length <=1){
            toast({
                title: "Minimum 2 users required",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const response = await axios.post(base_url + `chat/creategroup`, {
                name: groupName,
                users : JSON.stringify(selectedUser.map((u) => u._id))
            },
            config
            )
            setChats([response?.data, ...chats]);
            onClose();
            toast({
              title: "New Group Chat Created!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Create New Group</ModalHeader>
                    <ModalCloseButton />
                    <Divider height='1px' background='grey' />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Group Name</FormLabel>
                            <Input type='text' placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4} mb={2}>
                            <FormLabel>Search User</FormLabel>
                            <Input type='text' placeholder='Search User' onChange={(e) => handleSearch(e.target.value)}></Input>
                        </FormControl>
                        
                         {/* display selected users */}
                        {
                            selectedUser.map((user) => (
                                <Badge colorScheme='purple' mb={2} mr={2} key={user._id} >{user.name} <i style={{marginLeft: "5px"}} className="fa-solid fa-xmark" onClick={()=> handleRemoveUser(user)}></i></Badge>
                            ))
                        }

                         {/* display users list */}
                        {
                            loading ? <Flex justifyContent="center" alignItems="center">
                                <Spinner />
                            </Flex> : (
                                searchResult?.slice(0,4).map((user) => {
                                    return <UserList user={user} key={user._id} handleFunction={() => handleGroup(user)} />
                                })
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateGroup