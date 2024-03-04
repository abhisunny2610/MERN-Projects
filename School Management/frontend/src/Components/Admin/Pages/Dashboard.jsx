import React, { useEffect, useState } from 'react'
import TotalCountCard from '../Components/TotalCountCard'
import { Button, Card, CardBody, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotices } from '../../../Redux/Slices/Admin/notice'
import { getAllTeachers, getRecentFiveTeacher, getSingleTeacher, resetSingleTeacher } from '../../../Redux/Slices/Admin/teacher'
import { fetchAllStudents } from '../../../Redux/Slices/Admin/student'
import TeacherProfile from '../Components/TeacherProfile'
import { countGenders } from '../../../Helper'
import GenderChart from '../Charts/GenderChart'
import TeacherLineChart from '../Charts/TeacherLineChart'
import Calendar from './Calander'


const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { teachers, recentFiveTeachers } = useSelector((state) => state.adminTeacher)
    const { students } = useSelector((state) => state.adminStudent)
    const { allNotices } = useSelector((state) => state.adminNotice)

    // for gender counts
    const { femaleCounts, maleCounts, otherCounts } = countGenders(teachers);

    const dispatch = useDispatch()

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


    useEffect(() => {
        dispatch(getAllNotices())
        dispatch(getAllTeachers())
        dispatch(fetchAllStudents())
        dispatch(getRecentFiveTeacher())
    }, [dispatch])

    return (
        <>
            <HStack justifyContent={"space-between"}>
                <TotalCountCard flex={1} count={students.length} bgcolor="teal" desc="Total Student" />
                <TotalCountCard flex={1} count={teachers.length} bgcolor="red" desc="Total Teacher" />
                <TotalCountCard flex={1} count={allNotices.length} bgcolor="blue.800" desc="Total Notice" />
                <TotalCountCard flex={1} count="700" bgcolor="orange" desc="Total Complains" />
            </HStack>
            <TeacherProfile isOpen={isModalOpen} onClose={closeModal} x />
            <HStack alignItems={"flex-start"}>
                <VStack>
                    <Card mt="3" width="100%" flex={1}>
                        <Text pl="3" fontWeight="500">Recent Added Teachers</Text>
                        <CardBody>
                            <Table size={"sm"} mt={3}>
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Name</Th>
                                        <Th>Qualification</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        recentFiveTeachers.map((teacher, index) => {
                                            return (<Tr key={index}>
                                                <Td>{teacher?.teacherId}</Td>
                                                <Td>{teacher?.name}</Td>
                                                <Td>{teacher?.qualification}</Td>
                                                <Td><Button size='sm' colorScheme='blue' onClick={() => handleViewClick(teacher._id)}>View</Button></Td>
                                            </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </CardBody>
                    </Card>
                    <Card w="100%">
                        <Text pl="3" fontWeight="500">Teacher Added Per Month</Text>
                        <CardBody>
                            <TeacherLineChart teacherData={teachers} />
                        </CardBody>
                    </Card>
                </VStack>
                <VStack flex={1} mt={3}>
                    <Card width="100%">
                        <Text pl="3" fontWeight="500">Teacher Gender Counts</Text>
                        <CardBody>
                            <GenderChart femaleCounts={femaleCounts} maleCounts={maleCounts} otherCounts={otherCounts} />
                        </CardBody>
                    </Card>
                    <Card width="100%" height="370px" p={2} overflowY="hidden">
                        <Calendar />
                    </Card>
                </VStack>
            </HStack>
            <HStack>

            </HStack>
        </>
    )
}

export default Dashboard