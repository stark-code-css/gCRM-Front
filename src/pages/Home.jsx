import React, { useEffect } from 'react'
import { Flex, Card, CardBody, Text } from '@chakra-ui/react'
import Panel from '../components/Panel'
import axios from 'axios'

const Home = () => {

    const [count, setCount] = React.useState(0)

    const fetchCount = async () => {
        try{
            await axios.get(process.env.REACT_APP_BACKEND_URL + 'consumer/', {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setCount(res.data)
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
                <Card border={'1px'} borderColor={'teal'} m={4} minW={'15rem'} h={'15rem'}>
                    <CardBody>
                        <Text color={'teal'} mb={2} align={'center'} fontSize={'3xl'} fontWeight={'200'}>Count</Text>
                        <Text color={'teal'} align={'center'} fontSize={'7xl'} fontWeight={'700'}>{count}</Text>
                    </CardBody>
                </Card>
            </Flex>
        </>
    )
}

export default Home