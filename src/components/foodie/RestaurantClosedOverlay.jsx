import {faLock} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import React from 'react'
import {Colors} from '../../styles'

function RestaurantClosedOverlay() {
  return (
    <Box sx={styles.container}>
      <Typography gutterBottom variant="h3">
        The restaurant is closed at this time.
      </Typography>
      <Typography gutterBottom variant="h6">
        You are more then welcome to come back later.
      </Typography>
      <FontAwesomeIcon icon={faLock} style={{fontSize: '5rem'}} />
    </Box> 
  )
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.snowWhite,
    textAlign: 'center',
  }
}

export default RestaurantClosedOverlay