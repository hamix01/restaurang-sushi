import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import {Colors} from '../../styles'

function CategoriesTab({items, active, onTabClick}) {
  const [lastYscroll, setLastYscroll] = useState(0)
  const [show, setShow] = useState(true)

  const navbarScrollController = () => {
    if(typeof window !== 'undefined') {
      const yscroll = window.scrollY
      if(yscroll > lastYscroll) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastYscroll(yscroll)
    }
  }

  useEffect(() => { 
    window.addEventListener('scroll', navbarScrollController)
    return () => {
      window.removeEventListener('scroll', navbarScrollController)
    }
  }, [lastYscroll])

  return (
    <Box sx={{
      ...styles.tabBarContainer,
      top: show ? '0' : '-10rem',
    }}>
      {items.map(item => {
        if (item.items.length > 0) {
          return (
            <Box onClick={() => onTabClick(item.category.split(' ').join('_'))}
              style={{
                ...styles.tabContainer,
                borderBottom: active === item.category.split(' ').join('_') ? `5px solid ${Colors.primary}` : '2px solid #ccc',
              }}
              key={`cat_${item.category}`}
            >
              <h5>{item.category}</h5>
            </Box>
          )
        }
      })}
  </Box>
  )
}

const styles = {
  tabBarContainer: {
    position: 'fixed',
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    overflowX: 'scroll',
    transition: 'all .3s ease-in-out',
    '@media (max-width: 768px)': {
      justifyContent: 'flex-start',
      marginTop: '13%',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    }

  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    flexWrap: 'nowrap',
    textOverflow: 'ellipsis',
    height: '3rem',
    margin: '1rem 0',
  }
}

export default CategoriesTab