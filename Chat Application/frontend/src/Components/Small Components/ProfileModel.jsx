import React from 'react'
import {
    IconButton, Image, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

const ProfileModel = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {
                children ? (<span onClick={onOpen}>{children}</span>) : (
                    <IconButton icon={<i class="fa-solid fa-eye"></i>} onClick={onOpen} display={{ base: 'flex' }} />
                )
            }
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize='26px' fontFamily='Work sans' display='flex' justifyContent='center' >{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' justifyContent={'center'} >
                        <Image borderRadius='full' boxSize='150px' src={user.profileImage} alt={user.name}></Image>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModel