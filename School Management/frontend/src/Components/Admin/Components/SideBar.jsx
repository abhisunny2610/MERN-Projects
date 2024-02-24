import {
    Avatar,
    Box,
    Flex,
    Icon,
    Text,
    Drawer,
    DrawerContent,
    IconButton,
    useDisclosure,
    DrawerOverlay,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck, BsClipboard2Plus, BsClipboard2Check } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { GoPersonAdd } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { LiaCommentAltSolid } from "react-icons/lia";

import { useSelector } from 'react-redux';
import LogoutButton from '../../SmallComponents/LogoutButton';
import AdminRouting from '../Routing/AdminRouting';
import { NavLink } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../Helper';


export default function SideBar() {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { user } = useSelector((state) => state.auth)

    return (
        <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
            <SidebarContent display={{ base: 'none', md: 'unset' }} />
            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    justifyContent={{ base: 'space-between', md: 'flex-end' }}
                    w="full"
                    px="4"
                    borderBottomWidth="1px"
                    borderColor={useColorModeValue('inherit', 'gray.700')}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow="sm"
                    h="14"
                >
                    <IconButton
                        aria-label="Menu"
                        display={{ base: 'inline-flex', md: 'none' }}
                        onClick={onOpen}
                        icon={<FiMenu />}
                        size="md"
                    />
                    
                    <Flex align="center">
                        <Icon color="gray.500" as={FaBell} cursor="pointer" />
                        <Avatar
                            ml="4"
                            size="sm"
                            name="Ahmad"
                            src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                            cursor="pointer"
                        />
                        <VStack marginLeft="5px" spacing="0" alignItems="flex-start">
                            <Text fontWeight="bold" color='teal'>{user.username}</Text>
                            <Text>{capitalizeFirstLetter(user.role)}</Text>
                        </VStack>
                    </Flex>
                </Flex>

                <Box as="main" p={10} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
                    <AdminRouting />
                </Box>
            </Box>
        </Box>
    );
}

const SidebarContent = ({ ...props }) => (
    <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="60"
        {...props}
    >
        <Flex px="4" py="5" align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
            <Text
                fontSize="2xl"
                ml="2"
                color={useColorModeValue('brand.500', 'white')}
                fontWeight="semibold"
            >
                TTIC
            </Text>
        </Flex>
        <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation">
            <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
            <NavItem icon={AiOutlineTeam}>All Teacher</NavItem>
            <NavItem icon={GoPersonAdd}>New Teacher</NavItem>
            <NavItem icon={PiStudent}>Students</NavItem>
            <NavItem icon={GoPersonAdd}>New Student</NavItem>
            <NavItem icon={BsClipboard2Check}>Notices</NavItem>
            <NavItem icon={BsClipboard2Plus}>New Notice</NavItem>
            <NavItem icon={LiaCommentAltSolid}>Complains</NavItem>
            <NavItem icon={BsFolder2}>Projects</NavItem>
            <NavItem icon={BsCalendarCheck}>Calendar</NavItem>
            <NavItem icon={IoMdLogOut}><LogoutButton /></NavItem>
        </Flex>
    </Box>
);

const NavItem = (props) => {
    const color = useColorModeValue('gray.600', 'gray.300');

    const { icon, children } = props;
    return (
        <Flex
            align="center"
            px="4"
            py="3"
            cursor="pointer"
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            color={useColorModeValue('inherit', 'gray.400')}
            _hover={{
                bg: useColorModeValue('gray.100', 'gray.900'),
                color: useColorModeValue('gray.900', 'gray.200')
            }}
        >
            {icon && (
                <Icon
                    mx="2"
                    boxSize="4"
                    _groupHover={{
                        color: color
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};