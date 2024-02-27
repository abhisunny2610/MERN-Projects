import React, { useEffect } from 'react'
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotice, getAllNotices } from '../../../Redux/Slices/Admin/notice'
import { formatDate } from '../../../Helper'

const AllNotices = () => {

    const dispatch = useDispatch()
    const { allNotices } = useSelector((state) => state.adminNotice)

    const handleDeleteNotice = (id) => {
        dispatch(deleteNotice(id))
    }

    useEffect(() => {
        dispatch(getAllNotices())
    }, [dispatch])

    return (
        <>
            <Heading size="md">Notice List</Heading>
            {
                (allNotices.length === 0) ? <Heading size="xl">No Notice Found</Heading> : (
                    <Flex flexWrap="wrap" mt={5}>
                        {
                            allNotices?.map((notice) => {
                                return (
                                    <Card size="sm" maxW="350px" mr={5} mb={5} key={notice?._id} fontFamily={"play-fair"}>
                                        <CardHeader>
                                            <Heading size='sm'>{notice?.publishedBy?.username} <Badge p={0.5} borderRadius={5} colorScheme='green'>({notice?.publishedBy?.role})</Badge></Heading>
                                            <Text>{formatDate(notice?.createdAt)}</Text>
                                        </CardHeader>
                                        <CardBody>
                                        <Box mt="2" as="div" dangerouslySetInnerHTML={{ __html: notice?.content }} />
                                        </CardBody>
                                        <CardFooter justifyContent="flex-end" display="flex">
                                            <Button mr={2} colorScheme='yellow' size="sm">Edit</Button>
                                            <Button colorScheme='red' size="sm" onClick={()=> handleDeleteNotice(notice?._id)}>Delete</Button>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                        }
                    </Flex>
                )
            }
        </>
    )
}

export default AllNotices