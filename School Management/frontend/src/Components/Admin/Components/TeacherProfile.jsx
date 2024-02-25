import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Img,
    Text,
    VStack,
    Badge,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { formatDate, getRandomColorScheme } from '../../../Helper'


const TeacherProfile = ({ onClose, isOpen }) => {

    const { singleTeacher } = useSelector((state) => state.adminTeacher)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontWeight="normal">Tiny Tots Inter College {singleTeacher?.teacherId}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0" >
                            <Img src={singleTeacher?.profileImage} borderRadius="50%" height="150px" width="150px" />
                            <Text fontSize="22px" fontWeight="bold">{singleTeacher?.name}</Text>
                            <Text>{singleTeacher?.qualification}</Text>
                        </VStack>
                        <VStack spacing="2" marginTop="10px" alignItems="flex-start">
                            <Text>Subject Taught: {singleTeacher?.subjects?.map((sub)=> <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</Text>
                            <Text>Class Handled: {singleTeacher?.classesHandled?.map((sub)=> <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</Text>
                            <Text>Gender : {singleTeacher?.gender}</Text>
                            <Text>Age : {singleTeacher?.age}</Text>
                            <Text>Date Of Birth : {formatDate(singleTeacher?.dateOfBirth)}</Text>
                            <Text>Performance : {singleTeacher?.performance}</Text>
                            <Text>Total Experience : {singleTeacher?.experience}</Text>
                            <Text>Salary : {singleTeacher?.salary}</Text>
                            <Text>Joining Date : {formatDate(singleTeacher?.dateOfJoining)}</Text>
                            <Text>Email : {singleTeacher?.email}</Text>
                            <Text>Contact : {singleTeacher?.contact?.phone}</Text>
                            <Text>Responsibilities: {singleTeacher?.responsibilities?.map((sub)=> <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</Text>
                            <Text>Last Updated : {formatDate(singleTeacher?.updatedAt)}</Text>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TeacherProfile

