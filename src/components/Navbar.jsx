import { Flex, Text, HStack, Button } from '@chakra-ui/react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [isLogged, setIsLogged] = React.useState(localStorage.getItem('token') ? true : false)

  const navigate = useNavigate()

  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsLogged(true)
    }
    else{
      setIsLogged(false)
    }
  }, [isLogged])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/login')
  }

  return (
    <Flex bg={'teal'} color={'white'} px={4} h={14} align={'center'} justify={'space-between'} borderBottom={'1px'}>
        <Link to={'/'}><Text fontWeight={'600'} fontSize={'xx-large'}>Shakti HP Gas</Text></Link>
        <HStack>
            <ColorModeSwitcher />
            <Link to={'/'}><Button bg={'teal'} color={'white'} colorScheme='teal'>Home</Button></Link>
            {isLogged ? <Button onClick={handleLogout} bg={'teal'} color={'white'} colorScheme='teal'>Logout</Button> : <Link to={'login'}><Button bg={'teal'} color={'white'} colorScheme='teal'>Login</Button></Link>}
        </HStack>
    </Flex>
  )
}

export default Navbar