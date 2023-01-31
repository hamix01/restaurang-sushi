import {faAdd, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import React from 'react'
import {Colors} from '../../styles'

function CartItem({
  item,
  onAmountChange = () => {},
  onRemoveFromCart = () => {},
}) {
  
  const handleIncreaseAmount = () => { 
    onAmountChange(item.id, item.quantity + 1)
  }

  const handleDecreaseAmount = () => {
    onAmountChange(item.id, item.quantity - 1)
    if (item.quantity === 0) {
      onRemoveFromCart(item.id)
    }
  }

  return (
    <Box sx={{
      ...styles.cartItemContainer
    }}>
      <Box style={styles.itemInfo}>
        <Typography variant="h6">
          {item.name}
        </Typography>
      </Box>
      <Box style={styles.itemPricingAndAmount}>
        <Typography variant="h6">
          {item.price} Kr
        </Typography>
        <Box style={styles.itemAmountWithStepper}>
          <FontAwesomeIcon onClick={handleDecreaseAmount} style={styles.stepperButton} icon={faMinus} />
          <Typography variant="subtitle1">
            {item.quantity}
          </Typography>
          <FontAwesomeIcon onClick={handleIncreaseAmount} style={styles.stepperButton} icon={faAdd} />
        </Box>
      </Box>
      <Box style={styles.itemRemove}>
        <FontAwesomeIcon style={styles.removeButton} icon={faTrash} onClick={() => onRemoveFromCart(item.id)} />
      </Box>
    </Box>
  )
}

const styles = {
  cartItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '1rem',
  },
  itemRemove: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: Colors.brightRed,
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  itemPricingAndAmount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',

  },
  itemAmountWithStepper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  stepperButton: {
    backgroundColor: Colors.primary,
    color: Colors.snowWhite,
    padding: '0.2rem .3rem',
    borderRadius: '50%',
    cursor: 'pointer',
  }
}

export default CartItem