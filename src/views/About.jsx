import {Box} from '@mui/system'
import React, {useEffect} from 'react'
import Container from '../components/Container'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import {Colors} from '../styles';

function About() {

  const [isMobile, setIsMobile] = React.useState(false)

  useEffect(() => { 
    document.title = 'Lifli Sushi - Om oss'
    setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768)
    })
  })

  return (
    <Container>
      <Box style={{
        ...styles.title,
        marginTop: isMobile ? '20%' : '10%',
      }}>
        <h1>Års erfarenhet</h1>
        <p>
          Vi på Lifli sushi har flera års erfarenhet av att göra de bästa sushi med en amerikansk twist på det.
          <br />
          <br />
          Vi började vår resa i Denmark där vi öppnade vår första resturnag och idag bestämde vi att öka vår radie och det är därför vi öppnade vår resturang i Valdemarsvik sverige.
        </p>
        <h1>Kontakta oss</h1>
        <h4><LocalPhoneIcon />: <a style={styles.link} href='tel:+460729969100'>072-996 91 00</a></h4>
        <h4><MailIcon />: <a style={styles.link} href='mailto:kontakt@liflisushi.se'>kontakt@liflisushi.se</a></h4>
      </Box>
    </Container>
  )
}

const styles = {
  title: {
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    textAlign: 'center',
  },
  link: {
    color: Colors.secondary,
  }
}

export default About