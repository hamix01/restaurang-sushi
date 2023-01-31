import {Link} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect} from 'react'
import {Colors} from '../styles'

function Navbar() {
  
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [location, setLocation] = React.useState('')

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    setLocation(window.location.href.toString().split(window.location.host)[1])
  })

  return (
    <Box sx={{
      ...styles.container,
      backgroundColor: !isScrolled && location === '/' ? 'transparent': Colors.primary,
    }}>
      <Link href='/' sx={{
        ...styles.link,
        color: location === '/' ? Colors.secondary : Colors.snowWhite,
      }}>HEM</Link>
      <img style={styles.logo} src={require('../assets/images/logo.png')} alt="logo" />
      <Link href='/about' sx={{
        ...styles.link,
        color: location === '/about' ? Colors.secondary : Colors.snowWhite,
      }}>OM OSS</Link>
    </Box>
  )
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    color: Colors.snowWhite,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: '500',
    transition: 'all 0.3s ease-in-out',
    zIndex: '10000',
  },
  logo: {
    width: '5%',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: Colors.snowWhite,
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.secondary,
    }
  }
}

export default Navbar