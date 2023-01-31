import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect} from 'react'
import {Colors} from '../styles'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Footer() {

  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => {
     
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
  })


  return (
    <Box sx={styles.container}>
      <img style={{
        ...styles.logo,
        width: isMobile ? '90%' : '30%',
      }} src={require('../assets/images/logo.png')} alt="logo" />
      <Box sx={styles.copyright}>
        <Typography variant="caption">Lifli sushi © {new Date().getFullYear()} - Alla rättigheter förbehållna</Typography>
        <Box sx={styles.social}>
          <FacebookIcon />
          <InstagramIcon />
          <LocalPhoneIcon />
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    height: '50%',
    width: '100%',
    color: Colors.snowWhite,
  },
  copyright: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    }
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '5%',
  }
}

export default Footer