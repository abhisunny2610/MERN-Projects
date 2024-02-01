import React from 'react'
import {Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const UserListSkeleton = () => {
    return (
        <>
            <Box padding='6' bg='white' display='flex' justifyContent='space-between' mt='2' >
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' bg='white' display='flex' justifyContent='space-between' mt='2' >
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
            </Box>
            <Box padding='6' bg='white' display='flex' justifyContent='space-between' mt='2' >
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
            </Box>                  
        </>
    )
}

export default UserListSkeleton