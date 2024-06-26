import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size={'sm'}
      fontSize={'lg'}
      aria-label={`Switch to ${text} mode`}
      variant="solid"
      color={'white'}
      bg={'teal'}
      colorScheme='teal'
      marginLeft="2"
      mr={4}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
