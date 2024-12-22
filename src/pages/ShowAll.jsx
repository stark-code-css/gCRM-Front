import React, { useState } from 'react'
import { Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Text, Input, Select } from '@chakra-ui/react'
import Panel from '../components/Panel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'
import { EditIcon, DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const ShowAll = () => {

    const [consumer, setConsumer] = React.useState([])
    const [filteredConsumers, setFilterConsumers] = useState(consumer);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            await axios.get(process.env.REACT_APP_BACKEND_URL + 'consumer/all', {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res) => {
                setConsumer(res.data)
                setFilterConsumers(res.data);
                toast.success('Done')
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
        }
        catch {
            toast.error('Something went wrong')
        }
    }

    const handleEdit = (consumerID) => {
        navigate('/update/' + consumerID)
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this consumer?')
        if (!confirmation) return
        try {
            await axios.delete(process.env.REACT_APP_BACKEND_URL + 'consumer/' + id, {
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            }).then((res) => {
                toast.success('Consumer deleted successfully')
                handleSubmit()
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong')
            })
        }
        catch {
            toast.error('Something went wrong')
        }
    }

    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (search.length >= 2) {
            let newList = []
            if (select === 'consumer_name') {
                newList = consumer.filter((e) => (
                    e.consumer_name.includes(value.toLowerCase()) || e.consumer_name.includes(value.toUpperCase()) || e.consumer_name.includes(value[0].toUpperCase() + value.substring(1, value.length))
                ))
            }
            else if (select === 'cons_id') {
                newList = consumer.filter((e) => (
                    e.consumer_id.toString().includes(value)
                ))
            }
            else if (select === 'consumer_aadhar') {
                newList = consumer.filter((e) => (
                    e.consumer_aadhar.toString().includes(value)
                ))
            }
            setFilterConsumers(newList);
        }
    }


    return (
        <>
            <Panel />
            <Flex justify={'center'} mt={12} direction={'column'} align={'center'}>
                <Text fontSize={'2xl'} fontWeight={'200'} color={'teal'} mb={4}>Show All Consumers</Text>
                <HStack>
                    <Button colorScheme='teal' variant={'solid'} w={'15rem'} onClick={handleSubmit}>Fetch</Button>
                    <CSVLink data={consumer} title='consumer' filename='consumer'>
                        <Button colorScheme='teal' variant={'outline'} w={'15rem'} > <DownloadIcon mr={2} /> Download as CSV</Button>
                    </CSVLink>
                </HStack>
                <HStack w={500} mt={8}>
                    <Select value={select} onChange={(e) => setSelect(e.target.value)}>
                        <option value="consumer_name">Consumer Name</option>
                        <option value="cons_id">Consumer ID</option>
                        <option value="consumer_aadhar">Aadhaar Number</option>
                    </Select>
                    <Input placeholder='Enter atleast 3 characters to search' value={search} onChange={handleChange} />
                </HStack>
                <TableContainer w={'80%'} mt={8} mb={'5rem'}>
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
                            {filteredConsumers.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td textAlign={'center'}>{item.consumer_id}</Td>
                                        <Td textAlign={'center'}>{item.consumer_name}</Td>
                                        <Td textAlign={'center'}>{item.consumer_husband_name}</Td>
                                        <Td textAlign={'center'}>{item.consumer_address}</Td>
                                        <Td textAlign={'center'}>{item.consumer_phone}</Td>
                                        <Td textAlign={'center'}>{item.consumer_aadhar}</Td>
                                        <Td textAlign={'center'}>{item.isDistributed ? 'Done' : 'Pending'}</Td>
                                        <Td textAlign={'center'}>{<> <Button colorScheme='teal' variant={'ghost'} onClick={() => { handleEdit(item.consumer_id) }}><EditIcon /></Button> <Button colorScheme='teal' variant={'ghost'} onClick={() => { handleDelete(item.consumer_id) }}><DeleteIcon /></Button> </>}</Td>
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