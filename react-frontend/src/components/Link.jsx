import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
export const Link = ({ href, children }) => {
  const isExternal = href.startsWith('http');

  if (href.startsWith('http')) {
    return (
      <ChakraLink href={href} color='yellow.600' target="_blank" isExternal>
        {children}
      </ChakraLink>
    );
  } else if (href.startsWith('mailto')) {
    return (
      <ChakraLink
        href={href}
        color='yellow.600'
      >
        {children}
      </ChakraLink>
    );
  }

  else {
    return (
      <ReactRouterLink to={href}>
        {children}
      </ReactRouterLink>
    );
  }

};
