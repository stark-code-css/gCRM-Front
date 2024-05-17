import React from 'react'
import { Input, RadioGroup, Radio, Stack, Button, Flex, VStack, Text } from '@chakra-ui/react'
import Panel from '../components/Panel'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateModal = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const consumerID = location.pathname.split('/')[2]
    const [consumer, setConsumer] = React.useState({
        consumer_id: '',
        consumer_name: '',
        consumer_husband_name: '',
        consumer_address: '',
        consumer_aadhar: '',
        consumer_phone: '',
        isDistributed: 'false'
    })

    React.useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+'consumer/'+consumerID, {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }).then((res)=>{
            setConsumer(res.data[0])
        }).catch((err)=>{
            console.log(err)
            toast.error('Something went wrong')
        })

    }, [consumerID])


    const handleChange = (e) => {
        setConsumer((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleRadio = (e) => {
        setConsumer((prev)=>({...prev, isDistributed: e}))
    }

    const handleSubmit = async (e) => {
        try{
            const res = await axios.put(process.env.REACT_APP_BACKEND_URL+'consumer/'+consumerID, consumer, {
                headers:{
                    'auth-token': localStorage.getItem('token')
                }
            }).then(res=>res).catch(err=>err)
            
    
            if(res.status === 200){
                toast.success('Consumer updated successfully')
                navigate('/showAll')
            }
            else{
                toast.error(res.response.data.message)
            }
        }
        catch(err){
            toast.error('Something went wrong')
        }
    }

    const handleReset = () =>{
        console.log(consumer)
    }

  return (
    <>
        <Panel/>
        <Flex align={'center'} justify={'center'} h={'90vh'}>
            <VStack>
                <Text fontSize={'2xl'} fontWeight={'600'} mb={2} color={'teal'}>Update Consumer</Text>
                <Input w={'20rem'} placeholder='Consumer ID' type='number' name='consumer_id' value={consumer.consumer_id} onChange={handleChange}></Input>
                <Input w={'20rem'} placeholder='Consumer Name' type='text' name='consumer_name' value={consumer.consumer_name} onChange={handleChange}></Input>
                <Input w={'20rem'} placeholder="Husband Name" type='text' name='consumer_husband_name' value={consumer.consumer_husband_name} onChange={handleChange}></Input>
                <Input w={'20rem'} placeholder="Address" type='text' name='consumer_address' value={consumer.consumer_address} onChange={handleChange}></Input>
                <Input w={'20rem'} placeholder="Aadhaar" type='number' name='consumer_aadhar' value={consumer.consumer_aadhar} onChange={handleChange}></Input>
                <Input w={'20rem'} placeholder="Phone Number" type='text' name='consumer_phone' value={consumer.consumer_phone} onChange={handleChange}></Input>
                <RadioGroup colorScheme='teal' onChange={handleRadio} value={consumer.isDistributed}>
                    <Stack mt={2} direction='row'>
                        <Radio mr={4} value={'true'}>Done</Radio>
                        <Radio value={'false'}>Not Done</Radio>
                    </Stack>
                </RadioGroup>
                <Stack direction={'row'}>
                    <Button w={'7rem'} mt={2} colorScheme='teal' onClick={handleSubmit}>Submit</Button>
                    <Button w={'7rem'} mt={2} colorScheme='teal' onClick={handleReset}>Reset</Button>
                </Stack>
            </VStack>
        </Flex>
    </>
  )
}

export default UpdateModal