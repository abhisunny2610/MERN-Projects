import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserList = ({ user }) => {
    return (
        <Box cursor="pointer"
            bg="#e8f2fe"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg">
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profileImage}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    )
}

export default UserList