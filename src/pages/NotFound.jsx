import { Flex, Text, VStack, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Flex align={'center'} justify={'center'} minH={'90vh'}>
        <VStack>
            <Text fontSize={'xx-large'} fontWeight={'200'}>404 Page Not Found!</Text>
            <HStack><Text>Go to</Text><Text color={'teal'}><Link to={'/'}>Home Page</Link></Text></HStack>
        </VStack>
    </Flex>
  )
}

export default NotFound