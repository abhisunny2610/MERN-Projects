import { Card, CardBody, Divider, VStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const TotalCountCard = ({count, bgcolor, desc}) => {
    return (
        <Card minW="200px" maxWidth="300px" bgColor={bgcolor} color="white" fontFamily="Open sans">
            <CardBody>
                <VStack justifyContent="space-between">
                    <Heading as="h4" fontSize="32px">{count}</Heading>
                    {/* <Divider/> */}
                    <Text fontSize="18px">{desc}</Text>
                </VStack>
            </CardBody>
        </Card>
    )
}

export default TotalCountCard