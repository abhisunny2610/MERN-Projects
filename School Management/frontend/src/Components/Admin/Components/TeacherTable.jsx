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
    useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getPerformanceColor } from '../../../Helper';
import TeacherProfile from './TeacherProfile';
import { deleteTeacher, getAllTeachers, getSingleTeacher, resetSingleTeacher } from '../../../Redux/Slices/Admin/teacher';
import { Link, NavLink } from 'react-router-dom';

const TeachersList = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [searchTerm, setSearchTerm] = useState('');
    const { teachers } = useSelector((state) => state.adminTeacher)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // filter the teacher on the basis of teacher name or email
    const filteredTeachers = teachers?.filter(
        teacher =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // for open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // for close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(resetSingleTeacher())
    };

    // to handle the view profile and open the modal
    const handleViewClick = (id) => {
        dispatch(getSingleTeacher(id))
        openModal()
    }

    // for delete the teacher
    const handleDeleteTeacher = (id) => {
        dispatch(deleteTeacher(id))
        toast({
            title: "Teacher Deleted",
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
                    <Heading as='h3' size="md">Teachers List - {teachers.length}</Heading>
                </Box>
                
                <Box>
                    <Input
                        placeholder="Search Teachers"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>
            <TeacherProfile isOpen={isModalOpen} onClose={closeModal}  />
            <Table variant="striped" colorScheme="gray" fontSize='12px' size='sm'>
                <Thead>
                    <Tr>
                        <Th>Teacher Id</Th>
                        <Th>Name</Th>
                        <Th>Qualification</Th>
                        <Th>Email</Th>
                        <Th>Performance</Th>
                        <Th>Joining Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        filteredTeachers?.map((teacher) => {
                            return (
                                <Tr key={teacher._id}>
                                    <Td>{teacher?.teacherId}</Td>
                                    <Td><HStack><Avatar name={teacher?.name} src={teacher?.profileImage} size='sm' /><Text>{teacher.name}</Text></HStack></Td>
                                    <Td>{teacher?.qualification}</Td>
                                    <Td>{teacher?.email}</Td>
                                    <Td color={getPerformanceColor(teacher?.performance)}>{teacher?.performance}</Td>
                                    <Td>{formatDate(teacher?.dateOfJoining)}</Td>
                                    <Td>
                                        <HStack spacing='0'>
                                            <IconButton icon={<ViewIcon color="teal" />} size='sm' background="none" onClick={() => handleViewClick(teacher._id)} />
                                            <Link style={{textDecoration: "none"}} to={`/updateteacher/${teacher?._id}`} ><IconButton icon={<EditIcon color="orange" />} size='sm' background="none" /></Link>
                                            <IconButton icon={<DeleteIcon color="red" />} size='sm' background="none" onClick={() => handleDeleteTeacher(teacher._id)} />
                                        </HStack></Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </Box>
    );
};

export default TeachersList;
