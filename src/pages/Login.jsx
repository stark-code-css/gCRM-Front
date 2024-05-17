import { Input, VStack, Button, Flex } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleValidation = () => {
        let formIsValid = true;
        if(!user.email){
            formIsValid = false;
            toast.error('Email cannot be empty')
        }
        if(!user.password){
            formIsValid = false;
            toast.error('Password cannot be empty')
        }
        
        return formIsValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + 'login', user)
            if(!handleValidation()){
                return
            }
            if(res.status === 200){
                toast.success('Login successful')
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
            }
            else{
                toast.error('Invalid email or password')
            }
        }
        catch(err){
            toast.error('Invalid email or password')
        }
    }

  return (
    <Flex align={'center'} justify={'center'} h={'90vh'}>
        <form>
            <VStack w={'fit-content'}>
                <Input border={'1px'} borderColor={'teal'} color={'teal'} placeholder='Email ID' type='text' w={'20rem'} name='email' value={user.email} onChange={handleChange}></Input>
                <Input border={'1px'} borderColor={'teal'} color={'teal'} mt={2} placeholder='Password' w={'20rem'} type='password' name='password' value={user.password} onChange={handleChange} ></Input>
                <Button colorScheme='teal' w={'8rem'} h={'3rem'} mt={2} onClick={handleSubmit}>Login</Button>
            </VStack>
        </form>
    </Flex>
  )
}

export default Login