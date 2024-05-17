import React from 'react'
import { Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button, HStack } from '@chakra-ui/react'
import Panel from '../components/Panel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'
import { EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const ShowAll = () => {

    const [consumer, setConsumer] = React.useState([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try{
            await axios.get(process.env.REACT_APP_BACKEND_URL+'consumer/all', {
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

            console.log(consumer)
        }
        catch{
            toast.error('Something went wrong')
        }
    }

    const handleEdit = (consumerID) => {
        navigate('/update/'+consumerID)
    }

    const handleDelete = async (id) => {
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

            <HStack>
                <Button colorScheme='teal' variant={'solid'} w={'15rem'} onClick={handleSubmit}>Fetch</Button>
                <CSVLink data={consumer} title='consumer' filename='consumer'>
                    <Button colorScheme='teal' variant={'outline'} w={'15rem'} > <DownloadIcon mr={2}/> Download as CSV</Button>
                </CSVLink>
            </HStack>

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

export default ShowAll