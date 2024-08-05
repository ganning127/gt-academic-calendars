import React from 'react';
import {
  Text, Heading, Flex,
  Img,
  Spacer
} from '@chakra-ui/react';
import Logo from '../assets/logo512.png';
import { Link, useLocation } from 'react-router-dom';

const links = [
  {
    title: "Fall 2024",
    link: "/calendars/fall2024"
  },
  {
    title: "Spring 2025",
    link: "/calendars/spring2025"
  },
  {
    title: "Combined",
    link: "/combined"
  }
];

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
  return (
    <>
      <Flex align='center' p={2}>
        <Link to='/'>
          <Flex gap={2} align='center'>
            <Img src={Logo} alt="logo" w={12} h={12} />
            <Heading>
              Georgia Tech Academic Calendars
            </Heading>
          </Flex>
        </Link>

        <Spacer />

        <Flex gap={4}>
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