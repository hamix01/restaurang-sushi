import {Box} from '@mui/system'
import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import {fetchRestaurantOptions} from '../../helpers/ApiManager'
import {RESTAURANT_ID, WEEK_DAYS} from '../../helpers/constants'
import {ASSETS_API_URL} from '../../helpers/urls'
import {Colors} from '../../styles'
import CartButton from './CartButton'
import CategoriesTab from './CategoriesTab'
import ItemWrapper from './ItemWrapper'
import RestaurantClosedOverlay from './RestaurantClosedOverlay'

function ItemBrowser({items}) {
  const cookie = new Cookies();

  const [active, setActive] = useState(items[0].category)
  const [amountItems, setAmountItems] = useState(0)
  const [itemsInCart, setItemsInCart] = useState([])
  const [restaurantOpen, setRestaurantOpen] = useState(true)

  const scrollToElement = (name) => { 
    setActive(name)
    const element = document.getElementById(name)
    element.scrollIntoView({behavior: 'smooth'})
  }

  const checkIfRestaurantOpen = async () => { 
    const now = new Date();
    const restaurantOptions = await fetchRestaurantOptions();
    const openingHours = JSON.parse(restaurantOptions.data.opening_hours)[WEEK_DAYS[now.getDay()]]
    
    if (!openingHours.open) {
      setRestaurantOpen(false);
      return;
    }

    const openingTime = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openingHours.from}`);
    const closingTime = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openingHours.to}`);

    if (now.getTime() > openingTime.getTime() && now.getTime() < closingTime.getTime()) {
      setRestaurantOpen(true);
    } else {
      setRestaurantOpen(false);
    }
  }

  const addToCartFunction = (item) => { 
    const cart = cookie.get('cart') || []
    let newCart;
    if (cart.find(i => i.id === item.id)) {
      newCart = cart.map(i => {
        if (i.id === item.id) {
          i.quantity += 1
        }
        return i
      })
      cookie.set('cart', newCart, {path: '/'})
    } else {
      newCart = [...cart, item]
      cookie.set('cart', newCart, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    setItemsInCart(newCart)
    setAmountItems(newCart.length)
  }

  const handleAmountChange = (itemId, newQuantity) => { 
    const cart = cookie.get('cart') || []
    const newCart = cart.map(i => {
      if (i.id === itemId) {
        i.quantity = newQuantity
      }
      return i
    }).filter(i => i.quantity > 0)
    cookie.set('cart', newCart, {path: '/'})
    setItemsInCart(newCart)
    setAmountItems(newCart.length)
  }

  const removeFromCartFunction = (itemId) => {
    const cart = cookie.get('cart') || []
    const newCart = cart.filter(i => i.id !== itemId)
    cookie.set('cart', newCart, {path: '/'})
    setItemsInCart(newCart)
    setAmountItems(newCart.length)
  }

  useEffect(() => { 
    const cart = cookie.get('cart') || []
    checkIfRestaurantOpen();
    setAmountItems(cart.length)
    setItemsInCart(cart)
  }, [])

  return (
    <Box style={{
      ...styles.container,
    }}>
      {!restaurantOpen && <RestaurantClosedOverlay />}
      <CategoriesTab onTabClick={scrollToElement} items={items} active={active} />
      <Box sx={{...styles.items}}>
        {items.map(item => (
          <Box key={`cateItem_${item.category}`} style={{width: '100%'}}>
            {item.items.length > 0 && (
              <Box id={item.category.split(' ').join('_')} style={{...styles.category}} key={`catItem_${item.category}`}>
                <Box style={{...styles.categoryTitle}}>
                  <h5>{item.category}</h5>
                </Box>
                {item.items.map(item => (
                  <ItemWrapper
                    key={item.item_id}
                    itemId={item.item_id}
                    name={item.item_name}
                    description={item.item_description}
                    price={item.item_price}
                    onAddToCart={addToCartFunction}
                    options={item.item_options ? JSON.parse(item.item_options) : null}
                    imagePath={`${ASSETS_API_URL}/uploads/images/${RESTAURANT_ID}/${item.item_image}`}
                    amountInCart={itemsInCart.find(i => i.id === item.item_id) ? itemsInCart.find(i => i.id === item.item_id).quantity : 0}
                  />
                ))}
              </Box>
              )}
          </Box>
        ))}
      </Box>
      <CartButton
        itemsInCart={itemsInCart}
        amountItems={amountItems}
        onAmountChange={handleAmountChange}
        onRemoveFromCart={removeFromCartFunction}
      />
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: '2rem',
  },
  items: {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginTop: '5%',
    '@media (max-width: 768px)': {
      paddingTop: '22%',
    }
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  categoryTitle: {
    margin: '1rem 0',
    width: '90%',
    borderBottom: `1px solid ${Colors.primary}`,
  }
}

export default ItemBrowser