import React from 'react'
import { Input, Flex, VStack, Button, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Panel from '../components/Panel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const SearchByName = () => {

    const [name, setName] = React.useState('')
    const [consumer, setConsumer] = React.useState([])

    const navigate = useNavigate()

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        try{
            await axios.get(process.env.REACT_APP_BACKEND_URL+'consumer/name/'+name, {
                headers:{
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res)=>{
                setConsumer(res.data)
                toast.success('Done')
            }).catch((err)=>{
                console.log(err)
                toast.error('Something went wrong')
            })

        }
        catch{
            toast.error('Something went wrong')
        }
    }

    const handleEdit = (consumerID) => {
        navigate('/update/'+consumerID)
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this consumer?')
        if(!confirmation) return
        try{
            await axios.delete(process.env.REACT_APP_BACKEND_URL+'consumer/'+id, {
                headers:{
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res)=>{
                toast.success('Consumer deleted successfully')
                handleSubmit()
            }).catch((err)=>{
                console.log(err)
                toast.error('Something went wrong')
            })
        }
        catch{
            toast.error('Something went wrong')
        }
    }

  return (
    <>
        <Panel/>
        <Flex justify={'center'} mt={12} direction={'column'} align={'center'}>
            <VStack>
                <VStack>
                    <Input w={'20rem'} placeholder='Enter Consumer Name' value={name} onChange={handleChange}></Input>
                    <Button w={'10rem'} mt={4} colorScheme='teal' onClick={handleSubmit}>Search</Button>
                </VStack>
            </VStack>

            <TableContainer w={'70%'} mt={8} mb={'5rem'}>
                <Table colorScheme='teal' variant={'simple'}>
                    <Thead>
                        <Tr>
                            <Th textAlign={'center'}>Consumer ID</Th>
                            <Th textAlign={'center'}>Consumer Name</Th>
                            <Th textAlign={'center'}>Husband Name</Th>
                            <Th textAlign={'center'}>Address</Th>
                            <Th textAlign={'center'}>Phone</Th>
                            <Th textAlign={'center'}>Aadhaar</Th>
                            <Th textAlign={'center'}>Status</Th>
                            <Th textAlign={'center'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {consumer.map((item, index)=>{
                            return(
                                <Tr key={index}>
                                    <Td textAlign={'center'}>{item.consumer_id}</Td>
                                    <Td textAlign={'center'}>{item.consumer_name}</Td>
                                    <Td textAlign={'center'}>{item.consumer_husband_name}</Td>
                                    <Td textAlign={'center'}>{item.consumer_address}</Td>
                                    <Td textAlign={'center'}>{item.consumer_phone}</Td>
                                    <Td textAlign={'center'}>{item.consumer_aadhar}</Td>
                                    <Td textAlign={'center'}>{item.isDistributed ? 'Done' : 'Pending'}</Td>
                                    <Td textAlign={'center'}>{ <> <Button colorScheme='teal' variant={'ghost'} onClick={()=>{handleEdit(item.consumer_id)}}><EditIcon/></Button> <Button colorScheme='teal' variant={'ghost'} onClick={()=>{handleDelete(item.consumer_id)}}><DeleteIcon/></Button> </> }</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

        </Flex>
    </>
  )
}

export default SearchByName