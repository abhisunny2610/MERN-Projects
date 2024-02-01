import React, { useState } from 'react'
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import ProfileModel from './ProfileModel'
import { useNavigate } from 'react-router'
import { ChatState } from '../../Context/ChatProvider'

const Header = () => {

  const { user } = ChatState()
  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const userDeatils = {
    name: "Abhishek",
    email: "abhishesunny463@gmail.com",
    profileImage: "data:image/jpeg;base64,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"
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate('/')
}

  return (
    <Box display='flex' justifyContent={'space-between'} alignItems={'center'} p='1' >
      <Tooltip label='Search user to chat' hasArrow placement='bottom-end'>
        <Button variant='ghost'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text display={{ sm: "none", md: "flex" }} px='4'>Search User</Text>
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
            <Avatar cursor='pointer' size='sm' /> 
            {/* name={user.name} src={user.profileImage}  */}
          </MenuButton>
          <MenuList size='sm'>
            <ProfileModel user={user}>
            <MenuItem>My Profile</MenuItem>
            </ProfileModel>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  )
}

export default Header