import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Box} from '@mui/system'
import React from 'react'
import {Colors} from '../../styles'

function AddToCartButton({
  disabled = false,
  onClick = () => {},
}) {
  return (
    <Box onClick={onClick} sx={disabled ? styles.disabledButtonContainer : styles.buttonContainer}>
      <FontAwesomeIcon icon={faCartPlus} />
    </Box>
  )
}

const styles = {
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    color: Colors.snowWhite,
    width: '1rem',
    height: '1rem',
    padding: '1.4rem',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    '&:hover': {
      backgroundColor: Colors.primaryHover,
    },
    '&:active': {
      backgroundColor: Colors.primaryClick,
    }
  },
  disabledButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryDisabled,
    color: Colors.snowWhite,
    width: '1rem',
    height: '1rem',
    padding: '1.4rem',
    borderRadius: '50%',
    cursor: 'not-allowed',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  }
}

export default AddToCartButton