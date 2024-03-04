import { useState } from 'react';
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
    useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../Helper';
import { Link } from 'react-router-dom';
import { deleteStudent, resetSingleStudent, singleStudent } from '../../../Redux/Slices/Admin/student';
import StudentProfile from './StudentProfile';

const StudentList = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [searchTerm, setSearchTerm] = useState('');
    const { students } = useSelector((state) => state.adminStudent)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // filter the teacher on the basis of teacher name or email
    const filteredStudents = students?.filter(
        student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // for open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // for close the modal
    const closeModal = () => {
    setIsModalOpen(false);
    dispatch(resetSingleStudent())
    };

    // to handle the view profile and open the modal
    const handleViewClick = (id) => {
        dispatch(singleStudent(id))
        openModal()
    }

    // for delete the teacher
    const handleDeleteStudent = (id) => {
        dispatch(deleteStudent(id))
        toast({
            title: "Student Deleted",
            status: "success",
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          })
    }

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={2}>
                <Box>
                    <Heading as='h3' size="md">Student List - {students.length}</Heading>
                </Box>
                <Box>
                    <Input
                        placeholder="Search Students"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>
            <StudentProfile isOpen={isModalOpen} onClose={closeModal} x />
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
                        filteredStudents?.map((student) => {
                            return (
                                <Tr key={student._id}fontFamily="Playfair Display">
                                    <Td>{student?.studentId}</Td>
                                    <Td><HStack><Avatar name={student?.name} src={student?.profileImage} size='sm' /><Text>{student.name}</Text></HStack></Td>
                                    <Td>{student?.std}</Td>
                                    <Td>{student?.email}</Td>
                                    <Td>{student?.gender}</Td>
                                    <Td>{student?.parentGuardian?.name}</Td>
                                    <Td>{formatDate(student.dateOfBirth)}</Td>
                                    <Td>
                                        <HStack spacing='0'>
                                            <IconButton icon={<ViewIcon color="teal" />} size='sm' background="none" onClick={()=> handleViewClick(student?._id)} />
                                            <Link style={{textDecoration: "none"}}><IconButton icon={<EditIcon color="orange" />} size='sm' background="none" /></Link>
                                            <IconButton icon={<DeleteIcon color="red" />} size='sm' background="none" onClick={(e) => handleDeleteStudent(student?._id)} />
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

