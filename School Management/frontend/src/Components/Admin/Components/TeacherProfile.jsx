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
import { formatDate, getPerformanceColor, getRandomColorScheme } from '../../../Helper'


const TeacherProfile = ({ onClose, isOpen }) => {

    const { singleTeacher } = useSelector((state) => state.adminTeacher)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontWeight="normal">Tiny Tots Inter College Teacher Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0" >
                            <Img src={singleTeacher?.profileImage} borderRadius="50%" height="150px" width="150px" />
                            <Text fontSize="22px" fontWeight="bold">{singleTeacher?.name}</Text>
                            <Text>{singleTeacher?.qualification}</Text>
                        </VStack>
                        <table className='student-profile-table'>
                            <caption>Personal Details</caption>
                            <tbody>
                                <tr>
                                    <th>Teacher Id</th>
                                    <td>{singleTeacher?.teacherId}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{singleTeacher?.name}</td>
                                </tr>
                                <tr>
                                    <th>Qualification</th>
                                    <td>{singleTeacher?.qualification}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{singleTeacher?.gender}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{singleTeacher?.email}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{formatDate(singleTeacher?.dateOfBirth)}</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>{singleTeacher?.age}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{singleTeacher?.contact?.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject Taught</th>
                                    <td>{singleTeacher?.subjects?.map((sub) => <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</td>
                                </tr>
                                <tr>
                                    <th>Class Handled</th>
                                    <td>{singleTeacher?.classesHandled?.map((sub) => <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</td>
                                </tr>
                                <tr>
                                    <th>Performance</th>
                                    <td>{singleTeacher?.performance}</td>
                                </tr>
                                <tr>
                                    <th>Salary</th>
                                    <td>{singleTeacher?.salary}</td>
                                </tr>
                                <tr>
                                    <th>Responsibilities</th>
                                    <td>{singleTeacher?.responsibilities?.map((sub)=> <Badge colorScheme={getRandomColorScheme()} marginLeft="5px">{sub}</Badge>)}</td>
                                </tr>
                                <tr>
                                    <th>Joining Date</th>
                                    <td>{formatDate(singleTeacher?.dateOfJoining)}</td>
                                </tr>
                                <tr>
                                    <th>Last Updated</th>
                                    <td>{formatDate(singleTeacher?.updatedAt)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TeacherProfile

