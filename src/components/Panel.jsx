import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    VStack,
    IconButton
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

import { HamburgerIcon } from '@chakra-ui/icons'

const Panel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <IconButton pos={'absolute'} ref={btnRef} size={'lg'} colorScheme='teal' onClick={onOpen} rounded={'full'} variant={'ghost'} m={4}>
            <HamburgerIcon/>
        </IconButton>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color={'teal'}>Shakti HP Gas</DrawerHeader>
  
            <DrawerBody>
              <VStack align={'flex-start'}>
                <Link to={'/showAll'}><Button colorScheme='teal' variant={'ghost'}>View Consumers</Button></Link>
                <Link to={'/create'}><Button colorScheme='teal' variant={'ghost'}>Add Consumer</Button></Link>
                <Link to={'/searchByID'}><Button colorScheme='teal' variant={'ghost'}>Search by ID</Button></Link>
                <Link to={'/searchByName'}><Button colorScheme='teal' variant={'ghost'}>Search by Name</Button></Link>
                <Link to={'/searchByAadhaar'}><Button colorScheme='teal' variant={'ghost'}>Search by Aadhaar</Button></Link>
              </VStack>
            </DrawerBody>

          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default Panel