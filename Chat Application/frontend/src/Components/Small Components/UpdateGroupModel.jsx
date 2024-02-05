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
    useToast
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'

const UpdateGroupModel = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, selectedChat, setSelectedChat } = ChatState()
    
    const [groupName, setGroupName] = useState() // for group name
    const [selectedUser, setSelectedUser] = useState([]) // for selected user to create group members
    const [searchInput, setSearchInput] = useState() // for search input
    const [searchResult, setSearchResult] = useState([]) // list of user using search
    const [loading, setLoading] = useState(false) // loading

    return (
        <>
            <IconButton
            display={{base: "flex"}}
            backgroundColor="lightgrey" icon={<i class="fa-solid fa-eye"></i>}
            onClick={onOpen}></IconButton>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='1rem'>
                            You can scroll the content behind the modal
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme='blue' >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupModel