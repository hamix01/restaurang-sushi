import {faChevronRight, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ClickAwayListener, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import {Colors} from '../../styles'
import Button from '../Button'
import CartItem from './CartItem'

const CART_OPEN_WIDTH = window.innerWidth < 768 ? '80%' : '20%'
const CART_OPEN_BUTTON_POS = window.innerWidth < 768 ? '82%' : '21%'

function CartButton({
  amountItems,
  itemsInCart,
  onAmountChange = () => {},
  onRemoveFromCart = () => {},
}) {

  const [cartIsOpen, setCartIsOpen] = useState(false)

  const handleCartButtonClick = () => {
    setCartIsOpen(prev => !prev)
  }

  const handleCartClickAway = () => {
      setCartIsOpen(false)
  }

  const goToCheckout = () => {
    setCartIsOpen(false)
    window.location.href = '/checkout'
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleCartClickAway}>
        <div>
          <Box
            onClick={handleCartButtonClick}
            sx={{
            ...styles.buttonContainer,
            right: cartIsOpen ? CART_OPEN_BUTTON_POS : '1rem',
          }}>
            <FontAwesomeIcon icon={faShoppingBag} />
            {amountItems > 0 &&
              <Box style={styles.badge}>
                {amountItems}
              </Box>
            }
          </Box>
          <Box style={{
            ...styles.cart,
            width: cartIsOpen ? CART_OPEN_WIDTH : '0%',
            opacity: cartIsOpen ? '1' : '0',
          }}>
            <Box style={styles.cartTitle}>
              <Typography variant="h4">
                Kundvagn
              </Typography>
            </Box>
            {amountItems === 0 && (
              <Typography variant="h6">
                Du har inga varor i din kundvagn.
              </Typography>
            )}
            {amountItems > 0 && (
              <Box style={styles.cartItems}>
                {itemsInCart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onAmountChange={onAmountChange}
                    onRemoveFromCart={onRemoveFromCart}
                    cartIsOpen={cartIsOpen}
                  />
                ))}
              </Box>
            )}
            <Button disabled={amountItems === 0} type="secoundery" onClick={goToCheckout} style={styles.checkoutButton}>
              Gå till kassan
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </Box>
        </div>
      </ClickAwayListener>
    </>
  )
}

const styles = {
  buttonContainer: {
    position: 'fixed',
    bottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: Colors.snowWhite,
    backgroundColor: Colors.secondary,
    padding: '1rem',
    borderRadius: '50%',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: Colors.primaryHover,
    },
    '&:active': {
      backgroundColor: Colors.primaryClick,
    },
    zIndex: '1',
  },
  badge: {
    position: 'absolute',
    top: '-0.5rem',
    left: '-0.5rem',
    backgroundColor: Colors.brightRed,
    borderRadius: '50%',
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: Colors.snowWhite,
    boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.3)',
    zIndex: '2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cartOpenWidth: {
    width: '20%',
    opacity: '1',
    '@media (max-width: 768px)': {
      width: '90%',
    }
  },
  cartClosedWidth: {
    width: '0%',
    opacity: '0',
  },
  cartItems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 1rem',
  },
  checkoutButton: {
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
}

export default CartButton