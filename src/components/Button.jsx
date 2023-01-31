import {Box} from '@mui/system'
import React from 'react'
import {Colors} from '../styles'

function Button({
  children,
  style,
  type = 'primary',
  onClick = () => { },
  disabled = false,
}) {
  return (
    <Box
      onClick={disabled ? () => { } : onClick}
      sx={disabled ? {...styles.disabledButtonContainer, ...style} : {
      ...styles.buttonContainer,
      ...style,
      backgroundColor: type === 'primary' ? Colors.primary : Colors.secondary,
    }}>
      {children}
    </Box>
  )
}
      
const styles={
  buttonContainer: {
    padding: '1rem',
    color: Colors.snowWhite,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: Colors.primaryHover,
    },
    '&:active': {
      backgroundColor: Colors.primaryClick,
    }
  },
  disabledButtonContainer: {
    padding: '1rem',
    backgroundColor: Colors.primaryDisabled,
    cursor: 'not-allowed',
    color: Colors.snowWhite,
    borderRadius: '0.5rem',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    transition: 'all 0.2s ease-in-out',
  }
}

export default Button