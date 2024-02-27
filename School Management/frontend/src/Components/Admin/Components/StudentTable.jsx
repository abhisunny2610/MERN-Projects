import { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Avatar,
    HStack,
    Text,
    Heading,
    IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../Helper';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const { students } = useSelector((state) => state.adminStudent)
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // filter the teacher on the basis of teacher name or email
    const filteredStudents = students?.filter(
        student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // for open the modal
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // for close the modal
    // const closeModal = () => {
    // setIsModalOpen(false);
    // dispatch(resetSingleTeacher())
    // };

    // to handle the view profile and open the modal
    // const handleViewClick = (id) => {
    //     dispatch(getSingleTeacher(id))
    //     openModal()
    // }

    // for delete the teacher
    // const handleDeleteTeacher = (id) => {
    //     dispatch(deleteTeacher(id))
    // }

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={2}>
                <Box>
                    <Heading as='h3' size="md">Student List</Heading>
                </Box>
                <Box>
                    <Input
                        placeholder="Search Teachers"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>
            {/* <TeacherProfile isOpen={isModalOpen} onClose={closeModal} x /> */}
            <Table variant="striped" colorScheme="gray" fontSize='12px' size='sm'>
                <Thead>
                    <Tr>
                        <Th>Student Id</Th>
                        <Th>Name</Th>
                        <Th>Class</Th>
                        <Th>Email</Th>
                        <Th>Gender</Th>
                        <Th>Guardian Name</Th>
                        <Th>DOB</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        filteredStudents?.map((studnet) => {
                            return (
                                <Tr key={studnet._id}>
                                    <Td>{studnet?.studentId}</Td>
                                    <Td><HStack><Avatar name={studnet?.name} src={studnet?.profileImage} size='sm' /><Text>{studnet.name}</Text></HStack></Td>
                                    <Td>{studnet?.std}</Td>
                                    <Td>{studnet?.email}</Td>
                                    <Td>{studnet?.gender}</Td>
                                    <Td>{studnet?.parentGuardian?.name}</Td>
                                    <Td>{formatDate(studnet.dateOfBirth)}</Td>
                                    <Td>
                                        <HStack spacing='0'>
                                            <IconButton icon={<ViewIcon color="teal" />} size='sm' background="none" />
                                            <Link style={{textDecoration: "none"}}><IconButton icon={<EditIcon color="orange" />} size='sm' background="none" /></Link>
                                            <IconButton icon={<DeleteIcon color="red" />} size='sm' background="none" />
                                        </HStack></Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </Box>
    )
};

export default StudentList;

