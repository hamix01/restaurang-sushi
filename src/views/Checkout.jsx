import styled from '@emotion/styled';
import {Alert, Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Tab, Tabs, TextField, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import Container from '../components/Container';
import CheckoutItem from '../components/foodie/CheckoutItem';
import PaymentForm from '../components/foodie/PaymentForm';
import {fetchRestaurantOptions, sendCreateOrderRequest} from '../helpers/ApiManager';
import {SWE_STATES} from '../helpers/constants';
import {Colors} from '../styles';

const DELIVERY_OPTIONS = ['Leverans', 'Upp hämtning'];
const stripePromise = loadStripe('pk_test_51LOiCwJjmN4p4GkhKNeURmUpQFYFKsh3HKzQ8hgrYXl0pSo4sk0FGk54XgKAaNd0UYPW7VPQgGAW9EIvVNjSQETt00ny3KzceE')

const stripeOptions = {
  clientSecret: 'pi_3LOiNHJjmN4p4Gkh0R4Z9XoS_secret_f2pTs3G5kB5oypgjRVyZljIMZ',
}


function Checkout() {
  const cookie = new Cookies();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [timeSlots, setTimeSlots] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [zipAccepted, setZipAccepted] = useState(true);

  /* --------------------------------- Billing -------------------------------- */
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingAddress1, setBillingAddress1] = useState('');
  const [billingAddress2, setBillingAddress2] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  
  const [status, setStatus] = useState([]);

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const [deliveryOption, setDeliveryOption] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('ASAP');

  const [acceptableZips, setAcceptableZips] = useState([]);

  const getRestaurantOptions = async () => { 
    const res = await fetchRestaurantOptions();
    const data = res.data;
    const timeSlots = res.timeSlots

    let zipCodes = data.zip_codes.split(',');
    
    setAcceptableZips(zipCodes);
    setDeliveryFee(data.delivery_fee);
    setTimeSlots(timeSlots);
  }

  const handleFirstNameChange = (event) => { 
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => { 
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => { 
    setEmail(event.target.value);
  }

  const handlePhoneChange = (event) => { 
    setPhone(event.target.value);
  }

  const handleAddress1Change = (event) => { 
    setAddress1(event.target.value);
  }

  const handleAddress2Change = (event) => { 
    setAddress2(event.target.value);
  }

  const handleCityChange = (event) => { 
    setCity(event.target.value);
  }

  const handleStateChange = (value) => { 
    setState(value);
  }

  const handleZipChange = (event) => { 
    setZip(event.target.value);

    if (billingSameAsShipping) {
      setBillingZip(event.target.value);
    }

    if (acceptableZips.includes(event.target.value)) { 
      setZipAccepted(true);
    } else { 
      setZipAccepted(false);
    }
  }

  const checkFormValid = () => { 
    if (firstName === '' || lastName === '' || email === '' || phone === '' || address1 === '' || city === '' || state === '' || zip === '') {
      setStatus(['error', 'Please fill out all required fields.']);
      setLoading(false);
      return false;
    }
    return true;
  }

  const placeOrder = async (payment_id) => {
    let res = await sendCreateOrderRequest(
      `${firstName} ${lastName}`,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      deliveryTime,
      DELIVERY_OPTIONS[deliveryOption],
      cart,
      payment_id,
    )

    if (res.status === "success") {
      setStatus(['success', 'Order Placed Successfully']);
      cookie.remove('cart');
      setCart([]);
      window.location.href = `/order/${res.data}`;
    } else {
      setStatus(['error', 'Coudn\'t Place Order']);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    document.title = 'Lifli Sushi - Kassa';
    getRestaurantOptions();
    const cart = cookie.get('cart') || [];
    setCart(cart);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(subtotal);
    const tax = subtotal * 0.25;
    setTax(tax);
    const total = subtotal + deliveryFee + tax;
    setTotal(total);
    setLoading(false);
  }, [])

  return (
    <>
      <Snackbar open={status.length !== 0} autoHideDuration={6000} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} onClose={() => setStatus([])}>
        <Alert onClose={() => setStatus([])} severity={status[0]} sx={{width: '100%'}}>
          {status[1]}
        </Alert>
      </Snackbar>
      <Container style={styles.container}>
        
        <Box style={styles.userInfoContainer}>
          <Typography gutterBottom variant="h4">
            kund information
          </Typography>
          <Grid style={{marginBottom: '1rem'}} container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Förnamn"
                value={firstName}
                onChange={handleFirstNameChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Efternamn"
                value={lastName}
                onChange={handleLastNameChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobilnummer"
                value={phone}
                onChange={handlePhoneChange}
                fullWidth
                type={'number'}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Adress 1"
                value={address1}
                onChange={handleAddress1Change}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Adress 2"
                value={address2}
                onChange={handleAddress2Change}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stad"
                value={city}
                onChange={handleCityChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="state-select"
                options={SWE_STATES}
                renderInput={(params) => (<TextField {...params} label="Län" required />)}
                onChange={(e, value) => handleStateChange(value)}
                value={state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postnummer"
                value={zip}
                onChange={handleZipChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Typography variant="h6">
            Leverans val
          </Typography>
          <DeliveryOptionTabs value={deliveryOption} onChange={(event, option) => setDeliveryOption(option)}>
            {DELIVERY_OPTIONS.map((option, index) => (
              <DeliveryOptionTab style={{marginRight: index === 0 ? '1rem' : 0}} label={option} />
            ))}
          </DeliveryOptionTabs>
          {!zipAccepted && deliveryOption === 0 && (
            <Typography variant="subtitle1" style={styles.timeErrorText}>
              Vi kan tyvärr inte leverera till ditt postnummer.
            </Typography>
          )}
          <FormControl disabled={!zipAccepted && deliveryOption === 0} fullWidth style={{marginTop: '1rem'}}>
            <InputLabel id="time-select-label">Välj en {DELIVERY_OPTIONS[deliveryOption]} tid</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              label='ASAP'
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              MenuProps={{ PaperProps: { style: { maxHeight: '50%' } } }}
            >
              <MenuItem value={'ASAP'}>ASAP</MenuItem>
              {timeSlots.map((time, index) => (
                <MenuItem key={index} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.checkoutContainer}>
          <Typography variant="h4">
            Kundvagn
          </Typography>
          <Box sx={styles.cart}>
            {cart.map((item, index) => (
              <CheckoutItem key={item.id} item={item} borderBottom={index < cart.length - 1} />
            ))}
          </Box>
          <Box sx={styles.cartSummary}>
            <Typography variant="h6">
              Delsumma: {subtotal} Kr
            </Typography>
            <Typography variant="h6">
              Leverans avgift: {deliveryFee} Kr
            </Typography>
            <Typography variant="h6">
              Moms: {tax} Kr
            </Typography>
            <Typography variant="h6">
              Summa: {total} Kr
            </Typography>
          </Box>
        </Box>
        <Typography gutterBottom variant="h5">
          Betalning
        </Typography>
        <Elements stripe={stripePromise} options={stripeOptions}>
          <PaymentForm
            loading={loading}
            cart={cart}
            paymentOK={placeOrder}
            checkValid={checkFormValid}
            setLoading={setLoading}
            setStatus={setStatus}
          />
        </Elements>
      </Container>
    </>
  )
}

const DeliveryOptionTabs = styled((props) => <Tabs {...props} />)({
  border: '1px solid #ccc',
  padding: '.5rem .5rem',
  borderRadius: '1rem',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})

const DeliveryOptionTab = styled((props) => <Tab disableRipple {...props} />)({
  textTransform: 'none',
  color: '#000',
  borderRadius: '.5rem',
  padding: '0 2rem',
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: Colors.brightRed,
  },
  transition: 'all 0.2s ease-in-out',
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
})

const styles = {
  container: {
    paddingBottom: '5rem',
    marginTop: '10%',
    '@media (max-width: 600px)': {
      marginTop: '20%',
    }
  },
  checkoutContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cart: {
    width: '100%',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartSummary: {
    marginTop: '1rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  userInfoContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  timeErrorText: {
    backgroundColor: Colors.danger,
    marginTop: '1rem',
    padding: '1rem',
    color: Colors.snowWhite,
    borderRadius: '1rem',
    textAlign: 'center',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  }
}

export default Checkout