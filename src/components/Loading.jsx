import {Box} from '@mui/system'
import React from 'react'
import {Spinner} from 'react-bootstrap'

function Loading() {
  return (
    <Box sx={styles.container}>
      <Spinner animation="grow" variant={"danger"} />
    </Box>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default Loading