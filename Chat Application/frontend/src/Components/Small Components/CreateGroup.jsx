import React from 'react'
import {
    Divider, useDisclosure ,
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
} from '@chakra-ui/react'

const CreateGroup = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
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
                            <Input placeholder='Group Name' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateGroup