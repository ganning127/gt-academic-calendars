import React from 'react';
import {
  Text,
  Heading,
  Flex,
  Img,
  Spacer,
  Box,
  useDisclosure,
  Center,
  Stack,
  StackDivider,
  chakra
} from '@chakra-ui/react';
import Logo from '../assets/logo512.png';
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ACTIVE_CALENDARS_MAP } from '../lib/constants';

const variants = {
  init: {
    opacity: 0,
    y: -4,
    display: 'none',
    transition: {
      duration: 0,
    },
  },
  enter: {
    opacity: 1,
    y: 0,
    display: 'block',
    transition: {
      duration: 0.15,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.1,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

const MotionList = motion(chakra.ul);
const NavList = (props) => (
  <MotionList opacity="0" initial="init" variants={variants} {...props} />
);

const links = [];

for (const key in ACTIVE_CALENDARS_MAP) {
  links.push({
    title: ACTIVE_CALENDARS_MAP[key].title,
    link: `/calendars/${key}`
  });
}

links.push({
  title: 'Combined',
  link: '/calendars/combined'
});



const NavLink = ({ title, link, isActive }) => {
  if (isActive) {
    return (
      <Text color='white' bg='yellow.500' rounded='md' px='2' fontSize='xl' fontWeight='bold'>
        {title}
      </Text>
    );
  }

  return (
    <Link to={link}>
      <Text color='yellow.500' px='2' fontSize='xl' fontWeight='bold' rounded='md' _hover={{
        bg: 'yellow.200',
      }}>
        {title}
      </Text>
    </Link>
  );
};

export const NavBar = () => {
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex align='center' p={2}>
        <Link to='/'>
          <Flex gap={2} align='center'>
            <Img src={Logo} alt="logo" w={12} h={12} />
            <Heading size={{
              base: 'md',
              md: 'lg'
            }}>
              Georgia Tech Academic Calendars
            </Heading>
          </Flex>
        </Link>

        <Spacer />

        <Box display={{
          base: 'block',
          md: 'none'
        }}>
          <Center as="button" p="2" fontSize="2xl" onClick={onToggle} color="black">
            {isOpen ? <HiX /> : <HiOutlineMenu />}
          </Center>
          <NavList
            pos="absolute"
            insetX="0"
            bg='white'
            top="64px"
            animate={isOpen ? "enter" : "exit"}
            shadow='xl'
            px={2}
            pb={4}
          >
            <Stack divider={<StackDivider borderColor="gray.200" />} spacing={2}>
              {
                links.map((link) => {
                  const isActive = location.pathname === link.link;
                  return (
                    <NavLink
                      key={link.title}
                      title={link.title}
                      link={link.link}
                      isActive={isActive}
                    />
                  );
                })
              }
            </Stack>
          </NavList>

        </Box>

        <Flex gap={4} display={{
          base: 'none',
          md: 'flex'
        }}>
          {
            links.map((link) => {
              const isActive = location.pathname === link.link;
              return (
                <NavLink
                  key={link.title}
                  title={link.title}
                  link={link.link}
                  isActive={isActive}
                />
              );
            })
          }
        </Flex>
      </Flex>
    </>
  );
};;