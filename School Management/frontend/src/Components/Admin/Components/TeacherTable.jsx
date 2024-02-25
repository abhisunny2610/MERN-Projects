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
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../Helper';
import TeacherProfile from './TeacherProfile';
import { getSingleTeacher, resetSingleTeacher } from '../../../Redux/Slices/Admin/teacher';

const TeachersList = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const { teachers, singleTeacher } = useSelector((state) => state.adminTeacher)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(resetSingleTeacher())
    };

    const handleViewClick = (id) => {
        console.log('Viewing teacher with ID:', id);
        dispatch(getSingleTeacher(id))
        openModal()
    }

    const filteredTeachers = teachers[0]?.filter(
        teacher =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <Box>
            <Flex align="center" justify="space-between" mb={2}>
                <Box>
                    <Heading as='h3' size="md">Teachers List</Heading>
                </Box>
                <Box>
                    <Input
                        placeholder="Search Teachers"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>
            <TeacherProfile isOpen={isModalOpen} onClose={closeModal} x />
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
                                    <Td color={(teacher?.performance === "Excellent" || teacher?.performance === "Average") ? "green" : "red"}>{teacher?.performance}</Td>
                                    <Td>{formatDate(teacher?.dateOfJoining)}</Td>
                                    <Td>
                                        <HStack spacing='0'>
                                            <IconButton icon={<ViewIcon color="teal" />} size='sm' background="none" onClick={() => handleViewClick(teacher._id)} />
                                            <IconButton icon={<EditIcon color="orange" />} size='sm' background="none" />
                                            <IconButton icon={<DeleteIcon color="red" />} size='sm' background="none" />
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
