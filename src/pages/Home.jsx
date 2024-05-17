import React, { useEffect } from 'react'
import { Flex, Card, CardBody, Text, CardFooter, HStack, VStack, Divider } from '@chakra-ui/react'
import Panel from '../components/Panel'
import axios from 'axios'

const Home = () => {

    const [count, setCount] = React.useState({
        total: 0,
        done: 0,
        pending: 0,
    })

    const fetchCount = async () => {
        try{
            await axios.get(process.env.REACT_APP_BACKEND_URL + 'consumer/', {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setCount(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        catch{
            console.log('Error fetching count')
        }
    }

    useEffect(()=>{
        fetchCount()
    }, [])
  
    return (
        <>
            <Panel />
            <Flex dir='row' justify={'flex-end'}>
                <Card colorScheme='teal' variant={'elevated'} m={4} minW={'15rem'} minH={'15rem'}>
                    <CardBody>
                        <Text color={'teal'} mb={2} align={'center'} fontSize={'3xl'} fontWeight={'200'}>Total</Text>
                        <Text color={'teal'} align={'center'} fontSize={'7xl'} fontWeight={'700'}>{count.total}</Text>
                    </CardBody>
                    <Divider borderColor={'teal'}/>
                    <CardFooter>
                        <VStack w={'100%'}>
                            <HStack>
                                <Text color={'teal'} align={'center'} fontSize={'lg'} fontWeight={'400'}>Done : </Text>
                                <Text color={'teal'} align={'center'} fontSize={'lg'} fontWeight={'400'}>{count.done}</Text>
                            </HStack>
                            <HStack>
                                <Text color={'teal'} align={'center'} fontSize={'lg'} fontWeight={'400'}>Pending : </Text>
                                <Text color={'teal'} align={'center'} fontSize={'lg'} fontWeight={'400'}>{count.pending}</Text>
                            </HStack>
                        </VStack>
                    </CardFooter>
                </Card>
            </Flex>
        </>
    )
}

export default Home