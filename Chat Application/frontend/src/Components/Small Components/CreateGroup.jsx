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
    Flex
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url } from '../../Utils/Helper'
import UserList from './UserList'

const CreateGroup = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, chats, setChats } = ChatState()

    const [groupName, setGroupName] = useState()
    const [selectedUser, setSelectedUser] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

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

            const response = await axios.get(base_url + `auth/allUsers?search=${searchInput}`, config)
            setLoading(false)
            setSearchResult(response?.data?.users)

        } catch (error) {
            console.log("error in get all user", error)
        }

    }

    const handleGroup = () => {

    }

    const handleSubmit = () => {

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
                        {/* selected user */}
                        {
                            loading ? <Flex justifyContent="center" alignItems="center">
                                <Spinner />
                            </Flex> : (
                                searchResult.map((user) => {
                                    return <UserList user={user} key={user._id} handleFunction={() => handleGroup()} />
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