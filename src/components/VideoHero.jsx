import React, {useEffect} from 'react'
import sakuraFiji from '../assets/images/sakura-fiji.jpg'
import {Box} from '@mui/system'
import {Typography} from '@mui/material'
import {Colors} from '../styles'
import Button from './Button'

function VideoHero() {

  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => { 
    setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
  })


  const goToOrder = () => {
    window.location.href = '/order'
  }
  return (
    <Box sx={styles.videoContainer}>
      <video style={{
        ...styles.videoPlayer,
        height: isMobile ? '50vh' : '100vh',
      }} autoPlay loop muted playsInline>
        <source src={require('../assets/videos/hero-bg.mp4')} type="video/mp4" />
      </video>
      <Box sx={styles.videoOverlay}>
        <h1 style={styles.videoText}>Smaka den Japanska & Amerikanska explosionen.</h1>
        {/* <Button onClick={goToOrder} type='secoundery' style={styles.orderButton}>
          <p style={{padding: 0, margin: 0}}>Beställ direkt nu</p>
        </Button> */}
      </Box>
    </Box>
  )
}

const styles = {
  videoContainer: {
    backgroundImage: `url(${sakuraFiji})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginTop: '-15%',
    width: '100%',
  },
  videoPlayer: {
    width: '100%',
    objectFit: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.snowWhite,
    '@media (max-width: 768px)': {
      height: '45%',
      backgroundColor: 'rgba(0,0,0,0.3)',
    }
  },
}

export default VideoHero