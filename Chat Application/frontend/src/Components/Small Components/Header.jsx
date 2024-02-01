import React, { useState } from 'react'
import {
  Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, Drawer, DrawerBody,
  DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Input
} from '@chakra-ui/react'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router'
import { ChatState } from '../../Context/ChatProvider'

const Header = () => {

  const { user } = ChatState()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate('/')
  }

  const handleSearch = () => {
    
  }

  return (
    <>
      <Box display='flex' justifyContent={'space-between'} alignItems={'center'} p='1' borderBottom='2px solid #eeeeee' >

        <Tooltip label='Search user to chat' hasArrow placement='bottom-end'>
          <Button variant='ghost' onClick={onOpen} >
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", lg: "flex" }} px='4'>Search User</Text>
          </Button>
        </Tooltip>

        <Text fontSize='2xl' fontFamily='Work sans' >Chit-Chat</Text>

        <div>
          <Menu>
            <MenuButton p="1" >
              <i className="fa-solid fa-bell" style={{ marginRight: "1rem" }}></i>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton size='md' as={Button} rightIcon={<i className="fa-solid fa-angle-down"></i>} >
              <Avatar cursor='pointer' size='sm'
                name={user?.name} src={user?.profileImage} />
            </MenuButton>
            <MenuList size='sm'>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} color='red'>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>

      </Box>
      <Drawer placement='left' onClose={onclose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>

          <DrawerHeader textAlign='center' borderBottom='1px' borderColor='lightgrey' >Search by name or email</DrawerHeader>

          <DrawerBody display={'flex'} mt='2'>
            <Input placeholder='search here..' mr='2' value={search} onClick={(e)=> setSearch(e.target.value)} />
            <Button onClick={handleSearch}>Go</Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header