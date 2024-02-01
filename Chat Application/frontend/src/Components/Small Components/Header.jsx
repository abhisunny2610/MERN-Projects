import React, { useState } from 'react'
import {
  Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, Drawer, DrawerBody,
  DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, Input, DrawerCloseButton
} from '@chakra-ui/react'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { base_url } from '../../Utils/Helper'
import UserList from './UserList'
import UserListSkeleton from './UserListSkeleton'

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

  const handleSearch = async () => {
    if (search) {
      try {
        setLoading(true)
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const response = await axios.get(base_url + `auth/allUsers?search=${search}`, config)
        setSearchResult(response?.data?.users)
        setLoading(false)
      } catch (error) {
        console.log("error", error)
      }

    }
  }

  console.log("results", searchResult)

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
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom='1px' fontSize='16px' borderColor='lightgrey' >Search by name or email</DrawerHeader>

          <DrawerBody mt='2'>
            <Box display='flex'>
              <Input placeholder='search here..' mr='2' value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            <Box mt='3' display='flex' flexDirection='column' >
              {
                loading ? <UserListSkeleton /> : (
                  searchResult.map((user) => {
                    return <UserList user={user} key={user._id} />
                  })
                )
              }
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header