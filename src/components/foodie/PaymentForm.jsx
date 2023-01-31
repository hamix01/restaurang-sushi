import {Typography} from '@mui/material'
import {Box} from '@mui/system'
import {CardElement, Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import React from 'react'
import {Spinner} from 'react-bootstrap'
import {sendCreateOrderRequest, sendPayment} from '../../helpers/ApiManager'
import {Colors} from '../../styles'
import Button from '../Button'



function PaymentForm({cart,
  loading,
  paymentOK = () => { },
  checkValid = () => { },
  setLoading = () => { },
  setStatus = () => { }
}) {
  const element = useElements();
  const stripe = useStripe();

  const parsePaymentInfo = async () => {
    setLoading(true);
    const valid = checkValid();
    if (!valid) {
      setStatus(['error', 'Please fill out all required fields.']);
      return;
    }

    if (!element || !stripe) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: element.getElement(CardElement),
    });

    if (!error) {
      const {id} = paymentMethod;

      const res = await sendPayment(
        id,
        cart,
      )

      if (res.status === "success") {
        paymentOK(res.data.id);
      } else if (res.status === "Action required") { 
        // do something with stripe
        const {error, paymentIntent} = await stripe.confirmCardPayment(res.data)

        if (error) {
          setStatus(['error', 'Was not able to place payment.']);
          setLoading(false);
          return;
        }

        // pi_3LVj74JjmN4p4Gkh1Ohsidb5
        // pi_3LVj74JjmN4p4Gkh1Ohsidb5
        if (paymentIntent.status === 'succeeded') {
          paymentOK(paymentIntent.id);
        }  
      } else {
        setStatus(['error', 'Was not able to place payment.']);
        setLoading(false);
      }
    }
  }

  return (
    <Box style={styles.container}>
      <Box sx={styles.card}>
        <CardElement options={styles.cardPayment} />
      </Box>
      <Button style={styles.paymentButton} onClick={parsePaymentInfo}>
        {loading ? <Spinner animation='grow' variant="light" /> : 'Betala'}
      </Button>
    </Box>
  )
}

const styles = {
  container: {
    paddingBottom: '2rem',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButton: {
    marginTop: '2rem',
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.primary,
    padding: '1rem',
    borderRadius: '0.5rem',
    width: '50%',
    '@media (max-width: 768px)': {
      width: '100%',
    }
  },
  cardPayment: {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: Colors.snowWhite,
        color: Colors.snowWhite,
        ':-webkit-autofill': {color: Colors.snowWhite},
        '::placeholder': {color: Colors.snowWhite},
      },

    }
  }
}

export default PaymentForm