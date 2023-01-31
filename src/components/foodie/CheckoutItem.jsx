import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import React from 'react'

function CheckoutItem({item, borderBottom = true}) {
  return (
    <Box sx={{
      ...styles.cartItemContainer,
      borderBottom: borderBottom ? '1px dotted #ccc' : 'none',
    }}>
      <Box style={styles.itemInfo}>
        <Typography variant="h6">
          {item.name}
        </Typography>
      </Box>
      <Box style={styles.itemPricingAndAmount}>
        <Typography variant="h6">
          {item.price} Kr x {item.quantity}
        </Typography>
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
    width: '90%',
    padding: '.5rem 0'
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
  }
}

export default CheckoutItem