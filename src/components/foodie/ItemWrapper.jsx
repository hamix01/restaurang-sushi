import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography} from '@mui/material'
import {Box, display} from '@mui/system'
import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import Cookies from 'universal-cookie'
import {Colors} from '../../styles'
import Button from '../Button'
import AddToCartButton from './AddToCartButton'
import itemFallBackImage from '../../assets/images/food_fallback_image.png'

function ItemWrapper({name, description, price, options, itemId, amountInCart, onAddToCart = () => { }, imagePath}) {
  const [addToCartDisabled, setAddToCartDisabled] = useState(false)
  const [infoScreenOpen, setInfoScreenOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [totalPrice, setTotalPrice] = useState(price)
  const [quantity, setQuantity] = useState(1)
  const [requiredOptions, setRequiredOptions] = useState([])

  const handleAddToCart = () => { 
    if (options) {
      setInfoScreenOpen(true)
      return
    }
    
    onAddToCart({
      name,
      id: itemId,
      description,
      price,
      options: null,
      quantity,
    })
  }

  const handleSelectOption = (option, name, isMultiple, event) => { 
    let optionsSelected = selectedOptions
    if (!isMultiple) {
      // if item in optionsSelected then remove it
      let optionInformation = options.find(option => option.name === name)

      optionInformation = optionInformation.options.find(option => option.name === event.target.value)
      
      optionsSelected = optionsSelected.filter(item => item.optionsGroup !== name)
      optionsSelected.push({optionsGroup: name, name: event.target.value, price: optionInformation.price})
      let ro = requiredOptions.filter(item => item !== name)
      setRequiredOptions(ro)
    } else {
      if (event.target.checked) { 
        optionsSelected.push({optionsGroup: name, name: option.name, price: option.price})
        let ro = requiredOptions.filter(item => item !== name)
        setRequiredOptions(ro)
      } else {
          optionsSelected = optionsSelected.map(item => {
          if (item?.optionsGroup === name && item?.name === option.name) {
            return
          }
          return item
          })
        // remove undefined
        optionsSelected = optionsSelected.filter(item => item !== undefined)
      }
    }
    setSelectedOptions(optionsSelected)
  }

  const handleAddToCartWithOptions = () => { 
    if (requiredOptions.length === 0) {
      onAddToCart({
        name,
        id: itemId,
        description,
        price,
        options: selectedOptions,
        quantity,
      })
      setInfoScreenOpen(false)
    }
  }

  useEffect(() => {
    if (options) {
      setAddToCartDisabled(true)
    }
  }, [])

  useEffect(() => { 
    if(options){
      for (let option of options) {
        if (option.required) {
          setRequiredOptions(requiredOptions => Array.from(new Set([...requiredOptions, option.name])))
        }
      }
    }
  }, [options])

  return (
    <>
      <Box className={'.item-wrapper'} sx={{
        ...styles.itemContainer,
      }}>
        <Box sx={{
          ...styles.itemImageContainer,
        }}>
          <img
            src={imagePath}
            alt={name}
            onError={(e) => {
              e.target.src = itemFallBackImage
            }}
          />
        </Box>
        <Box sx={{
          ...styles.itemInfo,
        }}>
          <Typography variant='h4' sx={{...styles.itemTitle}}>{name} {amountInCart > 0 && <span style={styles.amountBadge}>{amountInCart}x</span>}</Typography>
          <h4 style={{...styles.itemDescription}}>{description}</h4>
        </Box>
        <Box sx={{
          ...styles.itemPricing
        }}>
        <h3 style={{...styles.itemPrice}}>{price} Kr</h3>
        <AddToCartButton onClick={handleAddToCart} />
        </Box>
      </Box>
      <Box sx={{
        ...styles.infoScreenContainer,
        display: infoScreenOpen ? 'flex' : 'none',
      }}>
        <Box sx={{
          ...styles.infoScreen,
        }}>
          <Box sx={styles.topBar}>
            <Box sx={styles.closeButton}>
              <FontAwesomeIcon style={{cursor: 'pointer', fontSize: '1.5rem'}} icon={faXmark} onClick={() => setInfoScreenOpen(false)} />
            </Box>
          </Box>
          <Box sx={styles.infoBody}>
            <Box sx={{
              ...styles.itemInformationContainer,
            }}>
              <h1 style={{...styles.itemTitle}}>{name}</h1>
              <h4 style={{...styles.itemDescription}}>{description}</h4>
              <h3 style={{...styles.itemPrice}}>Pris: {price} Kr</h3>
            </Box>
            <Box sx={{
              ...styles.itemOptionsContainer,
            }}>
              <h3 style={{...styles.itemOptionsTitle}}>alternativ</h3>
                {options?.length > 0 && options.map((option, index) => {
                  const name = option.name
                  const isMultiple = option.multiple
                  const required = option.required
                  return (
                    <Box key={`alter_${name}`} sx={styles.optionsGroup}>
                      <h6>{name}</h6>
                      <FormControl required={required} >
                        {isMultiple ? (
                          <>
                          {option.options.map(option_item => (
                            <FormControlLabel
                              key={`opt_${option_item.name}_${index}_${name}`}
                              value={name}
                              control={<Checkbox />}
                              label={option_item.name}
                              onChange={(event) => handleSelectOption(option_item, name, isMultiple, event)}
                            />
                          ))}
                        </>
                        ) : (
                          <RadioGroup key={`opt_${index}_${name}`} name={name} onChange={(event) => handleSelectOption(option.options, name, isMultiple, event)}>
                            {option.options.map(option_item => (
                              <FormControlLabel
                                key={`opt_${option_item.name}_${index}_${name}`}
                                value={option_item.name}
                                control={<Radio />}
                                label={option_item.name}
                                onChange={(event) => handleSelectOption(option_item, name, isMultiple, event)}
                              />
                            ))}
                          </RadioGroup>
                        )}
                      </FormControl>
                    </Box>
                  )
                  
                })}
                <Button type='secondary' disabled={requiredOptions.length > 0} onClick={handleAddToCartWithOptions}>
                  <p style={{margin: 0, padding: 0}}>Lägg till kundvagn</p>
                </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const styles = {
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    borderBottom: '1px solid #ccc',
    padding: '1rem 0',
    //mobile
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  itemPricing: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    transition: 'height 0.5s ease-in-out',
    marginBottom: '1rem',
  },
  infoScreenContainer: {
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '100',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '80%',
    backgroundColor: Colors.snowWhite,
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.2)',
    //mobile
    '@media (max-width: 768px)': {
      width: '100%',
      height: '80%',
      margin: '1rem',
    }
  },
  infoBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    //mobile
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  itemInformationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: '100%',
    //mobile
    '@media (max-width: 768px)': {
      textAlign: 'center',
      borderBottom: '1px solid #ccc',
      marginBottom: '1rem',
      height: 'auto',
    }
  },
  itemOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    //mobile
    '@media (max-width: 768px)': {
      height: 'auto',
    }
  },
  itemDescription: {
    fontSize: '1.2rem',
    fontWeight: '300',
  },
  optionsGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    }
  },
  amountBadge: {
    fontSize: '1rem',
    fontWeight: '300',
    textAlign: 'center',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brightRed,
    color: Colors.snowWhite,
    borderRadius: '50%',
    marginLeft: '0.5rem',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '75%',
    '@media (max-width: 768px)': {
      width: '100%',
      alignItems: 'center',
    }
  },
  itemImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '10%',
    '& img': {
      width: '100%',
      height: 'auto',
      borderRadius: '1rem',
      objectFit: 'contain',
    },
    '@media (max-width: 768px)': {
      width: '100%',
      marginBottom: '1rem',
    }
  }
}


export default ItemWrapper