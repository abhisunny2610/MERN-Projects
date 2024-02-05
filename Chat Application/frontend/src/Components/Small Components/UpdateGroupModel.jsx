import React from 'react'
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
    IconButton
} from '@chakra-ui/react'

const UpdateGroupModel = ({ fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton
            display={{base: "flex"}}
            backgroundColor="lightgrey" icon={<i class="fa-solid fa-eye"></i>}
            onClick={onOpen}></IconButton>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
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