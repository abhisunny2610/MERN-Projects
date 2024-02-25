import React, { useEffect } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotices } from '../../../Redux/Slices/Admin/notice'
import { formatDate } from '../../../Helper'

const AllNotices = () => {

    const dispatch = useDispatch()
    const { allNotices } = useSelector((state) => state.adminNotice)

    useEffect(() => {
        dispatch(getAllNotices())
    }, [])

    return (
        <>

            {
                (allNotices.length === 0) ? <Heading size="xl">No Notice Found</Heading> : (
                    <Flex flexWrap="wrap">
                        {
                            allNotices?.map((notice) => {
                                return (
                                    <Card size="sm" maxW="350px" mr={5} mb={5} key={notice?._id} fontFamily={"play-fair"}>
                                        <CardHeader>
                                            <Heading size='sm'>{notice?.publishedBy?.username} <Badge p={0.5} borderRadius={5} colorScheme='green'>({notice?.publishedBy?.role})</Badge></Heading>
                                            <Text>{formatDate(notice?.createdAt)}</Text>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{notice?.content}</Text>
                                        </CardBody>
                                        <CardFooter justifyContent="flex-end" display="flex">
                                            <Button mr={2} colorScheme='yellow' size="sm">Edit</Button>
                                            <Button colorScheme='red' size="sm">Delete</Button>
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