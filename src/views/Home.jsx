import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect} from 'react'
import Container from '../components/Container'
import VideoHero from '../components/VideoHero'
import {Colors} from '../styles'

function Home() {
  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
  })

  return (
    <Container>
      <VideoHero />
      <Box sx={styles.body}>
        <img style={{zIndex: '10'}} src={require('../assets/images/arc.png')} alt="arc" />
        <Box sx={styles.underHero}>
          <img style={{
            ...styles.sushiPlate,
            width: isMobile ? '20%' : '40%',
          }} src={require('../assets/images/sushi-plate-dark.png')} alt="sushi-plate" />
        </Box>
      </Box>
      <Box sx={styles.about}>
        <h1 style={styles.title}>Vem vi är</h1>
        <p style={{
          ...styles.aboutText,
          width: isMobile ? '80%' : '30%',
          alignSelf: isMobile ? 'center' : 'flex-start',
        }}>
          Vi har varit i branschen i flera år nu där vi började med vår restaurang i Denmark och utvecklade vår kunskap.
          <br />
          <br />
          Nu har vi bestämt oss att börja den nya resan och öppna vår restaurang nu i Valdemarsvik, Sverige där vi ska dela med oss av vår erfarenhet i Sverige.
          <br />
          <br />
          Vår restaurang är inspirerad av den amerikanska twisten på sushi där vi jobbar med att göra de bästa sushi med en amerikansk & japansk smak explosion.
        </p>
      </Box>
      <Box sx={styles.menu}>
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? '2rem' : '3rem',
          textAlign: isMobile ? 'center' : 'left',
        }}>Kom in och smaka {isMobile && <br />} våran underbara rätter</h1>
        <Typography variant="h6">Öppet tider</Typography>
        <Typography variant="subtitle1">
          <span style={styles.bold}>tisdag - Lördag:</span> 11:00 - 21:00
        </Typography>
        <Typography variant="h3">Hitta till oss</Typography>

        <iframe width="90%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=J%C3%A4rnv%C3%A4gsgatan%204B,%20615%2033%20Valdemarsvik&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" style={styles.map}></iframe>

        <img style={{
          ...styles.menuImg,
          width: isMobile ? '90%' : '30%',
          marginTop: '2rem'
        }} src={require('../assets/images/hand-sushi.png')} alt="menu" />
      </Box>
    </Container>
  )
}

const styles = {
  body: {
    marginTop: '-15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rubik, sans-serif',
    '@media (max-width: 768px)': {
      marginTop: '-30%',
    }
  },
  underHero: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '100%',
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    '@media (max-width: 768px)': {
      marginTop: '-1rem'
    }

  },
  sushiPlate: {
    marginTop: '-10%',
    width: '40%',
    zIndex: '10',
  },
  about: {
    backgroundImage: `url(${require('../assets/images/kanji-about.jpg')})`,
    backgroundSize: 'contain',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'left center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5% 10%',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bolder',
  },
  aboutText: {
    width: '30%',
    alignSelf: 'flex-start'
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    marginBottom: '5%',
  }
}

export default Home