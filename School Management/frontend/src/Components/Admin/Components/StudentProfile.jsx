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
    Tbody,
    Tr,
    Td,
    Table,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { formatDate, getRandomColorScheme } from '../../../Helper'


const StudentProfile = ({ onClose, isOpen }) => {

    const { singleStudent } = useSelector((state) => state.adminStudent)
    console.log("----", singleStudent)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center' fontWeight="normal">Tiny Tots Inter College Student Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing="0" >
                            <Img src={singleStudent?.profileImage} borderRadius="10%" height="150px" width="150px" />
                            <Text fontSize="22px" fontWeight="bold">{singleStudent?.name}</Text>
                            <Text>{singleStudent?.std}</Text>
                        </VStack>
                        <table className='student-profile-table'>
                            <caption>Personal Details</caption>
                            <tbody>
                                <tr>
                                    <th>Student Id</th>
                                    <td>{singleStudent?.studentId}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{singleStudent?.name}</td>
                                </tr>
                                <tr>
                                    <th>Class</th>
                                    <td>{singleStudent?.std}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{singleStudent?.gender}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{singleStudent?.email}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{formatDate(singleStudent?.dateOfBirth)}</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>{singleStudent?.age}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{singleStudent?.contact?.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='student-profile-table'>
                            <caption>Addmission Details</caption>
                            <tbody>
                                <tr>
                                    <th>Admission Date</th>
                                    <td>{formatDate(singleStudent?.createdAt)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='student-profile-table'>
                            <caption>Guardian Details</caption>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{singleStudent?.parentGuardian?.name}</td>
                                </tr>
                                <tr>
                                    <th>RelationShip</th>
                                    <td>{singleStudent?.parentGuardian?.relationship}</td>
                                </tr>

                                <tr>
                                    <th>Email</th>
                                    <td>{singleStudent?.parentGuardian?.contact?.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{singleStudent?.parentGuardian?.contact?.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='student-profile-table'>
                            <caption>Address Details</caption>
                            <tbody>
                                <tr>
                                    <th>street</th>
                                    <td>{singleStudent?.address?.street}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{singleStudent?.address?.city}</td>
                                </tr>

                                <tr>
                                    <th>State</th>
                                    <td>{singleStudent?.address?.state}</td>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <td>{singleStudent?.address?.country}</td>
                                </tr>
                                <tr>
                                    <th>Postal Code</th>
                                    <td>{singleStudent?.address?.postalCode}</td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default StudentProfile

