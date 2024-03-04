import React, { useEffect, useState } from 'react'
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotice, getAllNotices, getsingleNotice, resetSingleNotice } from '../../../Redux/Slices/Admin/notice'
import { formatDate } from '../../../Helper'
import UpdateNotice from './UpdateNotice'

const AllNotices = () => {

    const dispatch = useDispatch()
    const toast = useToast()
    const { allNotices } = useSelector((state) => state.adminNotice)
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)

    const openModel = () => {
        setIsModelOpen(true)
    }

    const closeModel = () => {
        setIsModelOpen(false)
        dispatch(resetSingleNotice())
        setShouldUpdate(prev => !prev)
    }

    const handleViewClick = (id) => {
        dispatch(getsingleNotice(id))
        openModel()
    }

    const handleDeleteNotice = (id) => {
        dispatch(deleteNotice(id))
        toast({
            title: "Notice Deleted",
            status: "success",
            position: 'top-right',
            isClosable: true,
            duration: 5000,
          })
    }

    useEffect(() => {
        dispatch(getAllNotices())
    }, [dispatch, shouldUpdate])

    return (
        <>
        <UpdateNotice isOpen={isModelOpen} onClose={closeModel}/>
            <Heading size="md">Notice List</Heading>
            {
                (allNotices.length === 0) ? <Heading size="xl">No Notice Found</Heading> : (
                    <Flex flexWrap="wrap" mt={5}>
                        {
                            allNotices?.map((notice) => {
                                return (
                                    <Card size="sm" maxW="350px" mr={5} mb={5} key={notice?._id}>
                                        <CardHeader>
                                            <Heading size='sm'>{notice?.publishedBy?.username} <Badge p={0.5} borderRadius={5} colorScheme='green'>({notice?.publishedBy?.role})</Badge></Heading>
                                            <Text>{formatDate(notice?.createdAt)}</Text>
                                        </CardHeader>
                                        <CardBody  fontFamily="Playfair Display">
                                        <Box mt="2" as="div" dangerouslySetInnerHTML={{ __html: notice?.content }} />
                                        </CardBody>
                                        <CardFooter justifyContent="flex-end" display="flex">
                                            <Button mr={2} colorScheme='yellow' size="sm" onClick={()=> handleViewClick(notice?._id)}>Edit</Button>
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