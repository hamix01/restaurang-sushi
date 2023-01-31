import {Box} from '@mui/system'
import React from 'react'
import {Colors} from '../styles'

function Container({children, style}) {
  return (
    <Box sx={{
      ...styles.container,
      ...style
    }}>
      {children}
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    // height: '100vh',
    // paddingTop: '10%',
  }
}

export default Container